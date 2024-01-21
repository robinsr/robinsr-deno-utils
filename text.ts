/**
 * Formats a template string with parameters from a string map
 * @param tmpl - Template string with variable format of "{varName}"
 * @param params - Data model with which to perform the text replacement
 * @returns {string} - Formatted string
 * @type {(tmpl: string, params: Record<string, string>) => string}
 */
export const textReplace = (tmpl: string, params: Record<string, string>): string => {
  return Object.entries(params).reduce((result, [ key, val ]) => {
    try {
      return result.replace(`{${key}}`, val);
    } catch (e) {
      console.warn('Replace text error', tmpl, params);
      return '';
    }
  }, tmpl);
}
