const { assert, createLoader, deferred, scenario } = require('./helpers.cjs');
const load = createLoader();
const { requestJson, apiRequest } = load('src/shared/services/api/client.ts');
const { AppError, kindFromStatus, toAppError } = load('src/shared/services/api/app-error.ts');
const cases = [];
const add = (...args) => cases.push(scenario(...args));
function reply(data, status = 200) { return new Response(data === undefined ? null : JSON.stringify(data), { status }); }
add('CFG-01', 'Configuração ausente bloqueia a rede', 'Remover EXPO_PUBLIC_API_URL e solicitar login.', 'AppError config; zero chamadas de rede.', async () => {
  delete process.env.EXPO_PUBLIC_API_URL; let calls = 0; global.fetch = async () => { calls++; };
  await assert.rejects(requestJson('/auth/login'), e => e.kind === 'config'); assert.equal(calls, 0);
});
add('CFG-02', 'Host e prefixo não duplicam barras', 'Definir host fixture com barras finais e consultar /materials.', 'URL contém exatamente /api/v1/materials.', async () => {
  process.env.EXPO_PUBLIC_API_URL = 'https://fixture.invalid///'; global.fetch = async url => { assert.equal(url, 'https://fixture.invalid/api/v1/materials'); return reply({}); }; await requestJson('/materials');
});
add('API-01', 'JSON do login preserva senha e não envia perfil', 'Enviar username e senha com espaços via POST.', 'Content-Type JSON, senha intacta, sem X-User-Role.', async () => {
  global.fetch = async (_, options) => { assert.equal(options.method, 'POST'); assert.equal(options.headers['X-User-Role'], undefined); assert.equal(options.headers['Content-Type'], 'application/json'); assert.deepEqual(JSON.parse(options.body), { username: 'fixture', password: ' senha ' }); return reply({}); };
  await requestJson('/auth/login', { method: 'POST', body: { username: 'fixture', password: ' senha ' } });
});
add('API-02', 'Query escapada e perfil nas rotas protegidas', 'Consultar teams com query existente, espaço, acento e valor undefined.', 'Usa &, encodeURIComponent e VIEWER; omite undefined.', async () => {
  global.fetch = async (url, options) => { assert.equal(url, 'https://fixture.invalid/api/v1/teams?active=true&page=0&name=A%20%26%20%C3%A1'); assert.equal(options.headers['X-User-Role'], 'VIEWER'); return reply({}); };
  await requestJson('/teams?active=true', { role: 'VIEWER', query: { page: 0, name: 'A & á', absent: undefined } });
});
add('API-03', 'Compatibilidade apiRequest e resposta 204', 'Executar DELETE pelo wrapper legado e devolver204.', 'Delegação única com VIEWER; retorno undefined.', async () => {
  let calls = 0; global.fetch = async (_, opts) => { calls++; assert.equal(opts.headers['X-User-Role'], 'VIEWER'); return reply(undefined, 204); };
  assert.equal(await apiRequest('/fixture', { method: 'DELETE' }), undefined); assert.equal(calls, 1);
});
for (const [status, kind] of [[400,'validation'],[401,'unauthorized'],[403,'forbidden'],[404,'notFound'],[409,'conflict'],[413,'validation'],[422,'validation'],[429,'unknown'],[500,'server'],[503,'server']]) {
  add(`HTTP-${status}`, `HTTP${status} vira erro seguro ${kind}`, `Responder HTTP${status} com detalhe bruto e solicitar endpoint.`, 'Preserva status/kind; não exibe detalhe bruto; apenas uma tentativa.', async () => {
    let calls = 0; global.fetch = async () => { calls++; return reply({ detail: 'INTERNO_NAO_EXIBIR' }, status); };
    await assert.rejects(requestJson('/fixture'), e => e instanceof AppError && e.kind === kind && e.status === status && !e.message.includes('INTERNO_NAO_EXIBIR'));
    assert.equal(calls, 1); assert.equal(kindFromStatus(status), kind);
  });
}
add('API-04', 'Campos de validação em array', 'Responder422 com errors:[{field:username},null,{message:...}].', 'fields contém apenas username.', async () => {
  global.fetch = async () => reply({ errors: [{ field: 'username' }, null, { message: 'interno' }] }, 422);
  await assert.rejects(requestJson('/fixture'), e => { assert.deepEqual(e.fields, ['username']); return true; });
});
add('API-05', 'Campos de validação em objeto', 'Responder400 com errors objeto images[1].', 'Nome de campo mantido; texto bruto não exibido.', async () => {
  global.fetch = async () => reply({ errors: { 'images[1]': 'interno' } }, 400);
  await assert.rejects(requestJson('/fixture'), e => { assert.deepEqual(e.fields, ['images[1]']); return !e.message.includes('interno'); });
});
add('API-06', 'JSON inválido em resposta de sucesso', 'Responder200 com HTML.', 'invalidResponse, sem classificar como falha de rede.', async () => {
  global.fetch = async () => new Response('<html>interno</html>', { status: 200 });
  await assert.rejects(requestJson('/fixture'), e => e.code === 'invalidResponse' && e.kind === 'unknown');
});
add('API-07', 'Erro HTTP com corpo não JSON', 'Responder503 com HTML.', 'Preserva503/server; não exibe HTML.', async () => {
  global.fetch = async () => new Response('<html>interno</html>', { status: 503 });
  await assert.rejects(requestJson('/fixture'), e => e.status === 503 && e.kind === 'server' && !e.message.includes('html'));
});
add('API-08', 'Rede indisponível não repete POST', 'fetch rejeita com TypeError.', 'network, uma chamada, sem detalhe bruto.', async () => {
  let calls = 0; global.fetch = async () => { calls++; throw new TypeError('INTERNO'); };
  await assert.rejects(requestJson('/fixture', { method: 'POST', body: {} }), e => e.kind === 'network' && !e.message.includes('INTERNO')); assert.equal(calls, 1);
});
add('API-09', 'Cancelamento anterior não chama fetch', 'Abortar signal antes da requisição.', 'cancelled e zero chamadas.', async () => {
  const c = new AbortController(); c.abort(); let calls = 0; global.fetch = async () => { calls++; };
  await assert.rejects(requestJson('/fixture', { signal: c.signal }), e => e.kind === 'cancelled'); assert.equal(calls, 0);
});
for (const stage of ['fetch', 'body']) for (const timedOut of [false, true]) {
  add(`API-${stage === 'fetch' ? 'F' : 'B'}-${timedOut ? 'TIME' : 'ABORT'}`, `${timedOut ? 'Timeout' : 'Cancelamento'} durante ${stage}`, `Suspender ${stage}; acionar ${timedOut ? 'timer60s simulado' : 'signal externo'}.`, `${timedOut ? 'timeout' : 'cancelled'}; timer/listener removidos.`, async () => {
    const savedSet = global.setTimeout, savedClear = global.clearTimeout; const timers = new Map(); let sequence = 0;
    global.setTimeout = (fn, ms) => { assert.equal(ms, 60000); const id = ++sequence; timers.set(id, fn); return id; };
    global.clearTimeout = id => timers.delete(id);
    const external = new AbortController(); let added = 0, removed = 0;
    const addOriginal = external.signal.addEventListener.bind(external.signal), removeOriginal = external.signal.removeEventListener.bind(external.signal);
    external.signal.addEventListener = (...args) => { added++; return addOriginal(...args); };
    external.signal.removeEventListener = (...args) => { removed++; return removeOriginal(...args); };
    const entered = deferred();
    const waitAbort = signal => new Promise((_, reject) => { entered.resolve(); signal.addEventListener('abort', () => reject(new DOMException('fixture', 'AbortError')), { once: true }); });
    global.fetch = async (_, opts) => stage === 'fetch' ? waitAbort(opts.signal) : { ok: true, status: 200, text: () => waitAbort(opts.signal) };
    try {
      const pending = requestJson('/fixture', { signal: external.signal });
      const rejected = assert.rejects(pending, e => e.kind === (timedOut ? 'timeout' : 'cancelled'));
      await entered.promise;
      if (timedOut) [...timers.values()][0](); else external.abort();
      await rejected; assert.equal(timers.size, 0); assert.equal(added, removed);
    } finally { global.setTimeout = savedSet; global.clearTimeout = savedClear; }
  });
}
add('API-10', 'Erros desconhecidos não vazam texto', 'Converter Error com conteúdo arbitrário.', 'Mensagem do catálogo unknown, sem dados brutos.', () => { const e = toAppError(new Error('senha-ficticia')); assert.equal(e.kind, 'unknown'); assert(!e.message.includes('senha-ficticia')); });
module.exports = cases;
