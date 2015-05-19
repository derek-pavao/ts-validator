import { IPatternConfig, validatorFactory, PatternValidator } from '../main';
export let pattern = function (config: IPatternConfig) {
    return validatorFactory(new PatternValidator(config));
};