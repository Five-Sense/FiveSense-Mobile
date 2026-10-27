const { assert, createLoader, hookRuntime, tick, deferred, session, scenario } = require('./helpers.cjs');
const load = createLoader();
const { filterMaterials } = load('src/features/materials/utils/filter-materials.ts');
const { getMaterials } = load('src/features/materials/services/materials-service.ts');
const { describeMaterialsError, countLabel } = load('src/features/materials/utils/materials-feedback.ts');
const { AppError } = load('src/shared/services/api/app-error.ts');
const { filterTeams } = load('src/features/teams/utils/filter-teams.ts');
const { buildScheduleSlots } = load('src/features/teams/utils/build-schedule-slots.ts');
const { getSlotStatus } = load('src/features/teams/utils/get-slot-status.ts');
const { timeToMinutes, getWorkingWindow, isWorkingDay } = load('src/features/teams/utils/working-hours.ts');
const { fetchTeams, updateTeamStatus } = load('src/features/teams/services/teams-service.ts');
const cases = [], add = (...args) => cases.push(scenario(...args));
const material = { id: '22222222-2222-4222-8222-222222222222', name: 'Álcool', stockQuantity: 10, active: true };
const team = { id: '11111111-1111-4111-8111-111111111111', name: 'Produção A', code: 'PR-A', displayName: 'Produção', displayCode: 'PR-01', representatives: ['Pessoa fixture'], status: 'NOT_DOING_5S', startTime: '08:00', endTime: '09:00' };
add('MAT-01', 'Busca de material ignora acentos e caixa', 'Buscar ALCOOL com espaços.', 'Encontra Álcool; termo inexistente retorna vazio.', () => { assert.equal(filterMaterials([material], ' ALCOOL ').length, 1); assert.equal(filterMaterials([material], 'ausente').length, 0); });
add('MAT-02', 'Busca vazia e contagem singular/plural', 'Buscar espaços e montar contador1/2.', 'Retorna catálogo sem alterar coleção; rótulos corretos.', () => { const list = [material]; assert.deepEqual(filterMaterials(list, ' '), list); assert.notEqual(filterMaterials(list, ''), list); assert.equal(countLabel(1), '1 material disponível'); assert.equal(countLabel(2), '2 materiais disponíveis'); });
add('MAT-03', 'Catálogo percorre páginas e omite inativos', 'Responder duas páginas com um ativo e um inativo.', 'Duas chamadas com VIEWER; somente material ativo no resultado.', async () => {
  let calls = 0; global.fetch = async (url, opts) => { assert.equal(opts.headers['X-User-Role'], 'VIEWER'); assert(url.includes(`page=${calls}`)); const active = calls++ === 0; return new Response(JSON.stringify({ content: [{ ...material, id: `22222222-2222-4222-8222-${String(calls).padStart(12,'0')}`, active }], totalPages: 2 })); };
  assert.equal((await getMaterials()).length, 1); assert.equal(calls, 2);
});
add('MAT-04', 'Catálogo vazio é válido', 'Responder content:[] e totalPages:0.', 'Resultado vazio, sem erro de contrato.', async () => { global.fetch = async () => new Response(JSON.stringify({ content: [], totalPages: 0 })); assert.deepEqual(await getMaterials(), []); });
add('MAT-05', 'Resposta de material inválida é recusada', 'Responder estoque negativo ou estrutura inesperada.', 'invalidResponse, sem renderizar dados inválidos.', async () => { global.fetch = async () => new Response(JSON.stringify({ content: [{ ...material, stockQuantity: -1 }], totalPages: 1 })); await assert.rejects(getMaterials(), e => e.code === 'invalidResponse'); });
function mockCatalog(totalPages) {
  let calls = 0;
  global.fetch = async url => {
    const params = new URL(url).searchParams, page = Number(params.get('page'));
    assert.equal(page, calls++); assert.equal(params.get('size'), '100');
    return new Response(JSON.stringify({content:Array.from({length:100},(_,index)=>({...material,id:`22222222-2222-4222-8222-${String(page*100+index+1).padStart(12,'0')}`,name:`Material ${page*100+index+1}`})),totalPages,number:page}));
  };
  return () => calls;
}
add('MAT-06', 'Catálogo maior que dez páginas é consultado integralmente', 'Responder11 páginas válidas de100 materiais ativos e buscar Material1100.', 'Retorna1100 materiais em11 chamadas; busca encontra o último item; erro não conta como aprovação.', async () => {
  const calls = mockCatalog(11), data = await getMaterials();
  assert.equal(data.length,1100,'Catálogo parcial foi retornado sem erro/aviso ao chamador.');
  assert.equal(calls(),11); assert.equal(data[1099].name,'Material 1100');
  assert.deepEqual(filterMaterials(data,'Material 1100'),[data[1099]]);
},'Média');
add('MAT-07', 'Catálogo com exatamente dez páginas continua completo', 'Responder10 páginas de100 materiais.', 'Retorna1000 em10 chamadas, sem chamada extra.', async () => { const calls=mockCatalog(10); assert.equal((await getMaterials()).length,1000); assert.equal(calls(),10); },'Média');
for (const [id,title,second] of [
  ['MAT-08','Página repetida mesmo sem índice',{content:[material],totalPages:2}],
  ['MAT-09','Índice retornado não acompanha página solicitada',{content:[{...material,id:'33333333-3333-4333-8333-333333333333'}],totalPages:2,number:0}],
  ['MAT-10','Total de páginas muda durante consulta',{content:[{...material,id:'33333333-3333-4333-8333-333333333333'}],totalPages:3}],
]) add(id,title,'Responder primeira página válida e depois metadados/IDs inconsistentes.', 'Falha explícita invalidResponse na segunda chamada; não retorna catálogo parcial nem consulta indefinidamente.',async()=>{
  let calls=0; global.fetch=async()=>new Response(JSON.stringify(++calls===1?{content:[material],totalPages:2}:second));
  await assert.rejects(getMaterials(),e=>e instanceof AppError&&e.code==='invalidResponse'); assert.equal(calls,2);
},'Média');
for (const [id,title,payload] of [
  ['MAT-11','Página vazia antes do fim',{content:[],totalPages:2}],
  ['MAT-12','Conteúdo presente em catálogo de zero páginas',{content:[material],totalPages:0}],
  ['MAT-13','Total de páginas fracionário',{content:[material],totalPages:1.5}],
  ['MAT-14','Material duplicado dentro da mesma página',{content:[material,material],totalPages:1}],
]) add(id,title,'Responder paginação inconsistente no primeiro resultado.', 'invalidResponse, uma chamada e nenhum sucesso parcial.',async()=>{
  let calls=0; global.fetch=async()=>{calls++;return new Response(JSON.stringify(payload));};
  await assert.rejects(getMaterials(),e=>e.code==='invalidResponse'); assert.equal(calls,1);
},'Média');
add('MAT-15','Cancelamento durante segunda página interrompe catálogo','Abortar signal ao iniciar a segunda resposta de três páginas.','Rejeita cancelled; não devolve página1 como sucesso nem solicita página3.',async()=>{
  const controller=new AbortController();let calls=0;
  global.fetch=async(_url,opts)=>{
    assert(opts.signal);calls++;
    if(calls===2){controller.abort();throw new DOMException('Cancelled fixture','AbortError');}
    return new Response(JSON.stringify({content:[material],totalPages:3}));
  };
  await assert.rejects(getMaterials(controller.signal),e=>e.code==='cancelled');assert.equal(calls,2);
});
for (const status of [401,403]) add(`MAT-${status}`, `Materiais trata HTTP${status}`, `Injetar erro${status} no resultado do useQuery.`, status === 401 ? 'Encerra sessão uma vez com aviso.' : 'Mantém sessão; acesso negado com texto.', async () => {
  const runtime = hookRuntime(); let notices = 0; const ctx = { session, endSession: async () => { notices++; } }; const query = { error: new AppError(status) };
  const l = createLoader({ react: runtime.react, '@/shared/contexts/session-context': { useSession: () => ctx }, '@tanstack/react-query': { useQuery: opts => { assert.equal(opts.retry, false); assert.equal(opts.enabled, true); return query; } } });
  const { useMaterials } = l('src/features/materials/hooks/use-materials.ts'); runtime.render(useMaterials); await tick(); runtime.render(useMaterials); await tick(); assert.equal(notices, status === 401 ? 1 : 0);
  assert.match(describeMaterialsError(new AppError(status)).title, status === 401 ? /sessão/ : /negado/);
});
add('TEAM-01', 'Busca de equipe por nome e código', 'Buscar producao e pr-01.', 'Encontra equipe sem exigir acento/caixa; ausente retorna vazio.', () => { assert.equal(filterTeams([team], 'PRODUCAO').length, 1); assert.equal(filterTeams([team], 'pr-01').length, 1); assert.equal(filterTeams([team], 'ausente').length, 0); });
add('CAL-01', 'Horários inválidos não geram expediente', 'Usar25:00, horário invertido e campos vazios.', 'Retorna null; equipe sem janela é omitida.', () => { assert.equal(timeToMinutes('25:00'), null); assert.equal(getWorkingWindow({ startTime: '10:00', endTime: '09:00' }), null); assert.deepEqual(buildScheduleSlots([{ ...team, startTime: '', endTime: '' }]), []); });
add('CAL-02', 'Calendário monta intervalos e sobreposições', 'Equipe08-09 e outra08:30-09:30.', 'Três linhas30min; ambas na linha08:30; nenhuma linha além do fim.', () => {
  const slots = buildScheduleSlots([team, { ...team, id: 'segunda', displayCode: 'PR-02', startTime: '08:30', endTime: '09:30' }]); assert.deepEqual(slots.map(s => s.time), ['08:00','08:30','09:00']); assert.deepEqual(slots[1].teamCodes, ['PR01','PR02']);
});
add('CAL-03', 'Estado temporal respeita bordas do intervalo', 'Consultar08:00 às07:59/08:00/08:29/08:30.', 'future/current/current/past, respectivamente.', () => { for (const [h,m,expected] of [[7,59,'future'],[8,0,'current'],[8,29,'current'],[8,30,'past']]) assert.equal(getSlotStatus('08:00', new Date(2026,9,27,h,m)), expected); });
add('CAL-04', 'Sábado e domingo não são dias úteis', 'Consultar sábado/domingo/segunda em horário local.', 'false/false/true.', () => { assert.equal(isWorkingDay(new Date(2026,9,24,12)), false); assert.equal(isWorkingDay(new Date(2026,9,25,12)), false); assert.equal(isWorkingDay(new Date(2026,9,26,12)), true); });
add('TEAM-02', 'Serviço pagina equipes e separa representantes', 'Responder duas páginas de equipes com representantes em texto.', 'Busca ambas, converte representantes e prepara rótulos.', async () => { let count = 0; global.fetch = async () => new Response(JSON.stringify({ content: [{ ...team, id: String(++count), representatives: 'Pessoa A, Pessoa B' }], totalPages: 2 })); const data = await fetchTeams(); assert.equal(data.length, 2); assert.deepEqual(data[0].representatives, ['Pessoa A','Pessoa B']); });
add('TEAM-03', 'Atualização de status usa PATCH e retorno confirmado', 'Enviar NOT_DOING_5S e responder status confirmado.', 'PATCH com VIEWER e corpo correto; retorna status confirmado.', async () => { global.fetch = async (url, opts) => { assert(url.endsWith('/teams/fixture/status')); assert.equal(opts.method, 'PATCH'); assert.equal(opts.headers['X-User-Role'], 'VIEWER'); assert.deepEqual(JSON.parse(opts.body), { status: 'DOING_5S' }); return new Response(JSON.stringify({ status: 'DOING_5S' })); }; assert.equal(await updateTeamStatus('fixture', 'DOING_5S'), 'DOING_5S'); });
function teamsHarness({ initialError, refreshError, patchError, user = session, pending } = {}) {
  const runtime = hookRuntime(); const calls = { fetch: 0, patch: 0, end: 0 };
  const ctx = { session: user, endSession: async () => { calls.end++; ctx.session = null; } };
  const services = { fetchTeams: async () => { calls.fetch++; if (pending) return pending; const error = calls.fetch === 1 ? initialError : refreshError; if (error) throw new AppError(error); return [team]; }, updateTeamStatus: async () => { calls.patch++; if (patchError) throw new AppError(patchError); return 'DOING_5S'; } };
  const l = createLoader({ react: runtime.react, '@/shared/contexts/session-context': { useSession: () => ctx }, '@/features/teams/services/teams-service': services });
  const { useTeams } = l('src/features/teams/hooks/use-teams.ts'); return { render: () => runtime.render(useTeams), runtime, calls, ctx };
}
for (const stage of ['initial','refresh','patch']) add(`TEAM-401-${stage}`, `Sessão expirada em equipes: ${stage}`, `Responder401 durante ${stage}.`, 'endSession uma vez; não mantém acesso ativo.', async () => { const h = teamsHarness({ [`${stage === 'initial' ? 'initial' : stage === 'patch' ? 'patch' : 'refresh'}Error`]: 401 }); h.render(); await tick(); if (stage === 'refresh') await h.render().refresh(); if (stage === 'patch') await h.render().toggleStatus(team); assert.equal(h.calls.end, 1); });
add('TEAM-403', 'Acesso negado preserva status confirmado', 'PATCH devolve403.', 'Sessão mantida; status anterior e mensagem de erro.', async () => { const h = teamsHarness({ patchError: 403 }); h.render(); await tick(); await h.render().toggleStatus(team); assert.equal(h.calls.end, 0); assert.equal(h.render().teams[0].status, team.status); assert(h.render().statusError); });
add('TEAM-04', 'Sem sessão não consulta nem altera', 'Montar hook sem usuário e acionar refresh/status.', 'Zero requisições.', async () => { const h = teamsHarness({ user: null }); h.render(); await tick(); await h.render().refresh(); await h.render().toggleStatus(team); assert.equal(h.calls.fetch, 0); assert.equal(h.calls.patch, 0); });
add('TEAM-05', 'Resposta tardia não atualiza tela desmontada', 'Suspender consulta, desmontar e resolver.', 'Coleção não recebe resposta tardia.', async () => { const d = deferred(); const h = teamsHarness({ pending: d.promise }); h.render(); await tick(); h.runtime.unmount(); d.resolve([team]); await tick(); assert.deepEqual(h.render().teams, []); });
module.exports = cases;
