import 'reflect-metadata';

export function Deserializable() {
    return function (constructor: Function) : void {
        let deserializeProperties: string[] = Reflect.getMetadata('deserializeProperties', constructor);
        if (!deserializeProperties){
            deserializeProperties = [];
            Reflect.defineMetadata('deserializeProperties', deserializeProperties, constructor);
        }
    };
}

export function Deserialize(){
    return function (target: Object, propertyKey: string) {
        let deserializeProperties: string[] = Reflect.getMetadata('serializedProperties', target.constructor);
        if (!deserializeProperties){
            deserializeProperties = [];
            Reflect.defineMetadata('deserializeProperties', deserializeProperties, target.constructor);
        }
        deserializeProperties.push(propertyKey);
        Reflect.defineMetadata('deserialize', true, target, propertyKey);
    };
}

export function isDeserializable(obj: Object){
    return obj instanceof Object && Reflect.getMetadata('deserializeProperties', obj.constructor);
}
