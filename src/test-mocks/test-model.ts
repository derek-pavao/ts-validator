import { BaseModel, notEmpty } from '../main';


export class TestModel extends BaseModel {


    @notEmpty('Test property can not be empty')
    public testProperty: string;

    constructor() {
        super();
    }

}

