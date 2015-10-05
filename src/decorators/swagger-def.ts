import { isEqual, forEach, includes, keys } from 'lodash';
import {
    validatorFactory,
    NotEmptyValidator,
    IntegerValidator,
    MinValidator,
    MinLengthValidator,
    MaxValidator,
    MaxLengthValidator,
    AllowedValuesValidator,
    PatternValidator
} from '../main';

export let swaggerDef = function(swaggerDef) {
    return function (target: any) {

        if (!isEqual(keys(swaggerDef.properties).sort(), target.prototype._properties.sort())) {
            console.error('Swagger definition', swaggerDef);
            console.error('Model Properties', target.prototype._properties);
            throw new Error(target.name + ' Properties did not match properties in the Swagger definition');
        }

        forEach(target.prototype._properties, function (propertyName: string) {
            let propDef = swaggerDef.properties[propertyName];
            if (typeof propDef === 'undefined') {
                return;
            }

            if (includes(swaggerDef.required, propertyName)) {
                validatorFactory(new NotEmptyValidator())(target.prototype, propertyName);
            }

            if (propDef.type === 'integer' && !alreadyHasValidator(target, propertyName, IntegerValidator)) {
                validatorFactory(new IntegerValidator())(target.prototype, propertyName);
            }

            if (typeof propDef.minLength !== 'undefined' && !alreadyHasValidator(target, propertyName, MinLengthValidator)) {
                validatorFactory(new MinLengthValidator({minLength: propDef.minLength}))(target.prototype, propertyName);
            }

            if (typeof propDef.maxLength !== 'undefined' && !alreadyHasValidator(target, propertyName, MaxLengthValidator)) {
                validatorFactory(new MaxLengthValidator({maxLength: propDef.maxLength}))(target.prototype, propertyName);
            }

            if (typeof propDef.enum !== 'undefined' && !alreadyHasValidator(target, propertyName, AllowedValuesValidator)) {
                validatorFactory(new AllowedValuesValidator({values: propDef.enum}))(target.prototype, propertyName);
            }

            if (typeof propDef.pattern !== 'undefined' && !alreadyHasValidator(target, propertyName, PatternValidator)) {
                    validatorFactory(new PatternValidator({pattern: propDef.pattern}))(target.prototype, propertyName);
            }

            if (typeof propDef.minimum !== 'undefined' && !alreadyHasValidator(target, propertyName, MinValidator)) {
                validatorFactory(new MinValidator({min: propDef.minimum}))(target.prototype, propertyName);
            }

            if (typeof propDef.maximum !== 'undefined' && !alreadyHasValidator(target, propertyName, MaxValidator)) {
                validatorFactory(new MaxValidator({max: propDef.maximum}))(target.prototype, propertyName);
            }

        });
    };

};


/**
 * TODO(derek): Consider re-implementing storing validators in a map instead of an array to make this
 * loop go away
 */
function alreadyHasValidator(target, propertyName: string, validator): boolean {
    for (var i = 0; i < target.prototype._validators[propertyName].length; i++) {
        let existingValidator = target.prototype._validators[propertyName][i];
        if (existingValidator instanceof validator) {
            return true;
        }
    }

    return false;
}
