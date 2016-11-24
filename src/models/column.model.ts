import _ = require('lodash');
import Table = require('./table.model');
import ForeignKey = require('./foreign_key.model');
import Indexable = require('./indexable.model');

class Column extends Indexable {

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
    private _columnComment : string;

    private _table : Table;
    private _foreignKey : ForeignKey;
    private _phpDataType : string;

    constructor({TABLE_NAME, COLUMN_NAME, ORDINAL_POSITION, COLUMN_DEFAULT, IS_NULLABLE, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH, COLUMN_TYPE, COLUMN_KEY, EXTRA, COLUMN_COMMENT} : {[p:string] : string}, index: number){
        super(index);
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
        this._columnComment = COLUMN_COMMENT;
    }

    @Indexable.ToJSON()
    get tableName() {
        return this._tableName;
    }

    @Indexable.ToJSON()
    get table() {
        return this._table;
    }

    set table(table) {
        this._table = table;
    }

    @Indexable.ToJSON()
    get columnName() {
        return this._columnName;
    }

    @Indexable.ToJSON()
    get pascalName() {
        return _.upperFirst(this.camelName);
    }

    @Indexable.ToJSON()
    get camelName() {
        return _.camelCase(this.columnName);
    }

    @Indexable.ToJSON()
    get phpName() {
        return this.camelName;
    }

    @Indexable.ToJSON()
    get ordinalPosition() {
        return this._ordinalPosition;
    }

    @Indexable.ToJSON()
    get columnDefault() {
        return this._columnDefault;
    }

    @Indexable.ToJSON()
    get isNullable() {
        return this._isNullable !== 'NO';
    }

    @Indexable.ToJSON()
    get hasDefaultValue() {
        return this._columnDefault !== null;
    }

    @Indexable.ToJSON()
    get isRequired() {
        return !this.isNullable && !this.hasDefaultValue;
    }

    @Indexable.ToJSON()
    get isAutoIncrement() {
        return this._extra.lastIndexOf('auto_increment') > -1;
    }

    @Indexable.ToJSON()
    get dataType() {
        return this._dataType;
    }

    @Indexable.ToJSON()
    get characterMaximumLength()  {
        return this._characterMaximumLength;
    }

    @Indexable.ToJSON()
    get columnType() {
        return this._columnType;
    }

    @Indexable.ToJSON()
    get columnKey() {
        return this._columnKey;
    }

    @Indexable.ToJSON()
    get extra() {
        return this._extra;
    }

    @Indexable.ToJSON()
    get foreignkey() {
        return this._foreignKey;
    }

    set foreignKey(fk : ForeignKey) {
        this._foreignKey = fk;
    }

    @Indexable.ToJSON(true)
    get referencedColumn() {
        return this._foreignKey.referencedColumn;
    }

    @Indexable.ToJSON(true)
    get referencedTable() {
        return this._foreignKey.referencedTable;
    }

    @Indexable.ToJSON()
    get columnComment() {
        return this._columnComment;
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

    @Indexable.ToJSON()
    get phpDataType() {
        if (!this._phpDataType) {
            return Column.getPhpDataType(this.dataType);
        }

        return this._phpDataType;
    }

    @Indexable.ToJSON()
    get isPrimaryKey() {
        return this.columnKey === 'PRI';
    }

    @Indexable.ToJSON()
    get isForeignKey() {
        return !!this.foreignkey;
    }

    @Indexable.ToJSON()
    get isEditable() {
        return !this.isAutoIncrement;
    }

    @Indexable.ToJSON()
    get isUniqueType() {
        return this.columnKey === 'UNI';
    }

    @Indexable.ToJSON()
    get isUnique() {
        return this.isUniqueType || this.isPrimaryKey;
    }
}

export = Column;