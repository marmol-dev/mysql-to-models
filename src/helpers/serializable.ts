import 'reflect-metadata';
import {getDefaultSettings, SerializerSettings} from './serializer';

/**
 * Init the serializeProperties of a class if is not init
 * @param constructor
 * @returns {string[]} The serializeProperties of the class
 */
function initSerializerProperties(constructor: Function) : string[] {
    let serializeProperties: string[] = Reflect.getMetadata('serializeProperties', constructor);
    if (!serializeProperties){
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
export function Serialize(replaceWithId: boolean = true){
    return function (target: Object, propertyKey: string) {
        const properties = initSerializerProperties(target.constructor);
        properties.push(propertyKey);
        Reflect.defineMetadata('serialize', {replaceWithId}, target, propertyKey);
    };
}

/**
 * Decorator to set a class Serializable
 * @param serializerSettings
 * @returns {(constructor:Function)=>void}
 * @constructor
 */
export function Serializable(){
    return function (constructor: Function) : void {
        initSerializerProperties(constructor);
    };
}