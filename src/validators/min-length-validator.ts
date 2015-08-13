/// <reference path="./../../typings/tsd.d.ts" />
import { IValidatorObject, IMinLengthConfig } from '../main';
import { isEmpty, isNaN, isNumber } from 'lodash';


export class MinLengthValidator implements IValidatorObject {
    public name = 'minLength';
    public defaultMessage: string;
    public config: IMinLengthConfig;

    constructor(config: IMinLengthConfig) {
        this.config = config;
        this.defaultMessage = `{{propertyName}} length must be at least ${this.config.minLength}`;
    }

    public validate(modelValue: string): boolean {
        if (isEmpty(modelValue)) {
            return true;
        }

        return modelValue.length >= this.config.minLength;
    }
}
