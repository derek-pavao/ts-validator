import { validatorFactory, IMinLengthConfig, MinLengthValidator } from '../main';

export let minLength = function (config: IMinLengthConfig) {

    return validatorFactory(new MinLengthValidator(config));
};
