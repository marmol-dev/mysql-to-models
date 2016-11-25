"use strict";
class Indexable {
    constructor(_index = null) {
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
                const proto = e.constructor;
                if ('_toJSONCollection' in proto === false) {
                    throw new Error(`Indexable subclass ${proto.name} was not decorated with all required decorators: CollectionName`);
                }
                return {
                    $index: e.index,
                    $referencedCollection: proto._toJSONCollection.name
                };
            }
            else {
                return e;
            }
        }
    }
    static ToJSON(throwsException = false, doNotIndex = false) {
        return function (target, propertyKey, descriptor) {
            if ('_toJSONProperties' in target === false) {
                target['_toJSONProperties'] = {};
            }
            target['_toJSONProperties'][propertyKey] = { throwsException, doNotIndex };
        };
    }
    static CollectionName(name) {
        return function (target) {
            if (!Indexable.isPrototypeOf(target)) {
                console.error(target);
                throw new Error('CollectionName is only available for Indexable');
            }
            if ('_toJSONCollection' in target === false) {
                target['_toJSONCollection'] = {};
            }
            target['_toJSONCollection']['name'] = name;
        };
    }
}
module.exports = Indexable;
//# sourceMappingURL=indexable.model.js.map