import { isEqual, forEach, includes } from 'lodash';
import { validatorFactory } from '../validator-factory';
import { NotEmptyValidator, IntegerValidator } from '../main';

export let swaggerDef = function(swaggerDef) {
    return function (target: any) {
        if (!isEqual(Object.keys(swaggerDef.properties), target.prototype._properties)) {
            console.error('Swagger definition', swaggerDef);
            throw new Error(target.name + ' Properties did not match properties in the Swagger definition');
        }

        forEach(target.prototype._properties, function (propertyName) {

            if (includes(swaggerDef.required, propertyName)) {
                validatorFactory(new NotEmptyValidator())(target.prototype, propertyName);
            }

            if (swaggerDef.properties[propertyName].type === 'integer') {
                validatorFactory(new IntegerValidator())(target.prototype, propertyName);
            }

        });
    };

};
