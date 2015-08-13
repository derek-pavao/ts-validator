/// <reference path="./../../typings/tsd.d.ts" />
import { isEmpty } from 'lodash';
import { IValidatorObject, IMaxLengthConfig } from '../main';

export class MaxLengthValidator implements IValidatorObject {
    public name = 'maxLength';
    public defaultMessage: string;
    public config: IMaxLengthConfig;

    constructor(config: IMaxLengthConfig) {
        this.config = config;
        this.defaultMessage = `{{propertyName}} length must be at most ${this.config.maxLength}`;
    }

    public validate(modelValue: string) {
        if (isEmpty(modelValue)) {
            return true;
        }

        return modelValue.length <= this.config.maxLength;
    }

}
