import { IValidatorObject, IMaxConfig } from '../main';
import { _ } from 'lodash';


export class MaxValidator implements IValidatorObject {
    public name = 'max';
    public config: IMaxConfig;

    constructor(config: IMaxConfig) {
        this.config = config;
    }

    validate(modelValue): boolean {
        if (typeof modelValue !== 'number' && _.isEmpty(modelValue)) {
            return true;
        }

        var num = Number(modelValue);

        if (_.isNaN(num) || !_.isNumber(num)) {
            console.log('num', num);
            throw new Error('the max validator requires that the model value can be parsed into a number');
        } else {
            return num <= this.config.max;
        }
    }
}