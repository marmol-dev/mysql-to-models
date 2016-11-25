interface PropertyMetadata {
    throwsException: boolean;
}

abstract class Indexable {

    constructor(private _index : number){

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
                return e.index;
            } else {
                return e;
            }
        }
    }

    public static ToJSON(throwsException: boolean = false, doNotIndex: boolean = false) {
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            if (target instanceof Indexable === false) {
                throw new Error('ToJSON is only available for Indexable instances');
            }

            if ('_toJSONProperties' in target === false) {
                target['_toJSONProperties'] = {};
            }

            target['_toJSONProperties'][propertyKey] = {throwsException, doNotIndex};
        };
    }
}


export = Indexable;