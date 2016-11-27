"use strict";
const serializer_1 = require('./serializer');
const json_object_store_1 = require("./json-object-store");
function isObject(e) {
    return e !== null && !Array.isArray(e) && typeof e === 'object';
}
class Deserializer {
    constructor(_base, _settings = serializer_1.getDefaultSettings()) {
        Object.assign(this, { _settings: _settings, _base: _base });
        this._objectStore = new json_object_store_1.default(_settings);
    }
    get constructorProvider() {
        return this._constructorProvider;
    }
    set constructorProvider(value) {
        this._constructorProvider = value;
    }
    isId(val) {
        return Array.isArray(val) &&
            val.length === 2;
    }
    isReference(obj) {
        return isObject(obj) &&
            this._settings.referencePropertyName in obj &&
            this.isId(obj[this._settings.referencePropertyName]);
    }
    isWithId(obj) {
        return isObject(obj) &&
            this._settings.idPropertyName in obj &&
            this.isId(obj[this._settings.idPropertyName]);
    }
    getInternal(obj) {
        return obj[this._settings.internalPropertyName] || {};
    }
    getId(obj) {
        return obj[this._settings.idPropertyName];
    }
    getReferenceId(obj) {
        return obj[this._settings.referencePropertyName];
    }
    addToStorePart(obj) {
        if (isObject(obj)) {
            if (this.isWithId(obj)) {
                this._objectStore.add(obj);
            }
            if (!this.isReference(obj)) {
                for (let key in obj) {
                    this.addToStorePart(obj[key]);
                }
            }
        }
        else if (Array.isArray(obj)) {
            obj.forEach((e) => this.addToStorePart(e));
        }
    }
    constructObject(jsonObj) {
        const className = this.getId(jsonObj)[0];
        const constructor = this._constructorProvider(className);
        const object = Object.create(constructor.prototype);
        Object.assign(object, this.getInternal(jsonObj));
        delete object[this._settings.idPropertyName];
        return object;
    }
    deserializeStore() {
        for (let className in this._objectStore.objects) {
            for (let objectId in this._objectStore.objects[className]) {
                this._objectStore.objects[className][objectId] = this.constructObject(this._objectStore.objects[className][objectId]);
            }
        }
    }
    updateReferences(obj) {
        if (Array.isArray(obj)) {
            return obj.map((e) => this.updateReferences(e));
        }
        else if (isObject(obj)) {
            if (this.isReference(obj)) {
                return this._objectStore.get(this.getReferenceId(obj));
            }
            else {
                for (let key in obj) {
                    obj[key] = this.updateReferences(obj[key]);
                }
                return obj;
            }
        }
        else {
            return obj;
        }
    }
    updateStoreReferences() {
        for (let className in this._objectStore.objects) {
            for (let objectId in this._objectStore.objects[className]) {
                this._objectStore.objects[className][objectId] = this.updateReferences(this._objectStore.objects[className][objectId]);
            }
        }
    }
    getLinkedObject(part) {
        if (Array.isArray(part)) {
            return part.map((e) => this.getLinkedObject(e));
        }
        else if (isObject(part)) {
            if (this.isReference(part)) {
                return this._objectStore.get(this.getReferenceId(part));
            }
            else {
                if (this.isWithId(part)) {
                    return this._objectStore.get(this.getId(part));
                }
                else {
                    let toret = {};
                    for (let key in toret) {
                        toret[key] = this.getLinkedObject(toret[key]);
                    }
                    return toret;
                }
            }
        }
        else {
            return part;
        }
    }
    deserialize() {
        this.addToStorePart(this._base);
        this.deserializeStore();
        this.updateStoreReferences();
        return this.getLinkedObject(this._base);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Deserializer;
//# sourceMappingURL=deserializer.js.map