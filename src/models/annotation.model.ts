import Table = require("./table.model");
import Column = require("./column.model");
import ForeignKey = require("./foreign_key.model");
import {Serializable, Serialize} from "../helpers/serializable";
import {Deserialize, Deserializable} from "../helpers/deserializable";

@Serializable()
@Deserializable()
class Annotation {

    @Deserialize()
    private _table : Table;
    @Deserialize()
    private _column: Column;
    @Deserialize()
    private _foreignKey: ForeignKey;
    @Deserialize()
    private _name: string;
    @Deserialize()
    private _values : any;
    @Deserialize()
    private _index: number;

    constructor(_name: string, _values : any, _index: number){
        Object.assign(this, {_name, _values, _index});
    }

    get hasValues() {
        return this._values !== null;
    }

    @Serialize()
    get table(): Table {
        return this._table;
    }

    @Serialize()
    get column(): Column {
        return this._column;
    }

    @Serialize()
    get foreignKey(): ForeignKey {
        return this._foreignKey;
    }

    @Serialize()
    get name(): string {
        return this._name;
    }

    @Serialize()
    get values(): any {
        return this._values;
    }


    set table(value: Table) {
        this._table = value;
    }

    set column(value: Column) {
        this._column = value;
    }

    set foreignKey(value: ForeignKey) {
        this._foreignKey = value;
    }
}

export = Annotation;
