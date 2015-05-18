import { IValidatorObject, IMaxConfig } from '../main';
import { _ } from 'lodash';


export class MaxValidator implements IValidatorObject {
    public name = 'max';
    public defaultMessage: string;
    public config: IMaxConfig;

    constructor(config: IMaxConfig) {
        this.config = config;
        this.defaultMessage = `{{propertyName}} must be less than ${this.config.max}`;
    }

    validate(modelValue): boolean {
        if (typeof modelValue !== 'number' && _.isEmpty(modelValue)) {
            return true;
        }

        var num = Number(modelValue);

        if (_.isNaN(num) || !_.isNumber(num)) {
            console.log('num', num);
            //throw new Error('the max validator requires that the model value can be parsed into a number');
            return false;
        } else {
            return num <= this.config.max;
        }
    }
}