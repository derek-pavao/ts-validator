import * as _  from 'lodash';
import { IBaseModel } from '../interfaces/i-base-model';
import { modelProp } from '../main';
import { attachStaticValidators } from '../decorators/swagger-def';

export class BaseModel implements IBaseModel{

    public _validators: Object;
    public _errorMessages: Object;
    public _properties: Array<string>;
    public _ignoreProperties: Object;

    constructor(json?: Object) {
        if (!_.isEmpty(json)) {
            _.forIn(json, function (value, key) {
                if (this._properties.indexOf(key) !== -1) {
                    this[key] = value;
                }
            }.bind(this));
        }
    }

    public toJSON() {
        var obj = {};
        for (var i = 0; i < this._properties.length; i++) {
            let prop = this._properties[i];
            if (!this._ignoreProperties[prop]) {
                obj[prop] = this[prop];
            }
        }
        return obj;
    }

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

    public updateValidatorsOnDiscriminatorChange(discriminatorValue: any, swaggerDef, fullSwaggerDef) {
        var allOf = fullSwaggerDef.api.definitions[discriminatorValue].allOf;
        this._validators = {};

        var newSwaggerDef = _.merge.apply(this, [{}].concat(allOf));

        attachStaticValidators(this, newSwaggerDef);
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

        if (typeof this._validators[propertyName] !== 'undefined') {
            for (let i = 0; i < this._validators[propertyName].length; i++) {

                let validator = this._validators[propertyName][i];
                validator.model = this;

                if (!validator.validate(value)) {
                    errors.push(this._errorMessages[propertyName][validator.name]);
                }
            }
        }

        if (_.isEmpty(errors)) {
            return null;
        } else {
            return errors;
        }
    }


}
