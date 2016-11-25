import Table = require('./table.model');
import Column = require('./column.model');
import Indexable = require('./indexable.model');

@Indexable.CollectionName("foreignKeys")
class ForeignKey extends Indexable {
    private _tableName : string;
    private _columnName : string;
    private _constraintName : string;
    private _referencedTableName : string;
    private _referencedColumnName : string;
    private _table : Table;
    private _column : Column;
    private _referencedTable : Table;
    private _referencedColumn : Column;

    constructor({TABLE_NAME, COLUMN_NAME, CONSTRAINT_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME}: {[p: string] : string}, index : number) {
        super(index);
        this._tableName = TABLE_NAME;
        this._columnName = COLUMN_NAME;
        this._constraintName = CONSTRAINT_NAME;
        this._referencedTableName = REFERENCED_TABLE_NAME;
        this._referencedColumnName = REFERENCED_COLUMN_NAME;
    }

    @Indexable.ToJSON()
    get tableName() {
        return this._tableName;
    }

    @Indexable.ToJSON()
    get columnName() {
        return this._columnName;
    }

    @Indexable.ToJSON()
    get table() {
        return this._table;
    }

    set table(table: Table) {
        this._table = table;
    }

    @Indexable.ToJSON()
    get column() {
        return this._column;
    }

    set column(column: Column) {
        this._column = column;
    }

    @Indexable.ToJSON()
    get constraintName() {
        return this._constraintName;
    }

    @Indexable.ToJSON()
    get referencedTableName() {
        return this._referencedTableName;
    }

    @Indexable.ToJSON()
    get referencedColumnName() {
        return this._referencedColumnName;
    }

    @Indexable.ToJSON()
    get referencedTable() {
        return this._referencedTable;
    }

    set referencedTable(table : Table) {
        this._referencedTable = table;
    }

    @Indexable.ToJSON()
    get referencedColumn() {
        return this._referencedColumn;
    }

    set referencedColumn(column: Column) {
        this._referencedColumn = column;
    }
}

export = ForeignKey;