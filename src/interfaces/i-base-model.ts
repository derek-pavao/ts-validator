export interface IBaseModel {

    _validators: Object;
    _errorMessages: Object;
    _properties: Array<string>;

    getErrors(): Object;
    getErrors(propName: string): Object;
}