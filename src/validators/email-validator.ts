import { IValidatorObject, IEmailConfig } from '../main';

export class EmailValidator implements IValidatorObject {
    public name: string = 'email';
    public defaultMessage: string = '{{propertyName}} must be a valid email format';
    public config: IEmailConfig;

    private emailPattern: RegExp;
    private flags: string;

    constructor(config: IEmailConfig) {
        this.config = config;
        this.flags = this.config.flags || 'i';
        this.emailPattern = this.config.pattern || new RegExp('^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$', this.flags);
    }

    validate(propertyValue: any) {
        if (typeof propertyValue === 'string') {
            return propertyValue.match(this.emailPattern) !== null;
        } else {
            return true;
        }
    }

}
