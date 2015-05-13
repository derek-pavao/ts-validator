import { IValidatorObject } from '../main';
import { IMinConfig } from '../main';
import { _ } from 'lodash';

export class MinValidator  implements IValidatorObject {

    public name = 'min';
    public config: IMinConfig;

    constructor(config: IMinConfig) {
        this.config = config;
    }

    public validate(modelValue): boolean {
        if (typeof modelValue !== 'number' && _.isEmpty(modelValue)) {
            return true;
        }

        var num = Number(modelValue);
        if (_.isNaN(num) || !_.isNumber(num)) {
            throw new Error('the min validator requires that the model value can be parsed into a number');
        } else {
            return num >= this.config.min;
        }
    }

}