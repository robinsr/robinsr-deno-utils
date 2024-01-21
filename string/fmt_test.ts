import { varEx } from './fmt.ts';
import { assertEquals } from "https://deno.land/std@0.204.0/assert/mod.ts";

Deno.test('String - varEx', (t) => {
  t.step(t => {
    const testTmpl = [
      "var1: {var1} var2: {var2}",
      "Nested: '{nest.aaa}', '{nest.bbb}'",
      "Array: {nest.arr[0]} - {nest.arr[1]} - {nest.arr[2]}",
    ].join('\n');

    const params = { 
      var1: 'Hello',
      var2: 'World',
      nest: {
        aaa: 'inner1',
        bbb: 'inner2',
        arr: 'Im A Banana'.split(' ')
      }
    }

    const expected = [
      "var1: Hello var2: World",
      "Nested: 'inner1', 'inner2'",
      "Array: Im - A - Banana",
    ].join('\n');

    assertEquals(varEx(testTmpl, params), expected);
  });
});
