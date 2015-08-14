import { isEmpty } from 'lodash';
import { IValidatorObject, IConfig } from '../main';


export class IntegerValidator implements IValidatorObject {
    public name: string = 'integer';
    public defaultMessage: string;
    public config: IConfig;

    constructor(config: IConfig = {message: ''}) {
        this.config = config;
        this.defaultMessage = '{{propertyName}} must be an number';
    }

    public validate(modelValue): boolean {
        if (typeof modelValue === 'number' || isEmpty(modelValue)) {
            return true;
        }

        return !isNaN(parseInt(modelValue, 10));

    }
}
