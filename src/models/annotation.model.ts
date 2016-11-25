import Indexable = require("./indexable.model");
import Table = require("./table.model");
import Column = require("./column.model");
import ForeignKey = require("./foreign_key.model");
const matchAnnotationsRegexp = /@([a-zA-Z][a-zA-Z0-9]*)(?:\(((?:(\w(?:\w|\d)*)=((?:true)|(?:false)|(?:\d+(?:\.\d+)?)|"[^"\\]*(?:\\.[^"\\]*)*")\s*,\s*)*(\w(?:\w|\d)*)=((?:true)|(?:false)|(?:\d+(?:\.\d+)?)|"[^"\\]*(?:\\.[^"\\]*)*"))\))?/g;
const matchAnnotationPartsRegexp = /@([a-zA-Z][a-zA-Z0-9]*)(?:\(((?:(\w(?:\w|\d)*)=((?:true)|(?:false)|(?:\d+(?:\.\d+)?)|"[^"\\]*(?:\\.[^"\\]*)*")\s*,\s*)*(\w(?:\w|\d)*)=((?:true)|(?:false)|(?:\d+(?:\.\d+)?)|"[^"\\]*(?:\\.[^"\\]*)*"))\))?/;
const matchAssignationsRegexp = /(\w(?:\w|\d)*)=((?:true)|(?:false)|(?:\d+(?:\.\d+)?)|"[^"\\]*(?:\\.[^"\\]*)*")/g;
const matchAssignationParts = /(\w(?:\w|\d)*)=((?:true)|(?:false)|(?:\d+(?:\.\d+)?)|"[^"\\]*(?:\\.[^"\\]*)*")/;

class Annotation extends Indexable {

    private static _instances : Annotation[] = [];
    private static get instances() {
        return this._instances;
    }

    static parseAnnotations(str : string, index : number) : Annotation[] {

        const annotations = str.match(matchAnnotationsRegexp) || [];

        return annotations.map(annotation => {
            try {
                const parts = annotation.match(matchAnnotationPartsRegexp);
                const annotationName = parts[1];
                let annotationValue  : any = null;

                if (parts[2]) {
                    annotationValue = {};
                    const assignations = parts[2].match(matchAssignationsRegexp);
                    assignations.forEach((assignation) => {
                        const assignationParts = assignation.match(matchAssignationParts);
                        annotationValue[assignationParts[1]] = JSON.parse(assignationParts[2]);
                    });
                }

                return new Annotation(annotationName, annotationValue, index++);
            } catch (e) {
                return null;
            }
        }).filter(a => a !== null);
    }

    private _table : Table;
    private _column: Column;
    private _foreignKey: ForeignKey;

    constructor(private _name: string, private _values : any[], index: number){
        super(index);
        Annotation.instances.push(this);
    }

    get hasValues() {
        return this._values !== null;
    }

    @Indexable.ToJSON()
    get table(): Table {
        return this._table;
    }

    @Indexable.ToJSON()
    get column(): Column {
        return this._column;
    }

    @Indexable.ToJSON()
    get foreignKey(): ForeignKey {
        return this._foreignKey;
    }

    @Indexable.ToJSON()
    get name(): string {
        return this._name;
    }

    @Indexable.ToJSON()
    get values(): any[] {
        return this._values;
    }


    set table(value: Table) {
        this._table = value;
    }

    set column(value: Column) {
        this._column = value;
    }

    set foreignKey(value: ForeignKey) {
        this._foreignKey = value;
    }
}

export = Annotation;
