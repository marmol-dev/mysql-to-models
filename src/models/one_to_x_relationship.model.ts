import Relationship = require('./relationship.model');
import ForeignKey = require('./foreign_key.model');
import Table = require('./table.model');
import Column = require('./column.model');
import {Serialize, Serializable} from "../helpers/serializable";
import {Deserialize, Deserializable} from "../helpers/deserializable";

@Deserializable()
@Serializable()
class OneToXRelationship extends Relationship {

    @Deserialize()
    private _name : string;
    @Deserialize()
    private _foreignKeys : ForeignKey[];

    constructor(name : string, index : number) {
        super(index);
        this._name = name;
        this._foreignKeys = [];
    }

    @Serialize()
    get foreignKeys() {
        return this._foreignKeys;
    }

    set foreignKeys(fks: ForeignKey[]) {
        this._foreignKeys = fks;
    }

    addForeignKey(fk : ForeignKey) {
        this._foreignKeys.push(fk);
    }

    @Serialize()
    get name() {
        return this._name;
    }

    involvesSameTables(rel : Relationship) : boolean {
        throw new Error('Not implemented');
    }

    getNameFromSide(tableSide : Table) : string {
        throw new Error('Not implemented');
    }

    getPluralNameFromSide(tableSide: Table) : string {
        throw new Error('Not implemented');
    }

    public getOtherSideColumn(column: Column){
        let otherSideColumn : Column;
        let i = 0;

        while(!otherSideColumn && i < this.foreignKeys.length) {

            if (this.foreignKeys[i].referencedColumn === column) {
                otherSideColumn = this.foreignKeys[i].column;
            } else if (this.foreignKeys[i].column) {
                otherSideColumn = this.foreignKeys[i].referencedColumn;
            }

            i++;
        }

        if (!otherSideColumn) {
            throw new Error(`Column "${column.columnName}" not found in foreign keys of relationship "${this.name}"`);
        }

        return otherSideColumn;
    }

    @Serialize()
    get foreignKeysContainPrimaryKey() {
        return !!this.foreignKeys.find(fk => fk.column.isPrimaryKey);
    }
}

export = OneToXRelationship;