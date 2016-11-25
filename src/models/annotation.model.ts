import Indexable = require("./indexable.model");
import Table = require("./table.model");
import Column = require("./column.model");
import ForeignKey = require("./foreign_key.model");

@Indexable.CollectionName("annotations")
class Annotation extends Indexable {


    private _table : Table;
    private _column: Column;
    private _foreignKey: ForeignKey;

    constructor(private _name: string, private _values : any, index: number){
        super(index);
    }

    get hasValues() {
        return this._values !== null;
    }

    @Indexable.ToJSON()
    get table(): Table {
        return this._table;
    }

    @Indexable.ToJSON()
    get column(): Column {
        return this._column;
    }

    @Indexable.ToJSON()
    get foreignKey(): ForeignKey {
        return this._foreignKey;
    }

    @Indexable.ToJSON()
    get name(): string {
        return this._name;
    }

    @Indexable.ToJSON()
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
