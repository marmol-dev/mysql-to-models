"use strict";
class NamesHelper {
    /**
     * Get the plural of a name
     *
     * @static
     * @param {string} name The name to pluralize
     * @return {string} The plural name
     * @memberOf NamesHelper
     */
    static plural(name) {
        const vogals = ['a', 'e', 'i', 'o', 'u'];
        const lastLetter = name.slice(-1);
        let pluralSufix;
        if (vogals.lastIndexOf(lastLetter) === -1) {
            //not vogal
            pluralSufix = 'es';
        }
        else {
            //vogal
            pluralSufix = 's';
        }
        return `${name}${pluralSufix}`;
    }
}
module.exports = NamesHelper;
//# sourceMappingURL=names.helper.js.map