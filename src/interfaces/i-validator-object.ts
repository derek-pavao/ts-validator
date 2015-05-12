import { IValidateFn } from './i-validate-fn';
export interface IValidatorObject {
    name: string;
    validate: IValidateFn;
}