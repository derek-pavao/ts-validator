import { IValidatorObject, IConfig } from '../main';
import * as _ from 'lodash';


class NotEmptyValidator implements IValidatorObject {

    public name = 'notEmpty';
    public defaultMessage: string;
    public config: IConfig;

    constructor(config: IConfig) {
        this.config = config;
        this.defaultMessage = '{{propertyName}} can not be empty';
    }

    public validate(modelValue): boolean {
        if (typeof modelValue === 'string') {
            return !_.isEmpty(modelValue.trim());
        } else {
            return !_.isEmpty(modelValue);
        }
    }
}

export { NotEmptyValidator };
