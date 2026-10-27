const { test, beforeEach, afterEach } = require('node:test');
const cases = require('./cases.cjs');
const original = { fetch: global.fetch, setTimeout: global.setTimeout, clearTimeout: global.clearTimeout, env: process.env.EXPO_PUBLIC_API_URL };
beforeEach(() => {
  process.env.EXPO_PUBLIC_API_URL = 'https://fixture.invalid///';
  global.fetch = async () => { throw new Error('Rede real proibida nesta suíte; configure uma fixture.'); };
});
afterEach(() => {
  global.fetch = original.fetch; global.setTimeout = original.setTimeout; global.clearTimeout = original.clearTimeout;
  if (original.env === undefined) delete process.env.EXPO_PUBLIC_API_URL; else process.env.EXPO_PUBLIC_API_URL = original.env;
});
for (const item of cases) test(`[${item.id}] ${item.title}`, { timeout: 10000, concurrency: false }, item.run);
