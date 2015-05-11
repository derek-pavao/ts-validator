interface IValidateFn {
    (modelValue: any);
}

export interface IValidatorObject {
    name: string;
    validate: IValidateFn;
}