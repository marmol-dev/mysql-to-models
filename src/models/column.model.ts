import _ = require('lodash');
import Table = require('./table.model');
import ForeignKey = require('./foreign_key.model');

class Column {

    private _tableName : string;
    private _columnName : string;
    private _ordinalPosition : string;
    private _columnDefault : string;
    private _isNullable : string;
    private _dataType : string;
    private _characterMaximumLength : string;
    private _columnType : string;
    private _columnKey : string;
    private _extra : string;

    private _table : Table;
    private _foreignKey : ForeignKey;
    private _phpDataType : string;

    constructor({TABLE_NAME, COLUMN_NAME, ORDINAL_POSITION, COLUMN_DEFAULT, IS_NULLABLE, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH, COLUMN_TYPE, COLUMN_KEY, EXTRA} : {[p:string] : string}){
        this._tableName = TABLE_NAME;
        this._columnName = COLUMN_NAME;
        this._ordinalPosition = ORDINAL_POSITION;
        this._columnDefault = COLUMN_DEFAULT;
        this._isNullable = IS_NULLABLE;
        this._dataType = DATA_TYPE;
        this._characterMaximumLength = CHARACTER_MAXIMUM_LENGTH;
        this._columnType = COLUMN_TYPE;
        this._columnKey = COLUMN_KEY;
        this._extra = EXTRA;
    }

    get tableName() {
        return this._tableName;
    }

    get table() {
        return this._table;
    }

    set table(table) {
        this._table = table;
    }
    
    get columnName() {
        return this._columnName;
    }

    get pascalName() {
        return _.upperFirst(this.camelName);
    }

    get camelName() {
        return _.camelCase(this.columnName);
    }

    get phpName() {
        return this.camelName;
    }

    get ordinalPosition() {
        return this._ordinalPosition;
    }

    get columnDefault() {
        return this._columnDefault;
    }

    get isNullable() {
        return this._isNullable !== 'NO';
    }

    get hasDefaultValue() {
        return this._columnDefault !== null;
    }

    get isRequired() {
        return !this.isNullable && !this.hasDefaultValue;
    }

    get isAutoIncrement() {
        return this._extra.lastIndexOf('auto_increment') > -1;
    }

    get dataType() {
        return this._dataType;
    }

    get characterMaximumLength()  {
        return this._characterMaximumLength;
    }

    get columnType() {
        return this._columnType;
    }

    get columnKey() {
        return this._columnKey;
    }

    get extra() {
        return this._extra;
    }

    get foreignkey() {
        return this._foreignKey;
    }

    set foreignKey(fk : ForeignKey) {
        this._foreignKey = fk;
    }

    get referencedColumn() {
        return this._foreignKey.referencedColumn;
    }

    get referencedTable() {
        return this._foreignKey.referencedTable;
    }

    static getPhpDataType(type : string) {
        switch(type) {
            case 'int':
            case 'tinyint':
                return 'int';
            case 'float':
            case 'double':
            case 'decimal':
                return 'float';
            case 'bool':
                return 'boolean';
            case 'date':
            case 'datetime':
            case 'timestamp':
                return 'date';//¿?
            default:
                return 'string';   
        }
    }

    get phpDataType() {
        if (!this._phpDataType) {
            return Column.getPhpDataType(this.dataType);
        }

        return this._phpDataType;
    }

    get isPrimaryKey() {
        return this.columnKey === 'PRI';
    }

    get isForeignKey() {
        return !!this.foreignkey;
    }

    get isEditable() {
        return !this.isAutoIncrement;
    }

    get isUniqueType() {
        return this.columnKey === 'UNI';
    }

    get isUnique() {
        return this.isUniqueType || this.isPrimaryKey;
    }
}

export = Column;