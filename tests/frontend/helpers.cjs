const fs = require('node:fs');
const path = require('node:path');
const { createRequire } = require('node:module');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../..');
const ts = require(path.join(root, 'node_modules/typescript'));
const sharedErrorModules = new Map();

// Executa os módulos reais; React Native, transporte e serviços só são substituídos explicitamente.
function createLoader(mocks = {}) {
  const cache = new Map();
  function load(relative) {
    const candidate = path.isAbsolute(relative) ? relative : path.join(root, relative);
    const filename = [candidate, candidate + '.ts', candidate + '.tsx', path.join(candidate, 'index.ts')]
      .find(file => fs.existsSync(file) && fs.statSync(file).isFile());
    if (!filename) throw new Error(`Módulo de teste não encontrado: ${relative}`);
    const modules = filename === path.join(root, 'src/shared/services/api/app-error.ts') ? sharedErrorModules : cache;
    if (modules.has(filename)) return modules.get(filename).exports;
    const module = { exports: {} };
    modules.set(filename, module);
    const output = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 },
    }).outputText;
    const external = createRequire(filename);
    new Function('require', 'exports', 'module', output)(id => {
      if (Object.hasOwn(mocks, id)) return mocks[id];
      if (id.endsWith('.png')) return id;
      if (id.startsWith('@/')) return load(path.join(root, 'src', id.slice(2)));
      if (id.startsWith('.')) return load(path.resolve(path.dirname(filename), id));
      return external(id);
    }, module.exports, module);
    return module.exports;
  }
  return load;
}

// Harness lógico de hooks: não simula DOM, renderização, layout ou agendamento completo do React.
function hookRuntime() {
  const slots = [];
  let cursor = 0;
  let effects = [];
  const same = (a, b) => a && b && a.length === b.length && a.every((v, i) => v === b[i]);
  const react = {
    useState(initial) {
      const index = cursor++;
      if (!(index in slots)) slots[index] = typeof initial === 'function' ? initial() : initial;
      return [slots[index], next => { slots[index] = typeof next === 'function' ? next(slots[index]) : next; }];
    },
    useRef(initial) { const index = cursor++; return slots[index] ??= { current: initial }; },
    useCallback(fn, deps) {
      const index = cursor++;
      if (!slots[index] || !same(slots[index].deps, deps)) slots[index] = { deps, fn };
      return slots[index].fn;
    },
    useMemo(fn, deps) { return react.useCallback(fn, deps)(); },
    useEffect(fn, deps) {
      const index = cursor++;
      if (!slots[index] || !same(slots[index].deps, deps)) effects.push(() => {
        slots[index]?.cleanup?.(); slots[index] = { deps, cleanup: fn() };
      });
    },
  };
  return {
    react,
    render(fn) { cursor = 0; const value = fn(); const pending = effects; effects = []; pending.forEach(fn => fn()); return value; },
    unmount() { slots.forEach(slot => slot?.cleanup?.()); },
  };
}
const tick = () => new Promise(resolve => setImmediate(resolve));
function deferred() { let resolve, reject; const promise = new Promise((a, b) => { resolve = a; reject = b; }); return { promise, resolve, reject }; }
function elements(tree, predicate) {
  const result = [];
  function visit(node) {
    if (Array.isArray(node)) return node.forEach(visit);
    if (!node || typeof node !== 'object') return;
    if (predicate(node)) result.push(node);
    visit(node.props?.children);
  }
  visit(tree); return result;
}
const jsx = (type, props) => ({ type, props: props ?? {} });
const native = { View: 'View', Text: 'Text', Image: 'Image', Pressable: 'Pressable', ScrollView: 'ScrollView', Platform: { OS: 'web' } };
const session = { userId: '33333333-3333-4333-8333-333333333333', name: 'Conta de teste', username: 'fixture', email: 'fixture@example.invalid', role: 'VIEWER' };
const baseOccurrence = { problemId: '11111111-1111-4111-8111-111111111111', materialId: '22222222-2222-4222-8222-222222222222', affectedQuantity: 1, reportedByUserId: session.userId };
const photo = (size = 1024, extra = {}) => ({ uri: 'file:///fixture.png', name: 'fixture.png', mimeType: 'image/png', size, ...extra });
function scenario(id, title, steps, expected, run, priority = 'Alta') {
  return { id, title, steps, expected, run, priority, level: 'Automatizado lógico/contrato com mocks' };
}
module.exports = { assert, fs, path, root, createLoader, hookRuntime, tick, deferred, elements, jsx, native, session, baseOccurrence, photo, scenario };
