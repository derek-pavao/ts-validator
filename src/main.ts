/**
 * Created by dpavao on 4/28/15.
 */


//import { ErrorReport } from './models/error-report';
import { BaseModel } from './models/base-model';
import { IValidatorObject } from './interfaces/i-validator-object';
import { NotEmptyValidator } from './validators/not-empty-validator';
import { notEmpty } from './decorators/not-empty';

export { IValidatorObject, NotEmptyValidator, notEmpty , BaseModel };
