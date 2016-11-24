import Table = require('./table.model');
import Indexable = require('./indexable.model');

class Entity extends Indexable {
    constructor(private _table : Table, index: number) {
        super(index)
    }

    @Indexable.ToJSON()
    get hasTitleColumn() {
        return !!this.titleColumn;
    }

    @Indexable.ToJSON()
    get titleColumn() {
        return this._table.sortedColumns.find(col => {
            return !col.isPrimaryKey && !col.isForeignKey && col.phpDataType === 'string';
        });
    }

    @Indexable.ToJSON()
    get hasTitle() {
        return this.hasTitleColumn;
    }

    @Indexable.ToJSON()
    get title() : string {
        if (this.hasTitleColumn) {
            return this.titleColumn.pascalName;
        }

        return null;
    }

    @Indexable.ToJSON()
    get table() {
        return this._table;
    }

    @Indexable.ToJSON()
    get attributes() {
        return this.table.columns.filter(c => {
            return !c.isForeignKey || c.isPrimaryKey;
        });
    }

    @Indexable.ToJSON()
    get listAttributes() {
        return this.attributes.filter(attr => attr.dataType !== 'blob');
    }
}

export = Entity;