import { validatorFactory, IMaxLengthConfig, MaxLengthValidator } from '../main';

export let maxLength = function (config: IMaxLengthConfig) {

    return validatorFactory(new MaxLengthValidator(config));
};
