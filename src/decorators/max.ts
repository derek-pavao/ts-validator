import { validatorFactory, IMaxConfig, MaxValidator } from'../main';


export let max = function (config: IMaxConfig) {

    return validatorFactory('max', config.message, new MaxValidator(config));
};