import { IValidateFn } from './i-validate-fn';
import { IConfig } from './i-config';
export interface IValidatorObject {
    name: string;
    config?: IConfig;
    validate: IValidateFn;

}