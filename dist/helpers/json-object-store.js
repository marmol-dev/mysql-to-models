"use strict";
class JSONObjectStore {
    constructor(_settings) {
        Object.assign(this, { _settings: _settings });
        this._map = {};
    }
    add(obj) {
        const id = obj[this._settings.idPropertyName];
        if (id[0] in this._map === false) {
            this._map[id[0]] = {};
        }
        this._map[id[0]][id[1]] = obj;
    }
    get(id) {
        if (id[0] in this._map === false || id[1] in this._map[id[0]] === false) {
            return undefined;
        }
        return this._map[id[0]][id[1]];
    }
    get objects() {
        return this._map;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = JSONObjectStore;
//# sourceMappingURL=json-object-store.js.map