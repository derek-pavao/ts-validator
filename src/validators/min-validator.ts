import { IValidatorObject } from '../main';
import { IMinConfig } from '../main';
import { _ } from 'lodash';

export class MinValidator  implements IValidatorObject {

    public name = 'min';
    public defaultMessage: string;
    public config: IMinConfig;

    constructor(config: IMinConfig) {
        this.config = config;
        this.defaultMessage = `{{propertyName}} must be greater than ${this.config.min}`;
    }

    public validate(modelValue): boolean {
        if (typeof modelValue !== 'number' && _.isEmpty(modelValue)) {
            return true;
        }

        var num = Number(modelValue);
        if (_.isNaN(num) || !_.isNumber(num)) {
            // throw new Error('the min validator requires that the model value can be parsed into a number');
            return false;
        } else {
            return num >= this.config.min;
        }
    }

}