const { assert, fs, path, root, createLoader, hookRuntime, deferred, session, jsx, native, elements, scenario } = require('./helpers.cjs');
const cases = [], add = (...args) => cases.push(scenario(...args));
function fixture({ pathname = '/equipes', sending = 0, user = session, restoring = false, logoutWait } = {}) {
  const runtime = hookRuntime(), events = [];
  const ctx = { session: user, restoring, endSession: async () => { events.push(['endSession']); if (logoutWait) await logoutWait; ctx.session = null; } };
  const router = { navigate: href => events.push(['navigate', href]), replace: href => events.push(['replace', href]) };
  const load = createLoader({
    react: runtime.react, 'react/jsx-runtime': { jsx, jsxs: jsx, Fragment: 'Fragment' }, 'react-native': native,
    'react-native-safe-area-context': { useSafeAreaInsets: () => ({ top: 24, bottom: 16 }) },
    'expo-router': { useRouter: () => router, usePathname: () => pathname, Redirect: 'Redirect', Slot: 'Slot' },
    '@tanstack/react-query': { useIsMutating: () => sending },
    '@/shared/contexts/session-context': { useSession: () => ctx },
    '@/shared/components/ui/spinner': { Spinner: 'Spinner' }, '@/shared/components/ui/icon': { Icon: 'Icon' },
    'lucide-react-native': new Proxy({}, { get: (_, name) => String(name) }),
    '@/features/teams': { TeamsScreen: 'TeamsScreen', TeamCalendarScreen: 'TeamCalendarScreen' },
  });
  const Group = load('src/app/(app)/_layout.tsx').default;
  const { AppLayout } = load('src/shared/components/layout/app-layout.tsx');
  const { AppHeader } = load('src/shared/components/layout/app-header.tsx');
  const { MenuButton } = load('src/shared/components/navigation/menu-button.tsx');
  function render() { return runtime.render(Group); }
  function shell() {
    const group = render(); assert.equal(group.type, AppLayout);
    const tree = AppLayout(group.props); const headers = elements(tree, n => n.type === AppHeader); assert.equal(headers.length, 1);
    const header = AppHeader(headers[0].props);
    return { group, tree, buttons: elements(tree, n => n.type === MenuButton), logo: elements(header, n => n.type === 'Pressable' && n.props.accessibilityLabel.includes('Five Sense'))[0], exit: elements(header, n => n.type === 'Pressable' && n.props.accessibilityLabel === 'Sair')[0] };
  }
  return { render, shell, events, ctx, load };
}
const destinations = [['home','/home'],['occurrences','/ocorrencias'],['teams','/equipes'],['materials','/materiais']];
let n = 0;
for (const origin of ['/home','/ocorrencias','/materiais','/equipes','/equipes/calendario']) for (const [id, href] of destinations) {
  add(`NAV-${String(++n).padStart(2,'0')}`, `${origin} → ${href} pelo menu`, `Abrir origem autenticada e acionar botão ${id} na moldura real.`, origin === href ? 'Não duplica navegação para destino atual.' : `Callback navega para ${href}, sem passar pelo login.`, () => {
    const h = fixture({ pathname: origin }); const s = h.shell(); assert.equal(s.buttons.length, 4); s.buttons.find(b => b.props.label === ({home:'Home',occurrences:'Ocorrências',teams:'Equipes',materials:'Materiais'})[id]).props.onPress(); assert.deepEqual(h.events, origin === href ? [] : [['navigate', href]]);
  });
}
add('NAV-21', 'Logo volta à Home com controle acessível', 'Acionar a logo a partir de Equipes.', 'Navega /home; role button, nome acessível e alvo48.', () => {
  const h = fixture(); const s = h.shell(); s.logo.props.onPress(); assert.deepEqual(h.events, [['navigate','/home']]); assert.equal(s.logo.props.accessibilityRole, 'button'); assert(s.logo.props.className.includes('min-h-control')); assert.equal(s.logo.props.disabled, false);
});
add('NAV-22', 'Calendário mantém Equipes selecionado', 'Renderizar moldura em /equipes/calendario.', 'Um menu, quatro destinos, somente Equipes selecionado.', () => { const s = fixture({ pathname:'/equipes/calendario' }).shell(); assert.equal(s.buttons.filter(b => b.props.selected).length, 1); assert.equal(s.buttons.find(b => b.props.selected).props.label, 'Equipes'); assert.equal(s.tree.props.style.paddingTop, 24); });
add('NAV-23', 'Logout limpa sessão antes da rota de login', 'Acionar Sair em calendário e avaliar guarda novamente.', 'endSession+replace(/); sem sessão, Redirect(/).', async () => { const h = fixture({ pathname:'/equipes/calendario' }); await h.shell().exit.props.onPress(); assert.deepEqual(h.events, [['endSession'],['replace','/']]); assert.equal(h.render().type, 'Redirect'); assert.equal(h.render().props.href, '/'); });
add('NAV-24', 'Links protegidos sem sessão redirecionam', 'Avaliar grupo sem sessão para todas as rotas privadas.', 'Não renderiza a moldura; redireciona ao login.', () => { for (const pathname of ['/home','/equipes','/equipes/calendario','/materiais','/ocorrencias']) { const tree=fixture({ pathname,user:null }).render(); assert.equal(tree.type,'Redirect'); assert.equal(tree.props.href,'/'); } });
add('NAV-25', 'Restauração de sessão não mostra conteúdo privado', 'Avaliar grupo com restoring:true.', 'Exibe carregamento, sem menu nem Slot privado.', () => { const tree=fixture({ restoring:true }).render(); assert.equal(elements(tree,n=>n.type==='Slot').length,0); assert(JSON.stringify(tree).includes('Carregando seu acesso')); });
add('NAV-26', 'Envio de ocorrência bloqueia navegação e saída', 'Simular mutação occurrence-create pendente e acionar todos callbacks.', 'Menu/logo/Sair disabled e nenhum evento de navegação ou logout.', async () => { const h=fixture({pathname:'/ocorrencias',sending:1}); const s=h.shell(); s.buttons.forEach(b=>{assert.equal(b.props.disabled,true);b.props.onPress();}); s.logo.props.onPress();await s.exit.props.onPress();assert.equal(s.logo.props.disabled,true);assert.equal(s.exit.props.disabled,true);assert.deepEqual(h.events,[]); });
add('NAV-27', 'Logout pendente bloqueia cliques adicionais', 'Suspender limpeza de sessão e acionar logo/menu.', 'Sem navegação adicional até limpeza terminar.', async () => { const d=deferred();const h=fixture({logoutWait:d.promise});const pending=h.shell().exit.props.onPress();const s=h.shell();assert(s.logo.props.disabled);s.logo.props.onPress();s.buttons[3].props.onPress();assert.deepEqual(h.events,[['endSession']]);d.resolve();await pending; });
add('NAV-28', 'Equipes e calendário estão no grupo protegido', 'Inspecionar estrutura de rotas compilada no projeto.', 'Arquivos sob(app), sem cópias antigas/menu paralelo.', () => { for(const f of ['index.tsx','calendario.tsx']){assert(fs.existsSync(path.join(root,'src/app/(app)/equipes',f)));assert(!fs.existsSync(path.join(root,'src/app/equipes',f)));}assert(!fs.existsSync(path.join(root,'src/features/teams/components/layout/teams-page-frame.tsx'))); });
add('NAV-29', 'Alternância Lista/Calendário preserva URLs', 'Invocar callbacks das duas rotas reais.', 'Lista abre /equipes/calendario; calendário abre /equipes.', () => { const h=fixture();h.load('src/app/(app)/equipes/index.tsx').default().props.onOpenCalendar();h.load('src/app/(app)/equipes/calendario.tsx').default().props.onOpenTeams();assert.deepEqual(h.events,[['navigate','/equipes/calendario'],['navigate','/equipes']]); });
module.exports = cases;
