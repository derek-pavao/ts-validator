import { IConfig } from './i-config';

export interface ICustomValidatorConfig extends IConfig {

    validator: Function;
}
