const { assert, createLoader, hookRuntime, tick, deferred, session, scenario } = require('./helpers.cjs');
const load = createLoader();
const { validateLogin } = load('src/features/auth/schemas/login-schema.ts');
const { login } = load('src/features/auth/services/auth-service.ts');
const { AppError } = load('src/shared/services/api/app-error.ts');
const { feedbackForLoginError } = load('src/features/auth/utils/login-feedback.ts');
const cases = [], add = (...args) => cases.push(scenario(...args));
for (const [suffix, values, fields] of [
  ['01', { identifier: '', password: '' }, ['identifier','password']],
  ['02', { identifier: '   ', password: 'senha' }, ['identifier']],
  ['03', { identifier: 'usuario', password: '   ' }, ['password']],
  ['04', { identifier: 'u'.repeat(256), password: 's' }, ['identifier']],
  ['05', { identifier: 'u', password: 's'.repeat(256) }, ['password']],
]) add(`AUTH-${suffix}`, `Validação local do login ${suffix}`, `Informar ${suffix <= '03' ? 'campos vazios/espaços' : '256 caracteres'} e validar formulário.`, `Rejeitar e destacar ${fields.join(', ')}.`, () => {
  const result = validateLogin(values); assert.equal(result.success, false); assert.deepEqual(result.feedback.fields, fields);
});
add('AUTH-06', 'Username não exige e-mail; senha não é alterada', 'Validar username com espaços laterais e senha com espaços.', 'Trim somente username; senha intacta; aceita255 caracteres.', () => {
  const result = validateLogin({ identifier: '  usuario_comum  ', password: ' senha ' }); assert.equal(result.success, true); assert.equal(result.values.identifier, 'usuario_comum'); assert.equal(result.values.password, ' senha ');
  assert.equal(validateLogin({ identifier: 'u'.repeat(255), password: 's'.repeat(255) }).success, true);
});
add('AUTH-07', 'Login válido retorna somente sessão VIEWER', 'Responder authenticated:true com sessão e dados extras sensíveis fictícios.', 'Retorna dados mínimos; remove password/token extras.', async () => {
  global.fetch = async () => new Response(JSON.stringify({ authenticated: true, ...session, password: 'nao-persistir', token: 'nao-persistir' }));
  assert.deepEqual(await login({ username: 'fixture', password: 'fixture' }), session);
});
for (const [suffix, response, expected] of [
  ['08', { authenticated: false }, 'invalidCredentials'],
  ['09', { authenticated: true, ...session, role: 'MANAGER' }, 'viewerOnly'],
  ['10', { authenticated: true, ...session, userId: 'invalido' }, 'invalidResponse'],
  ['11', { unexpected: true }, 'invalidResponse'],
]) add(`AUTH-${suffix}`, `Recusar resposta de login ${expected}`, `API simulada retorna ${expected}.`, 'Não iniciar sessão; erro seguro correspondente.', async () => {
  global.fetch = async () => new Response(JSON.stringify(response)); await assert.rejects(login({ username: 'fixture', password: 'fixture' }), e => e.code === expected);
});
add('AUTH-12', 'Credenciais incorretas destacam os dois campos', 'Converter HTTP400 sem fields para feedback.', 'Alerta de credenciais; identifier/password destacados.', () => {
  assert.deepEqual(feedbackForLoginError(new AppError(400)).fields, ['identifier','password']);
});
add('AUTH-13', 'Validação da API destaca campo correspondente', 'Converter422 com username e campo desconhecido.', 'Destaca somente identifier; cancelamento não cria alerta.', () => {
  assert.deepEqual(feedbackForLoginError(new AppError(422, ['username','unknown'])).fields, ['identifier']); assert.equal(feedbackForLoginError(new AppError('cancelled')), null);
});
function loginHarness(service, startFailure) {
  const runtime = hookRuntime(); const saved = [];
  const ctx = { session: null, restoring: false, storageError: null, startSession: async value => { if (startFailure) throw startFailure; saved.push(value); ctx.session = value; } };
  const loader = createLoader({ react: runtime.react, '@/shared/contexts/session-context': { useSession: () => ctx }, '../services/auth-service': { login: service } });
  const { useLogin } = loader('src/features/auth/hooks/use-login.ts');
  const render = () => runtime.render(useLogin);
  const fill = () => { render().change('identifier', 'fixture'); render().change('password', 'senha'); };
  return { render, fill, runtime, saved, ctx };
}
add('AUTH-14', 'Formulário inválido não chama serviço', 'Enviar hook com campos vazios.', 'Feedback obrigatório; zero chamadas.', async () => { let calls = 0; const h = loginHarness(async () => { calls++; }); await h.render().submit(); assert.equal(calls, 0); assert(h.render().feedback); });
add('AUTH-15', 'Login bloqueia duplicação e limpa senha', 'Enviar duas vezes enquanto serviço está pendente; confirmar sucesso.', 'Uma chamada; campos bloqueados; sessão iniciada e senha limpa.', async () => {
  const d = deferred(); let calls = 0; const h = loginHarness(() => { calls++; return d.promise; }); h.fill();
  const pending = h.render().submit(); assert.equal(h.render().loading, true); h.render().change('password', 'outra'); await h.render().submit(); assert.equal(calls, 1);
  d.resolve(session); await pending; assert.equal(h.saved.length, 1); assert.equal(h.render().values.password, ''); assert.equal(h.render().connected, true);
});
add('AUTH-16', 'Falha ao guardar sessão impede conexão', 'Serviço autentica, armazenamento recusa gravação.', 'Sem conexão; mensagem segura e dados recuperáveis.', async () => {
  const h = loginHarness(async () => session, new AppError('sessionSaveFailed')); h.fill(); await h.render().submit(); assert.equal(h.render().connected, false); assert.equal(h.render().feedback.variant, 'error');
});
add('AUTH-17', 'Desmontagem cancela login pendente', 'Iniciar login, desmontar hook e resolver depois.', 'Signal abortado; não inicia sessão após desmontar.', async () => {
  const d = deferred(); let signal; const h = loginHarness((_, s) => { signal = s; return d.promise; }); h.fill(); const pending = h.render().submit(); h.runtime.unmount(); assert.equal(signal.aborted, true); d.resolve(session); await pending; assert.equal(h.saved.length, 0);
});
add('SESSION-01', 'Sessão web permanece apenas em memória', 'Salvar/ler/limpar no adaptador web; carregar nova instância do módulo.', 'Sessão disponível na visita; limpa no logout e não persiste em nova instância.', async () => {
  const web = createLoader()('src/shared/services/storage/session-storage.web.ts'); await web.saveSession(session); assert.deepEqual(await web.readSession(), session); assert.equal(await createLoader()('src/shared/services/storage/session-storage.web.ts').readSession(), null); await web.clearSession(); assert.equal(await web.readSession(), null);
});
add('SESSION-02', 'Sessão nativa válida usa SecureStore', 'Salvar com adaptador nativo simulado e reler.', 'Chave correta e WHEN_UNLOCKED_THIS_DEVICE_ONLY; sessão válida.', async () => {
  let stored, options;
  const store = { WHEN_UNLOCKED_THIS_DEVICE_ONLY: 7, setItemAsync: async (_, value, opts) => { stored = value; options = opts; }, getItemAsync: async () => stored, deleteItemAsync: async () => { stored = null; } };
  const native = createLoader({ 'expo-secure-store': store })('src/shared/services/storage/session-storage.ts');
  await native.saveSession(session); assert.equal(options.keychainAccessible, 7); assert.deepEqual(await native.readSession(), session); await native.clearSession(); assert.equal(await native.readSession(), null);
});
for (const [suffix, stored] of [['03','{invalido'],['04',JSON.stringify({ userId: 'invalido', role: 'ADMIN' })]]) add(`SESSION-${suffix}`, 'Sessão nativa corrompida é descartada', 'Ler registro inválido no armazenamento simulado.', 'Retorna null e remove registro; não restaura acesso.', async () => {
  let deleted = 0; const store = { getItemAsync: async () => stored, deleteItemAsync: async () => { deleted++; } };
  const native = createLoader({ 'expo-secure-store': store })('src/shared/services/storage/session-storage.ts'); assert.equal(await native.readSession(), null); assert.equal(deleted, 1);
});
module.exports = cases;
