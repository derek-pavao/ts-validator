import { _ } from 'lodash';
import { IBaseModel } from '../interfaces/i-base-model';

export class BaseModel implements IBaseModel{

    public _validators: Object;
    public _errorMessages: Object;
    public _properties: Array<string>;

    /**
     * check the validity of the model
     * @param propertyName if present will getErrors only this property, else will getErrors all properties
     * @returns {{} | null} returns an object of error messages or null
     */
    public getErrors(propertyName?: string) {
        var errorMap;
        if (propertyName) {
            errorMap = this._validateSingleProperty(propertyName);
        } else {
            errorMap = this._validateAllProperties();
        }

        if (_.isEmpty(errorMap)) {
            return null;
        } else {
            return errorMap;
        }
    }

    /**
     * this.getErrors delegates to this method if propertyName was present
     * @param propertyName the property in this model to getErrors
     * @returns {{}} an object of error messages, keys are property names, values are an array of strings/messages
     * @private
     */
    private _validateSingleProperty(propertyName: string): Object {
        var errorMap = {};
        if (this._validators.hasOwnProperty(propertyName)) {
            let errors = this._runValidatorsForProperty(propertyName);
            if (errors !== null) {
                errorMap[propertyName] = errors;
            }
        }
        return errorMap;
    }

    /**
     * this.getErrors delegates to this method if propertyName was NOT present
     * @returns {{}} an object of error messages, keys are property names, values are an array of strings/messages
     * @private
     */
    private _validateAllProperties(): Object {
        var errorMap = {};
        for (let propertyName of this._properties) {
            let errors = this._runValidatorsForProperty(propertyName);
            if (errors !== null) {
                errorMap[propertyName] = errors;
            }

        }
        return errorMap;
    }



    /**
     * runs all validators for propertyName stored in _validators
     * @param propertyName the property to run the validators for
     * @returns {[] | null}
     * @private
     */
    private _runValidatorsForProperty(propertyName: string) {
        var value = this[propertyName];
        var errors = [];
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