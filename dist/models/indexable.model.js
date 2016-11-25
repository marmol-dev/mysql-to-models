"use strict";
class Indexable {
    constructor(_index) {
        this._index = _index;
    }
    get index() {
        return this._index;
    }
    toJSON() {
        const toret = {};
        const proto = Object.getPrototypeOf(this);
        if ('_toJSONProperties' in proto === false) {
            proto["_toJSONProperties"] = {};
        }
        const props = proto['_toJSONProperties'];
        for (let prop in props) {
            if (proto['_toJSONProperties'][prop].throwsException) {
                try {
                    toret[prop] = Indexable.getValue(this[prop], proto['_toJSONProperties'][prop].doNotIndex);
                }
                catch (e) { }
            }
            else {
                toret[prop] = Indexable.getValue(this[prop], proto['_toJSONProperties'][prop].doNotIndex);
            }
        }
        return toret;
    }
    static getValue(e, doNotIndex = false) {
        if (doNotIndex) {
            return e;
        }
        if (Array.isArray(e)) {
            return e.map(e2 => Indexable.getValue(e2));
        }
        else {
            if (e instanceof Indexable) {
                return e.index;
            }
            else {
                return e;
            }
        }
    }
    static ToJSON(throwsException = false, doNotIndex = false) {
        return function (target, propertyKey, descriptor) {
            if (target instanceof Indexable === false) {
                throw new Error('ToJSON is only available for Indexable instances');
            }
            if ('_toJSONProperties' in target === false) {
                target['_toJSONProperties'] = {};
            }
            target['_toJSONProperties'][propertyKey] = { throwsException, doNotIndex };
        };
    }
}
module.exports = Indexable;
//# sourceMappingURL=indexable.model.js.map