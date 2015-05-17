/**
 * Created by dpavao on 4/28/15.
 */


export { BaseModel } from './models/base-model';

export { IValidatorObject } from './interfaces/i-validator-object';
export { IMinConfig } from './interfaces/i-min-config';
export { IMaxConfig } from './interfaces/i-max-config.ts';

export { NotEmptyValidator } from './validators/not-empty-validator';
export { MinValidator } from './validators/min-validator';
export { MaxValidator } from './validators/max-validator';

export { validatorFactory } from './validator-factory';
export { notEmpty } from './decorators/not-empty';
export { modelProp } from './decorators/model-prop';
export { min } from './decorators/min';
export { max } from './decorators/max';


