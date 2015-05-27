import { IConfig } from '../main';

export interface IEmailConfig extends IConfig {
    pattern?: RegExp;
    flags?: string;
}
