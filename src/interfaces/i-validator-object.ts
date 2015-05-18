import { IValidateFn } from './i-validate-fn';
import { IConfig } from './i-config';
export interface IValidatorObject {

    /**
     * The name of the validator, should match the function name of the decorator
     * used for this validator
     */
    name: string;

    /**
     * A default error message if one is not provided by the decorator. You may use
     * the template string {{propertyName}} inside this string to output the name of the property
     * this validator was run for
     */
    defaultMessage: string;

    /**
     * A config object to pass to the validator, usually whatever object that gets passed to the decorator
     */
    config?: IConfig;

    /**
     * This is the function that actually performs the validation, it takes the modelValue as a parameter
     * and returns true if it has passed validation and false if it failed
     */
    validate: IValidateFn;

}