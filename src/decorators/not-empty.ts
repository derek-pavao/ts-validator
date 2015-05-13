import { BaseModel } from '../main';
import { NotEmptyValidator } from '../main';

/**
 * identifies the property it decorates as not allowed to be empty, essentially required.
 * "empty" is defined as undefined, null, {}, [], '', ' ';
 *
 * @param errorMessage the message to display if the validation fails
 * @returns {function(Object, string): undefined}
 */
export let notEmpty = function (errorMessage: String) {

    return function (target: Object, name: string) {


        if (target instanceof BaseModel) {

            target._validators = target._validators || {};
            target._errorMessages = target._errorMessages || {};
            target._validators[name] = target._validators[name] || [];
            target._errorMessages[name] = target._errorMessages[name] || {};


            target._errorMessages[name].notEmpty = errorMessage;

            target._validators[name].push(new NotEmptyValidator());

        }
    }
};

