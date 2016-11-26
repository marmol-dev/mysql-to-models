import {JSONWithId, SerializerSettings, JSONId} from "./serializer";
export default class JSONObjectStore {
    private _map: {
        [className : string]: {
            [id: string]: JSONWithId;
        };
    }

    private _settings : SerializerSettings;

    constructor(_settings : SerializerSettings){
        Object.assign(this, {_settings});
        this._map = {};
    }

    add(obj: JSONWithId){
        const id = obj[this._settings.idPropertyName];
        if (id[0] in this._map === false){
            this._map[id[0]] = {};
        }

        this._map[id[0]][id[1]] = obj;
    }

    get(id: JSONId) : JSONWithId {
        if (id[0] in this._map === false || id[1] in this._map[id[0]] === false){
            return undefined;
        }

        return this._map[id[0]][id[1]];
    }


    get objects() {
        return this._map;
    }
}