interface PropertyMetadata {
    throwsException: boolean;
}

abstract class Indexable {

    constructor(private _index : number = null){

    }

    get index() {
        return this._index;
    }

    toJSON() {
        const toret : any = {};

        const proto = Object.getPrototypeOf(this);
        if ('_toJSONProperties' in proto === false) {
            proto["_toJSONProperties"] = {};
        }

        const props = proto['_toJSONProperties'];

        for(let prop in props) {
            if (proto['_toJSONProperties'][prop].throwsException){
                try {
                    toret[prop] = Indexable.getValue((<any>this)[prop], proto['_toJSONProperties'][prop].doNotIndex);
                } catch(e){}
            } else {
                toret[prop] = Indexable.getValue((<any>this)[prop], proto['_toJSONProperties'][prop].doNotIndex);
            }
        }

        return toret;
    }

    static getValue(e: any, doNotIndex: boolean = false) : any {

        if (doNotIndex) {
            return e;
        }

        if (Array.isArray(e)) {
            return e.map(e2 => Indexable.getValue(e2));
        } else {
            if (e instanceof Indexable) {
                const proto = <any>e.constructor;

                if ('_toJSONCollection' in proto === false){
                    throw new Error(`Indexable subclass ${proto.name} was not decorated with all required decorators: CollectionName`);
                }

                return {
                    $index: e.index,
                    $referencedCollection: proto._toJSONCollection.name
                };
            } else {
                return e;
            }
        }
    }

    public static ToJSON(throwsException: boolean = false, doNotIndex: boolean = false) {
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            if ('_toJSONProperties' in target === false) {
                target['_toJSONProperties'] = {};
            }

            target['_toJSONProperties'][propertyKey] = {throwsException, doNotIndex};
        };
    }

    public static CollectionName(name: string){
        return function (target: any) {
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


export = Indexable;