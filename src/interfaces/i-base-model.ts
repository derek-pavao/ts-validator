export interface IBaseModel {

    _validators: Object;
    _errorMessages: Object;
    _properties: Array<string>;

    validate(): Object;
    validate(propName: string): Object;
}