import { includes, isEmpty } from 'lodash';
import { IValidatorObject, IAllowedValuesConfig } from '../main';

export class AllowedValuesValidator implements IValidatorObject {
    public name = 'allowedValues';
    public defaultMessage: string;
    public config: IAllowedValuesConfig;

    constructor(config: IAllowedValuesConfig) {
        this.config = config;
        this.defaultMessage = `{{propertyName}} must be one of the following values, [${this.config.values.join(', ')}]`;

    }

    public validate(modelValue: string|number) {
        if (isEmpty(modelValue)) {
            return true;
        }

        for (let i = 0; i < this.config.values.length; i++) {
            let currValue = this.config.values[i];

            if (typeof currValue === 'number') {
                modelValue = Number(modelValue);
            }

            if (currValue === modelValue) {
                return true;
            }
        }


        return false;

        // return includes(this.config.values, modelValue);
    }
}
