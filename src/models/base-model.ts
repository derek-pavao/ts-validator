import { ErrorReport } from '../models/error-report';

export class BaseModel {
    public _validators: Object;
    public _errorMessages: Object;

    public validate(): ErrorReport{
        return {};
    }
}