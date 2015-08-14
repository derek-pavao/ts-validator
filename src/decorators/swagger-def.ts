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

            if (includes(swaggerDef.required, propertyName)) {
                validatorFactory(new NotEmptyValidator())(target.prototype, propertyName);
            }

            if (propDef.type === 'integer') {
                validatorFactory(new IntegerValidator())(target.prototype, propertyName);
            }

            if (typeof propDef.minLength !== 'undefined') {
                validatorFactory(new MinLengthValidator({minLength: propDef.minLength}))(target.prototype, propertyName);
            }

            if (typeof propDef.maxLength !== 'undefined') {
                validatorFactory(new MaxLengthValidator({maxLength: propDef.maxLength}))(target.prototype, propertyName);
            }

            if (typeof propDef.enum !== 'undefined') {
                validatorFactory(new AllowedValuesValidator({values: propDef.enum}))(target.prototype, propertyName);
            }

            if (typeof propDef.pattern !== 'undefined') {
                validatorFactory(new PatternValidator({pattern: propDef.pattern}))(target.prototype, propertyName);
            }

            if (typeof propDef.minimum !== 'undefined') {

                validatorFactory(new MinValidator({min: propDef.minimum}))(target.prototype, propertyName);
            }

            if (typeof propDef.maximum !== 'undefined') {
                validatorFactory(new MaxValidator({max: propDef.maximum}))(target.prototype, propertyName);
            }

        });
    };

};
