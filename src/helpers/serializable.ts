interface PropertySettings {
    replaceWithId: boolean;
}


interface SerializableSettings {
    publicProperties: {
        [name: string]: PropertySettings;
    };

    constructProperties: {
        [name: string]: PropertySettings;
    };

    idProperty: string;
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

interface SerializableConstructor extends Function {
    __serializableSettings: SerializableSettings;
}

interface SerializableInstance extends Function {
    getSerializableId(): any;
    [prop: string]: any;
}

interface SerializableJSON {
    __constructProperties: {
        [prop : string]: any;
    };
    [prop: string]: any;
}

interface SerializableReference {
    __serializableClass: string;
    __serializableId: any;
}

function toJSON() : SerializableJSON {
    const self : SerializableInstance = <SerializableInstance>this;

    const toret : SerializableJSON = {
        __constructProperties: {}
    };

    const proto = <SerializableConstructor>Object.getPrototypeOf(this);

    if ('__serializableSettings' in proto === false) {
        return toret;
    }

    const publicProperties = proto.__serializableSettings.publicProperties;

    for(let propName in publicProperties) {

        try {
            toret[propName] = getValue(
                self[propName],
                proto.__serializableSettings.publicProperties[propName]
            );
        } catch(e){ }
    }

    const constructProperties = proto.__serializableSettings.constructProperties;

    for (let propName in constructProperties){
        try {
            toret.__constructProperties[propName] = getValue(
                self[propName],
                proto.__serializableSettings.constructProperties[propName]
            );
        } catch(e) {}
    }

    return toret;
}

function isSerializable(obj : SerializableInstance | any) : boolean {
    return obj instanceof Object && 'getSerializableId' in obj && typeof obj.getSerializableId === 'function';
}

function getReference(obj: SerializableInstance, propertySettings: PropertySettings) : SerializableReference {
    return {
        __serializableClass: obj.constructor.name,
        __serializableId: obj.getSerializableId()
    };
}

function getValue(val: any, propertySettings: PropertySettings) : any {

    if (Array.isArray(val)) {
        return val.map((e2: any) => getValue(e2, propertySettings));
    } else {
        if (isSerializable(val) && propertySettings.replaceWithId) {
            return getReference(val, propertySettings);
        } else {
            return val;
        }
    }
}

function getSerializableId() {
    const proto = <SerializableConstructor>Object.getPrototypeOf(this);

    let idProperty = '__serializableId';

    if ('__serializableSettings' in proto) {
        idProperty = proto.__serializableSettings.idProperty;
    }

    if (idProperty in <any>this === false) {
        (<any>this)[idProperty] = guid();
    }

    return (<any>this)[idProperty];
}

function initConstructor(constructor : SerializableConstructor) {
    if ('__serializableSettings' in constructor === false) {

        constructor.__serializableSettings = {
            'publicProperties': {},
            'constructProperties': {},
            'idProperty': '__serializableId'
        };
    }
}

export function Serialize(replaceWithId: boolean = true){
    return function (constructor: any, propertyKey: string, descriptor: PropertyDescriptor) {

        initConstructor(<SerializableConstructor>constructor);

        (<SerializableConstructor>constructor).__serializableSettings.publicProperties[propertyKey] = {
            replaceWithId
        };
    };
}

export function Construct(replaceWithId: boolean = true){
    return function (constructor: any, propertyKey: string) {

        initConstructor(<SerializableConstructor>constructor);

        (<SerializableConstructor>constructor).__serializableSettings.constructProperties[propertyKey] = {
            replaceWithId
        };
    };
}

export function Id(){
    return function (constructor: any, propertyKey: string) {
        initConstructor(<SerializableConstructor>constructor);
        (<SerializableConstructor>constructor).__serializableSettings.idProperty = propertyKey;
    };
}


export function Serializable(){
    return function (constructor: any) : void {
        constructor.prototype.toJSON = toJSON;
        constructor.prototype.getSerializableId = getSerializableId;
    };
}