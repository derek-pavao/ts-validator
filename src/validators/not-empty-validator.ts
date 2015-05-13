import { IValidatorObject } from '../main';
import  { _ } from 'lodash';

class NotEmptyValidator implements IValidatorObject {

    public name = 'notEmpty';

    public validate(modelValue): boolean {
        if (typeof modelValue === 'string') {
            return !_.isEmpty(modelValue.trim());
        } else {
            return !_.isEmpty(modelValue);
        }
    }
}

export { NotEmptyValidator };