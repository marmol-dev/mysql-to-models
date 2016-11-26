import 'reflect-metadata';
import {isDeserializable} from './deserializable';

export interface SerializableDefaults {
    idPropertyName: string;
    referencePropertyName: string;
    internalPropertyName: string;
}

const DEFAULTS : SerializableDefaults = {
    idPropertyName: '#',
    referencePropertyName: '@',
    internalPropertyName: '_'
};

interface PropertySettings {
    replaceWithId: boolean;
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

interface SerializableInstance extends Function {
    getSerializableId(): any;
    [prop: string]: any;
}

export type SerializableId = [string, string];

export interface SerializableReference {
    [prop : string]: SerializableId;
}

export interface SerializableWithId {
    [prop : string]: SerializableId;
}

function toJSON() {
    const self : SerializableInstance = this;

    const toret : any = getIdObject(self);

    const publicProperties : string[] = Reflect.getMetadata('serializeProperties', self.constructor);

    for(let propName of publicProperties) {

        try {
            toret[propName] = getValue(
                self[propName],
                Reflect.getMetadata('serialize', self, propName)
            );
        } catch(e){ }
    }

    if (isDeserializable(self)) {
        Object.assign(toret, {
            [DEFAULTS.internalPropertyName]: {}
        });

        const deserializableProperties: string[] = Reflect.getMetadata('deserializeProperties', self.constructor);

        for(let propName of deserializableProperties) {

            try {
                toret[DEFAULTS.internalPropertyName][propName] = getValue(
                    self[propName],
                    Reflect.getMetadata('deserialize', self, propName)
                );
            } catch(e){ }
        }
    }

    return toret;
}

function isSerializable(obj : SerializableInstance | any) : boolean {
    return obj instanceof Object && 'getSerializableId' in obj && typeof obj.getSerializableId === 'function';
}

function getIdObject(obj: SerializableInstance) {
    return {
        [DEFAULTS.idPropertyName]: [obj.constructor.name, obj.getSerializableId()]
    };
}

function getReferenceObject(obj: SerializableInstance, propertySettings: PropertySettings) : SerializableReference {
    return {
        [DEFAULTS.referencePropertyName]: [obj.constructor.name, obj.getSerializableId()]
    };
}

function getValue(val: any, propertySettings: PropertySettings) : any {

    if (Array.isArray(val)) {
        return val.map((e2: any) => getValue(e2, propertySettings));
    } else {
        if (isSerializable(val) && propertySettings.replaceWithId) {
            return getReferenceObject(val, propertySettings);
        } else {
            return val;
        }
    }
}

function getSerializableId() {
    let idProperty = DEFAULTS.idPropertyName;
    let idMetadata = Reflect.getMetadata('id', this);
    if (idMetadata) {
        idProperty = idMetadata;
    }

    if (idProperty in <any>this === false) {
        (<any>this)[idProperty] = guid();
    }

    return (<any>this)[idProperty];
}

export function setDefaults(defaults: SerializableDefaults){
    Object.assign(DEFAULTS, defaults);
}

export function getDefaults() : SerializableDefaults {
    return Object.assign({}, DEFAULTS);
}

export function Serialize(replaceWithId: boolean = true){
    return function (target: Object, propertyKey: string) {
        let serializeProperties: string[] = Reflect.getMetadata('serializeProperties', target.constructor);
        if (!serializeProperties){
            serializeProperties = [];
            Reflect.defineMetadata('serializeProperties', serializeProperties, target.constructor);
        }
        serializeProperties.push(propertyKey);
        Reflect.defineMetadata('serialize', {replaceWithId}, target, propertyKey);
    };
}

export function Construct(replaceWithId: boolean = true){
    return function (constructor: any, propertyKey: string) {

    };
}

export function Id(){
    return function (constructor: any, propertyKey: string) {
        Reflect.defineMetadata('id', propertyKey, constructor);
    };
}


export function Serializable(){
    return function (constructor: Function) : void {
        let serializeProperties: string[] = Reflect.getMetadata('serializeProperties', constructor);
        if (!serializeProperties){
            serializeProperties = [];
            Reflect.defineMetadata('serializeProperties', serializeProperties, constructor);
        }

        constructor.prototype.toJSON = toJSON;
        constructor.prototype.getSerializableId = getSerializableId;
    };
}