import { validatorFactory, ICustomValidatorConfig, CustomValidator } from '../main';

export let customValidator = function (config: ICustomValidatorConfig) {
    return validatorFactory(new CustomValidator(config));
};
