import Column = require('./column.model');
import Indexable = require('./indexable.model');

type ConstraintType = "NOT NULL" | "UNIQUE" | "PRIMARY KEY" | "FOREIGN KEY" | "CHECK" | "DEFAULT";

@Indexable.CollectionName("constraints")
class Constraint extends Indexable {
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
    private _constraintName : string;
    private _tableName : string;
    private _constraintType : ConstraintType;
    private _columns : Column[];
    private _columnNames: string[];

    constructor({CONSTRAINT_NAME, TABLE_NAME, CONSTRAINT_TYPE }: {[prop : string] : string; CONSTRAINT_TYPE: ConstraintType}, index: number) {
        super(index);
        this._constraintName = CONSTRAINT_NAME;
        this._tableName = TABLE_NAME;
        this._constraintType = CONSTRAINT_TYPE;
        this._columns = [];
        this._columnNames = [];
    }

    @Indexable.ToJSON()
    get constraintName() {
        return this._constraintName;
    }

    @Indexable.ToJSON()
    get constraintType() {
        return this._constraintType;
    }

    @Indexable.ToJSON()
    get tableName() {
        return this._tableName;
    }

    @Indexable.ToJSON()
    get columnNames() {
        return this._columnNames;
    }

    set columns(cols) {
        this._columns = cols;
    }

    @Indexable.ToJSON()
    get columns() {
        return this._columns;
    }

    @Indexable.ToJSON()
    get areAllColumnsAutoIncrement() {
        return this._columns.every(col => col.isAutoIncrement);
    }

    @Indexable.ToJSON()
    get containsPrimaryKeyColumn() {
        return !!this.columns.find(col => col.isPrimaryKey);
    }

    @Indexable.ToJSON()
    get nonAutoIncrementColumns() {
        return this._columns.filter(col => !col.isAutoIncrement);
    }

    @Indexable.ToJSON()
    get isUniquenessType() {
        return this.isUniqueType || this.isPrimaryKeyType;
    }

    @Indexable.ToJSON()
    get isUniqueType() {
        return this._constraintType === 'UNIQUE';
    }

    @Indexable.ToJSON()
    get isPrimaryKeyType() {
        return this._constraintType === 'PRIMARY KEY';
    }

    @Indexable.ToJSON()
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