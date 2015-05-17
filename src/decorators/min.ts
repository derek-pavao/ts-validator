import { BaseModel } from '../main';
import { IMinConfig } from '../main';
import { MinValidator } from '../main';
import { validatorFactory } from '../main';

/**
 * identifies the property it decorates as having a minimum value of config.min.
 * will treat '7' as 7 for validation purposes
 *
 * @param config configuration with min and message properties
 * @returns {function(any, string): undefined}
 */
export let min = function (config: IMinConfig) {

    return validatorFactory('min', config.message, new MinValidator(config));
};