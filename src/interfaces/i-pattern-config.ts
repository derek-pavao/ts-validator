import { IConfig } from '../main';


export interface IPatternConfig extends IConfig {
    pattern: RegExp;
}