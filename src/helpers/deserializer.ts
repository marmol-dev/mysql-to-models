
import {JSONId, JSONReference, JSONWithId, SerializerSettings, getDefaultSettings} from './serializer';
import JSONObjectStore from "./json-object-store";

function isObject(e: any) : boolean {
    return e !== null && !Array.isArray(e) && typeof e === 'object';
}

export type ConstructorProvider = (name : string) => Function;

export default class Deserializer {
    private _base : any;
    private _constructorProvider : ConstructorProvider;
    private _objectStore: JSONObjectStore;
    private _settings: SerializerSettings;

    constructor(_base: any, _settings: SerializerSettings = getDefaultSettings()){
        Object.assign(this, {_settings, _base});
        this._objectStore = new JSONObjectStore(_settings);
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
            this._settings.referencePropertyName in obj &&
                this.isId(obj[this._settings.referencePropertyName]);
    }

    private isWithId(obj: any){
        return isObject(obj) &&
                this._settings.idPropertyName in obj &&
                this.isId(obj[this._settings.idPropertyName]);
    }

    private getInternal(obj: JSONWithId) : Object {
       return obj[this._settings.internalPropertyName] || {};
    }

    private getId(obj: JSONWithId){
        return obj[this._settings.idPropertyName];
    }

    private getReferenceId(obj: JSONReference){
        return obj[this._settings.referencePropertyName];
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

    private constructObject(jsonObj: JSONWithId) : JSONWithId {
        const className = this.getId(jsonObj)[0];
        const constructor = this._constructorProvider(className);
        const object = Object.create(constructor.prototype);
        Object.assign(object, this.getInternal(jsonObj));
        delete object[this._settings.idPropertyName];
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

    private getLinkedObject(part : any) {
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

    public deserialize() : any {
        this.addToStorePart(this._base);
        this.deserializeStore();
        this.updateStoreReferences();
        return this.getLinkedObject(this._base);
    }

}