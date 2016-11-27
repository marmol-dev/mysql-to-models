"use strict";
function isObject(e) {
    return e !== null && !Array.isArray(e) && typeof e === 'object';
}
const DEFAULT_SETTINGS = {
    idPropertyName: '#',
    referencePropertyName: '@',
    internalPropertyName: '_'
};
function getDefaultSettings() {
    return Object.assign({}, DEFAULT_SETTINGS);
}
exports.getDefaultSettings = getDefaultSettings;
const serializedSymbol = Symbol();
class Serializer {
    constructor(_base, _settings = getDefaultSettings()) {
        Object.assign(this, { _base: _base, _settings: _settings });
    }
    static guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
    getIdPropertyName(part) {
        const idPropertyName = '__serializeId__';
        return idPropertyName;
    }
    getJSONId(part) {
        const idPropertyName = this.getIdPropertyName(part);
        if (idPropertyName in part === false) {
            Object.defineProperty(part, idPropertyName, {
                value: Serializer.guid(),
                enumerable: false
            });
        }
        return [part.constructor.name || null, part[idPropertyName]];
    }
    getJSONReference(obj) {
        return {
            [this._settings.referencePropertyName]: this.getJSONId(obj)
        };
    }
    getSerializeProperties(part) {
        let properties = Reflect.getMetadata('serializeProperties', part.constructor);
        if (!properties) {
            //if (part.constructor === Object || !part.constructor){
            properties = Object.keys(part);
        }
        return properties;
    }
    getDeserializeProperties(part) {
        let properties = Reflect.getMetadata('deserializeProperties', part.constructor);
        if (!properties) {
            //if (part.constructor === Object || !part.constructor){
            properties = Object.keys(part);
        }
        return properties;
    }
    serializePart(part) {
        if (Array.isArray(part)) {
            return part.map((e) => this.serializePart(e));
        }
        else if (isObject(part)) {
            if (serializedSymbol in part === false) {
                part[serializedSymbol] = true;
                const toret = {
                    [this._settings.idPropertyName]: this.getJSONId(part),
                };
                const serializeProperties = this.getSerializeProperties(part);
                serializeProperties.forEach(key => {
                    try {
                        toret[key] = this.serializePart(part[key]);
                    }
                    catch (e) { }
                });
                let deserializeProperties = this.getDeserializeProperties(part);
                toret[this._settings.internalPropertyName] = {};
                deserializeProperties.forEach(key => {
                    try {
                        toret[this._settings.internalPropertyName][key] = this.serializePart(part[key]);
                    }
                    catch (e) { }
                });
                return toret;
            }
            else {
                return this.getJSONReference(part);
            }
        }
        else {
            return part;
        }
    }
    serialize() {
        return this.serializePart(this._base);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Serializer;
//# sourceMappingURL=serializer.js.map