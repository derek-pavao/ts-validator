import { BaseModel } from '../main';
import { IValidatorObject } from '../main';
import { NotEmptyValidator } from '../main';

export let notEmpty = function (errorMessage: String) {

    return function (target: Object, name: string) {


        if (target instanceof BaseModel) {

            target._validators = target._validators || {};
            target._errorMessages = target._errorMessages || {};
            target._validators[name] = target._validators[name] || [];
            target._errorMessages[name] = target._errorMessages[name] || {};


            target._errorMessages[name].notNull = errorMessage;

            target._validators[name].push(new NotEmptyValidator());

        }
    }
}

