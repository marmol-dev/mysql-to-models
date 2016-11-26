import Table = require('./table.model');
import Column = require('./column.model');
import {Serializable, Construct, Serialize, Id} from "../helpers/serializable";
import {Deserializable, Deserialize} from "../helpers/deserializable";

@Serializable()
@Deserializable()
class ForeignKey {
    @Deserialize()
    private _tableName : string;
    @Deserialize()
    private _columnName : string;
    @Deserialize()
    private _constraintName : string;
    @Deserialize()
    private _referencedTableName : string;
    @Deserialize()
    private _referencedColumnName : string;
    @Deserialize()
    private _table : Table;
    @Deserialize()
    private _column : Column;
    @Deserialize()
    private _referencedTable : Table;
    @Deserialize()
    private _referencedColumn : Column;

    @Deserialize()
    @Id()
    private _index : number;

    constructor({TABLE_NAME, COLUMN_NAME, CONSTRAINT_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME}: {[p: string] : string}, index : number) {
        this._index = index;
        this._tableName = TABLE_NAME;
        this._columnName = COLUMN_NAME;
        this._constraintName = CONSTRAINT_NAME;
        this._referencedTableName = REFERENCED_TABLE_NAME;
        this._referencedColumnName = REFERENCED_COLUMN_NAME;
    }

    @Serialize()
    get tableName() {
        return this._tableName;
    }

    @Serialize()
    get columnName() {
        return this._columnName;
    }

    @Serialize()
    get table() {
        return this._table;
    }

    set table(table: Table) {
        this._table = table;
    }

    @Serialize()
    get column() {
        return this._column;
    }

    set column(column: Column) {
        this._column = column;
    }

    @Serialize()
    get constraintName() {
        return this._constraintName;
    }

    @Serialize()
    get referencedTableName() {
        return this._referencedTableName;
    }

    @Serialize()
    get referencedColumnName() {
        return this._referencedColumnName;
    }

    @Serialize()
    get referencedTable() {
        return this._referencedTable;
    }

    set referencedTable(table : Table) {
        this._referencedTable = table;
    }

    @Serialize()
    get referencedColumn() {
        return this._referencedColumn;
    }

    set referencedColumn(column: Column) {
        this._referencedColumn = column;
    }
}

export = ForeignKey;