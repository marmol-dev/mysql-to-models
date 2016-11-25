import Table = require("../models/table.model");
import Annotation = require("../models/annotation.model");
import IProjectConfig = require("../config/i-project-config");

const matchAnnotationsRegexp = /@([a-zA-Z][a-zA-Z0-9]*)(?:\(((?:(\w(?:\w|\d)*)=((?:true)|(?:false)|(?:\d+(?:\.\d+)?)|"[^"\\]*(?:\\.[^"\\]*)*")\s*,\s*)*(\w(?:\w|\d)*)=((?:true)|(?:false)|(?:\d+(?:\.\d+)?)|"[^"\\]*(?:\\.[^"\\]*)*"))\))?/g;
const matchAnnotationPartsRegexp = /@([a-zA-Z][a-zA-Z0-9]*)(?:\(((?:(\w(?:\w|\d)*)=((?:true)|(?:false)|(?:\d+(?:\.\d+)?)|"[^"\\]*(?:\\.[^"\\]*)*")\s*,\s*)*(\w(?:\w|\d)*)=((?:true)|(?:false)|(?:\d+(?:\.\d+)?)|"[^"\\]*(?:\\.[^"\\]*)*"))\))?/;
const matchAssignationsRegexp = /(\w(?:\w|\d)*)=((?:true)|(?:false)|(?:\d+(?:\.\d+)?)|"[^"\\]*(?:\\.[^"\\]*)*")/g;
const matchAssignationParts = /(\w(?:\w|\d)*)=((?:true)|(?:false)|(?:\d+(?:\.\d+)?)|"[^"\\]*(?:\\.[^"\\]*)*")/;

class AnnotationsService {
    constructor(private _tables : Table[], private _projectConfig: IProjectConfig){}

    private static parseAnnotations(str : string, index : number) : Annotation[] {

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

    public getAnnotations() : Annotation[] {
        let annotations : Annotation[] = [];

        this._tables.forEach(table => {
            table.annotations = AnnotationsService.parseAnnotations(table.tableComment, annotations.length);
            table.annotations.forEach(a => {
                a.table = table;
            });

            annotations = [...annotations, ...table.annotations];

            table.columns.forEach(column => {
                column.annotations = AnnotationsService.parseAnnotations(column.columnComment, annotations.length);
                column.annotations.forEach(a => {
                    a.table = table;
                    a.column = column;
                });
                annotations = [...annotations, ...column.annotations];
            });
        });


        if ('annotations' in this._projectConfig) {
            //database

            //tables
            if ('tables' in this._projectConfig.annotations){
                for(let tableName in this._projectConfig.annotations.tables){
                    const table = this._tables.find(t => t.tableName === tableName);
                    if (!table) {
                        throw new Error(`There is no table with name ${tableName} when trying to append table annotations`);
                    }

                    table.annotations = this._projectConfig.annotations.tables[tableName].map((a, index) => {
                        const annotation = new Annotation(a.name, 'values' in a ? a.values : null, annotations.length + index);
                        annotation.table = table;
                        return annotation;
                    });

                    annotations = [...annotations, ...table.annotations];
                }
            }

            //columns
            if ('columns' in this._projectConfig.annotations){
                for(let tableName in this._projectConfig.annotations.columns){
                    const table = this._tables.find(t => t.tableName === tableName);
                    if (!table) {
                        throw new Error(`There is not table with name ${tableName} when trying to append column annotations`);
                    }

                    for(let columnName in this._projectConfig.annotations.columns[tableName]) {

                        const column = table.columns.find(c => c.columnName === columnName);
                        if (!column) {
                            throw new Error(`There is not column with name ${columnName} in table ${tableName} when trying to append column annotations`);
                        }

                        column.annotations = this._projectConfig.annotations.columns[tableName][columnName].map((a, index) => {
                            const annotation = new Annotation(a.name, 'values' in a ? a.values : null, annotations.length + index);
                            annotation.table = table;
                            annotation.column = column;
                            return annotation;
                        });

                        annotations = [...annotations, ...column.annotations];

                    }
                }
            }

            //foreignKeys
        }

        return annotations;
    }
}

export = AnnotationsService;