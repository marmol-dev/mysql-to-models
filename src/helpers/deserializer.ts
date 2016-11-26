import * as util from 'util';

import {
    SerializableWithId, getDefaults, SerializableDefaults, SerializableId,
    SerializableReference
} from "./serializable";
export type ConstructorProvider = (name : string) => Function;

function isObject(e: any) : boolean {
    return e !== null && !Array.isArray(e) && typeof e === 'object';
}

class ObjectStore {
    private _map: {
        [className : string]: {
            [id: string]: SerializableWithId;
        };
    }

    constructor(){
        this._map = {};
    }

    add(obj: SerializableWithId){
        const id = obj[getDefaults().idPropertyName];
        if (id[0] in this._map === false){
            this._map[id[0]] = {};
        }

        this._map[id[0]][id[1]] = obj;
    }

    get(id: SerializableId) : SerializableWithId {
        if (id[0] in this._map === false || id[1] in this._map[id[0]] === false){
            return undefined;
        }

        return this._map[id[0]][id[1]];
    }


    get objects() {
        return this._map;
    }
}

export default class Deserializer {
    private _base : any;
    private _constructorProvider : ConstructorProvider;
    private _objectStore: ObjectStore;
    private _defaults: SerializableDefaults;

    constructor(_base: any){
        this._objectStore = new ObjectStore();
        this._base = _base;
        this._defaults = getDefaults();
    }

    get constructorProvider(): ConstructorProvider {
        return this._constructorProvider;
    }

    set constructorProvider(value: ConstructorProvider) {
        this._constructorProvider = value;
    }

    private isId(val: any): boolean {
        return Array.isArray(val) &&
            val.length === 2;
    }

    private isReference(obj: any) : boolean {
        return isObject(obj) &&
            this._defaults.referencePropertyName in obj &&
                this.isId(obj[this._defaults.referencePropertyName]);
    }

    private isWithId(obj: any){
        return isObject(obj) &&
                this._defaults.idPropertyName in obj &&
                this.isId(obj[this._defaults.idPropertyName]);
    }

    private getInternal(obj: SerializableWithId) : Object {
       return obj[this._defaults.internalPropertyName] || {};
    }

    private getId(obj: SerializableWithId){
        return obj[this._defaults.idPropertyName];
    }

    private getReferenceId(obj: SerializableReference){
        return obj[this._defaults.referencePropertyName];
    }

    private addToStorePart(obj: any){
        if (isObject(obj)){
            if (this.isWithId(obj)){
                this._objectStore.add(obj);
            }

            if( !this.isReference(obj) ) {
                for(let key in obj){
                    this.addToStorePart(obj[key]);
                }
            }
        } else if (Array.isArray(obj)){
            obj.forEach((e : any) => this.addToStorePart(e));
        }
    }

    private constructObject(jsonObj: SerializableWithId) : SerializableWithId {
        const className = this.getId(jsonObj)[0];
        const constructor = this._constructorProvider(className);
        const object = Object.create(constructor.prototype);
        Object.assign(object, this.getInternal(jsonObj));
        delete object[this._defaults.idPropertyName];
        return object;
    }

    private deserializeStore() {
        for(let className in this._objectStore.objects){
            for(let objectId in this._objectStore.objects[className]){
                this._objectStore.objects[className][objectId] = this.constructObject(this._objectStore.objects[className][objectId]);
            }
        }
    }

    private updateReferences(obj: any){
        if (Array.isArray(obj)){
            return obj.map((e : any) => this.updateReferences(e));
        } else if (isObject(obj)){
            if (this.isReference(obj)){
                return this._objectStore.get(this.getReferenceId(obj));
            } else {
                for(let key in obj){
                    obj[key] = this.updateReferences(obj[key]);
                }
                return obj;
            }
        } else {
            return obj;
        }
    }

    private updateStoreReferences() {
        for(let className in this._objectStore.objects){
            for(let objectId in this._objectStore.objects[className]){
                this._objectStore.objects[className][objectId] = this.updateReferences(this._objectStore.objects[className][objectId] );
            }
        }
    }

    public getLinkedObject(part : any) {
        if (Array.isArray(part)){
            return part.map((e: any) => this.getLinkedObject(e));
        } else if (isObject(part)) {
            if (this.isReference(part)){
                return this._objectStore.get(this.getReferenceId(part));
            } else {
                if (this.isWithId(part)){
                    return this._objectStore.get(this.getId(part));
                } else {
                    let toret : any = {};
                    for(let key in toret){
                        toret[key] = this.getLinkedObject(toret[key]);
                    }
                    return toret;
                }
            }
        } else {
            return part;
        }
    }

    public deserialize() : Object {
        this.addToStorePart(this._base);
        this.deserializeStore();
        this.updateStoreReferences();
        return this.getLinkedObject(this._base);
    }

}

const doneSymbol = Symbol('done');