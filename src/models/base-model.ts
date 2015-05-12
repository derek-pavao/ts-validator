import { _ } from 'lodash';

export class BaseModel {

    public _validators: Object;
    public _errorMessages: Object;

    public validate() {
        var errorMap = {};
        for (let propertyName in this) {
            if (this._validators.hasOwnProperty(propertyName)) {
                let errors = this._validateTheValidators(propertyName);
                if (errors !== null) {
                    errorMap[propertyName] = errors;
                }
            }
        }

        if (_.isEmpty(errorMap)) {
            return null;
        } else {
            return errorMap;
        }

    }

    private _validateTheValidators(propertyName: string) {
        var value = this[propertyName];
        var errors = []
        for (let validator of this._validators[propertyName]) {

            if (!validator.validate(value)) {
                errors.push(this._errorMessages[propertyName][validator.name]);
            }
        }

        if (_.isEmpty(errors)) {
            return null;
        } else {
            return errors;
        }

    }
}