import  * as _ from 'lodash';
import { IValidatorObject, IConfig } from '../main';


export class IntegerValidator implements IValidatorObject {
    public name: string = 'integer';
    public defaultMessage: string;
    public config: IConfig;

    constructor(config: IConfig = {message: ''}) {
        this.config = config;
        this.defaultMessage = '{{propertyName}} must be a number';
    }

    public validate(modelValue): boolean {

        return _.isInteger(Number(modelValue));
    }
}
