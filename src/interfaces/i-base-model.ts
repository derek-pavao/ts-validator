export interface IBaseModel {

    _validators: Object;
    _errorMessages: Object;

    validate(): Object;
    validate(propName: string): Object;
}