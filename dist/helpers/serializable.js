"use strict";
require('reflect-metadata');
/**
 * Init the serializeProperties of a class if is not init
 * @param constructor
 * @returns {string[]} The serializeProperties of the class
 */
function initSerializerProperties(constructor) {
    let serializeProperties = Reflect.getMetadata('serializeProperties', constructor);
    if (!serializeProperties) {
        serializeProperties = [];
        Reflect.defineMetadata('serializeProperties', serializeProperties, constructor);
    }
    return serializeProperties;
}
/**
 * Serialize decorator
 * It apply to properties
 * @param replaceWithId
 * @returns {(target:Object, propertyKey:string)=>undefined}
 * @constructor
 */
function Serialize(replaceWithId = true) {
    return function (target, propertyKey) {
        const properties = initSerializerProperties(target.constructor);
        properties.push(propertyKey);
        Reflect.defineMetadata('serialize', { replaceWithId: replaceWithId }, target, propertyKey);
    };
}
exports.Serialize = Serialize;
/**
 * Decorator to set a class Serializable
 * @param serializerSettings
 * @returns {(constructor:Function)=>void}
 * @constructor
 */
function Serializable() {
    return function (constructor) {
        initSerializerProperties(constructor);
    };
}
exports.Serializable = Serializable;
//# sourceMappingURL=serializable.js.map