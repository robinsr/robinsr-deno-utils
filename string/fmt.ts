type ValueOf<T> = T[keyof T];

type TmplParams = {
  [index: string]: string | number | string[] | number[] | TmplParams;
}

type SimpleMap = {
  [prop: string]: string | SimpleMap;
}

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`: `${Key}`
}[keyof ObjectType & (string | number)];


// deno-lint-ignore-file no-explicit-any
const objGet = (from: SimpleMap, selector: NestedKeyOf<SimpleMap>): ValueOf<SimpleMap> => {
  return selector
    .replace(/\[([^\[\]]*)\]/g, '.$1.')
    .split('.')
    .filter(t => t !== '')
    .reduce((acc, cur) => acc && acc[cur], from)
}

const GARY = {
  age: 50,
  height: '250cm',
  pets: {
    dog: {
      name: 'Fido',
      age: 6
    },
    cat: {
      name: 'Mr Snuggles',
      age: 3
    }
  }
}





/**
 * Formats a template string
 * @param {string} tmpl Template string with curly brace variable
 * @param {object} params Template parameters object
 */
export function varEx(tmpl: string, params: TmplParams): string {
  // Find all {} blocks, and run a function for each block found.
  // Returns a complete string where all VarEx blocks have been parsed
  return tmpl.replace(/\{(['"`\w[\].]+)}/g, (_: string, ...args: any[]) => {
    const key = typeof args[0] === 'string' ? args[0] : '';
    const openBracketCount = (key.match(/\{/g) || []).length; // Number of open brackets
    const closeBracketCount = (key.match(/}/g) || []).length; // Number of closed brackets
    if (openBracketCount !== closeBracketCount) return `$[${key}]`; // Perform above check, and return key as it was parsed if there are brackets left open

    // Replace all array blocks {} with .
    // eg. table['a'] becomes table.a
    // table[1] becomes table.1
    const cleanKey = key.replace(/\[["'`]?(\w*)["'`]?\]/g, ".$1");
    return objGet(params, cleanKey) as string;
  });
}

