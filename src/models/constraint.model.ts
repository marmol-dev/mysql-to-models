import Column = require('./column.model');
import {Serializable, Serialize, Construct, Id} from "../helpers/serializable";

type ConstraintType = "NOT NULL" | "UNIQUE" | "PRIMARY KEY" | "FOREIGN KEY" | "CHECK" | "DEFAULT";

@Serializable()
class Constraint {
    /**
     * Constraint type
     * 
     * NOT NULL	In MySQL NOT NULL constraint allows to specify that a column can not contain any NULL value. MySQL NOT NULL can be used to CREATE and ALTER a table.
     * UNIQUE	The UNIQUE constraint in MySQL does not allow to insert a duplicate value in a column. The UNIQUE constraint maintains the uniqueness of a column in a table. More than one UNIQUE column can be used in a table.
     * PRIMARY KEY	A PRIMARY KEY constraint for a table enforces the table to accept unique data for a specific column and this constraint creates a unique index for accessing the table faster.
     * FOREIGN KEY	A FOREIGN KEY in MySQL creates a link between two tables by one specific column of both tables. The specified column in one table must be a PRIMARY KEY and referred by the column of another table known as FOREIGN KEY.
     * CHECK	A CHECK constraint controls the values in the associated column. The CHECK constraint determines whether the value is valid or not from a logical expression.
     * DEFAULT	In a MySQL table, each column must contain a value ( including a NULL). While inserting data into a table, if no value is supplied to a column, then the column gets the value set as DEFAULT.
     * 
     * @private
     * @type {string}
     * @memberOf Constraint
     */
    @Construct()
    private _constraintName : string;
    @Construct()
    private _tableName : string;
    @Construct()
    private _constraintType : ConstraintType;
    @Construct()
    private _columns : Column[];
    @Construct()
    private _columnNames: string[];
    @Construct()
    @Id()
    private _index : number;

    constructor({CONSTRAINT_NAME, TABLE_NAME, CONSTRAINT_TYPE }: {[prop : string] : string; CONSTRAINT_TYPE: ConstraintType}, index: number) {
        this._index = index;
        this._constraintName = CONSTRAINT_NAME;
        this._tableName = TABLE_NAME;
        this._constraintType = CONSTRAINT_TYPE;
        this._columns = [];
        this._columnNames = [];
    }

    @Serialize()
    get constraintName() {
        return this._constraintName;
    }

    @Serialize()
    get constraintType() {
        return this._constraintType;
    }

    @Serialize()
    get tableName() {
        return this._tableName;
    }

    @Serialize()
    get columnNames() {
        return this._columnNames;
    }

    set columns(cols) {
        this._columns = cols;
    }

    @Serialize()
    get columns() {
        return this._columns;
    }

    @Serialize()
    get areAllColumnsAutoIncrement() {
        return this._columns.every(col => col.isAutoIncrement);
    }

    @Serialize()
    get containsPrimaryKeyColumn() {
        return !!this.columns.find(col => col.isPrimaryKey);
    }

    @Serialize()
    get nonAutoIncrementColumns() {
        return this._columns.filter(col => !col.isAutoIncrement);
    }

    @Serialize()
    get isUniquenessType() {
        return this.isUniqueType || this.isPrimaryKeyType;
    }

    @Serialize()
    get isUniqueType() {
        return this._constraintType === 'UNIQUE';
    }

    @Serialize()
    get isPrimaryKeyType() {
        return this._constraintType === 'PRIMARY KEY';
    }

    @Serialize()
    get table() {
        return this._columns[0].table;
    }

    addColumnName(columnName : string) {
        this._columnNames.push(columnName);
    }

    public involvesColumns(cols: Column[]) {
        return this.columns.length === cols.length 
            && cols.every(col => this._columns.lastIndexOf(col) > -1) 
            && this._columns.every(col => cols.lastIndexOf(col) > -1);
    }
    
}

export = Constraint;