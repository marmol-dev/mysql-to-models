"use strict";
class Entity {
    constructor(_table) {
        this._table = _table;
    }
    get hasTitleColumn() {
        return !!this.titleColumn;
    }
    get titleColumn() {
        return this._table.sortedColumns.find(col => {
            return !col.isPrimaryKey && !col.isForeignKey && col.phpDataType === 'string';
        });
    }
    get hasTitle() {
        return this.hasTitleColumn;
    }
    get title() {
        if (this.hasTitleColumn) {
            return this.titleColumn.pascalName;
        }
        return null;
    }
    get table() {
        return this._table;
    }
    get attributes() {
        return this.table.columns.filter(c => {
            return !c.isForeignKey || c.isPrimaryKey;
        });
    }
    get listAttributes() {
        return this.attributes.filter(attr => attr.dataType !== 'blob');
    }
}
module.exports = Entity;
//# sourceMappingURL=entity.model.js.map