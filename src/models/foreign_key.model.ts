import Table = require('./table.model');
import Column = require('./column.model');

class ForeignKey {
    private _tableName : string;
    private _columnName : string;
    private _constraintName : string;
    private _referencedTableName : string;
    private _referencedColumnName : string;
    private _table : Table;
    private _column : Column;
    private _referencedTable : Table;
    private _referencedColumn : Column;

    constructor({TABLE_NAME, COLUMN_NAME, CONSTRAINT_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME}: {[p: string] : string}) {
        this._tableName = TABLE_NAME;
        this._columnName = COLUMN_NAME;
        this._constraintName = CONSTRAINT_NAME;
        this._referencedTableName = REFERENCED_TABLE_NAME;
        this._referencedColumnName = REFERENCED_COLUMN_NAME;
    }

    get tableName() {
        return this._tableName;
    }

    get columnName() {
        return this._columnName;
    }

    get table() {
        return this._table;
    }

    set table(table: Table) {
        this._table = table;
    }

    get column() {
        return this._column;
    }

    set column(column: Column) {
        this._column = column;
    }

    get constraintName() {
        return this._constraintName;
    }

    get referencedTableName() {
        return this._referencedTableName;
    }

    get referencedColumnName() {
        return this._referencedColumnName;
    }

    get referencedTable() {
        return this._referencedTable;
    }

    set referencedTable(table : Table) {
        this._referencedTable = table;
    }

    get referencedColumn() {
        return this._referencedColumn;
    }

    set referencedColumn(column: Column) {
        this._referencedColumn = column;
    }
}

export = ForeignKey;