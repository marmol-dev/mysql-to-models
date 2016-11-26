import _ = require('lodash');
import Table = require('./table.model');
import ForeignKey = require('./foreign_key.model');
import Annotation = require("./annotation.model");
import {Serializable, Serialize} from "../helpers/serializable";
import {Deserialize, Deserializable} from "../helpers/deserializable";

@Serializable()
@Deserializable()
class Column {

    @Deserialize()
    private _tableName : string;
    @Deserialize()
    private _columnName : string;
    @Deserialize()
    private _ordinalPosition : string;
    @Deserialize()
    private _columnDefault : string;
    @Deserialize()
    private _isNullable : string;
    @Deserialize()
    private _dataType : string;
    @Deserialize()
    private _characterMaximumLength : string;
    @Deserialize()
    private _columnType : string;
    @Deserialize()
    private _columnKey : string;
    @Deserialize()
    private _extra : string;
    @Deserialize()
    private _columnComment : string;
    @Deserialize()
    private _table : Table;
    @Deserialize()
    private _foreignKey : ForeignKey;
    @Deserialize()
    private _phpDataType : string;
    @Deserialize()
    private _annotations : Annotation[];
    @Deserialize()
    private _index : number;

    constructor({TABLE_NAME, COLUMN_NAME, ORDINAL_POSITION, COLUMN_DEFAULT, IS_NULLABLE, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH, COLUMN_TYPE, COLUMN_KEY, EXTRA, COLUMN_COMMENT} : {[p:string] : string}, index: number){
        this._index = index;
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

    @Serialize()
    get tableName() {
        return this._tableName;
    }

    @Serialize()
    get table() {
        return this._table;
    }

    set table(table) {
        this._table = table;
    }

    @Serialize()
    get columnName() {
        return this._columnName;
    }

    @Serialize()
    get pascalName() {
        return _.upperFirst(this.camelName);
    }

    @Serialize()
    get camelName() {
        return _.camelCase(this.columnName);
    }

    @Serialize()
    get phpName() {
        return this.camelName;
    }

    @Serialize()
    get ordinalPosition() {
        return this._ordinalPosition;
    }

    @Serialize()
    get columnDefault() {
        return this._columnDefault;
    }

    @Serialize()
    get isNullable() {
        return this._isNullable !== 'NO';
    }

    @Serialize()
    get hasDefaultValue() {
        return this._columnDefault !== null;
    }

    @Serialize()
    get isRequired() {
        return !this.isNullable && !this.hasDefaultValue;
    }

    @Serialize()
    get isAutoIncrement() {
        return this._extra.lastIndexOf('auto_increment') > -1;
    }

    @Serialize()
    get dataType() {
        return this._dataType;
    }

    @Serialize()
    get characterMaximumLength()  {
        return this._characterMaximumLength;
    }

    @Serialize()
    get columnType() {
        return this._columnType;
    }

    @Serialize()
    get columnKey() {
        return this._columnKey;
    }

    @Serialize()
    get extra() {
        return this._extra;
    }

    @Serialize()
    get foreignkey() {
        return this._foreignKey;
    }

    set foreignKey(fk : ForeignKey) {
        this._foreignKey = fk;
    }

    @Serialize(true)
    get referencedColumn() {
        return this._foreignKey.referencedColumn;
    }

    @Serialize(true)
    get referencedTable() {
        return this._foreignKey.referencedTable;
    }

    @Serialize()
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

    @Serialize()
    get phpDataType() {
        if (!this._phpDataType) {
            return Column.getPhpDataType(this.dataType);
        }

        return this._phpDataType;
    }

    @Serialize()
    get isPrimaryKey() {
        return this.columnKey === 'PRI';
    }

    @Serialize()
    get isForeignKey() {
        return !!this.foreignkey;
    }

    @Serialize()
    get isEditable() {
        return !this.isAutoIncrement;
    }

    @Serialize()
    get isUniqueType() {
        return this.columnKey === 'UNI';
    }

    @Serialize()
    get isUnique() {
        return this.isUniqueType || this.isPrimaryKey;
    }

    @Serialize()
    get annotations() : Annotation[] {
        return this._annotations;
    }

    set annotations(value: Annotation[]) {
        this._annotations = value;
    }
}

export = Column;