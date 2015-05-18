import { BaseModel } from '../main';
import { NotEmptyValidator } from '../main';
import { validatorFactory } from '../main';

/**
 * identifies the property it decorates as not allowed to be empty, essentially required.
 * "empty" is defined as undefined, null, {}, [], '', ' ';
 *
 * @param errorMessage the message to display if the validation fails
 * @returns {function(Object, string): undefined}
 */
export let notEmpty = function (errorMessage?) {

    return validatorFactory(new NotEmptyValidator({message: errorMessage}));
};

