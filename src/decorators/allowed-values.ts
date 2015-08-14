import { validatorFactory, IAllowedValuesConfig, AllowedValuesValidator } from '../main';

export let allowedValues = function (config: IAllowedValuesConfig) {
    return validatorFactory(new AllowedValuesValidator(config));
};
