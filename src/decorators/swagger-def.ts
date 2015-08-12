import { isEqual, forEach, includes } from 'lodash';
import { validatorFactory } from '../validator-factory';
import { NotEmptyValidator } from '../main';

export let swaggerDef = function(swaggerDef) {

    return function (target: any) {
        if (!isEqual(Object.keys(swaggerDef.properties), target.prototype._properties)) {
            console.error('Swagger definition', swaggerDef);
            throw new Error(target.name + ' Properties did not match properties in the Swagger definition');
        }

        forEach(target.prototype._properties, function (propertyName) {
            if (includes(swaggerDef.required, propertyName)) {
                console.log('add required', propertyName);

                validatorFactory(new NotEmptyValidator({message: ''}))(target.prototype, propertyName);
            }
        });
    };

};
