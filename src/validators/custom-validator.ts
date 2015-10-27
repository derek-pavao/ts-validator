import { IValidatorObject, ICustomValidatorConfig  } from '../main';

export class CustomValidator implements IValidatorObject {
    public name: string = 'email';
    public defaultMessage: string = '{{propertyName}} is invalid';
    public config: ICustomValidatorConfig;
    public model: any;

    constructor(config: ICustomValidatorConfig) {
        this.config = config;
    }

    public validate(propertyValue: any) {
        return this.config.validator.apply(this.model, arguments);
    }

}
