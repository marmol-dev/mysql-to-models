import Table = require('./table.model');
import Column = require('./column.model');
import {Serializable, Construct, Serialize, Id} from "../helpers/serializable";

@Serializable()
class ForeignKey {
    @Construct()
    private _tableName : string;
    @Construct()
    private _columnName : string;
    @Construct()
    private _constraintName : string;
    @Construct()
    private _referencedTableName : string;
    @Construct()
    private _referencedColumnName : string;
    @Construct()
    private _table : Table;
    @Construct()
    private _column : Column;
    @Construct()
    private _referencedTable : Table;
    @Construct()
    private _referencedColumn : Column;

    @Construct()
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