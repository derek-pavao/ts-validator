import { BaseModel, notEmpty, modelProp } from '../main';


export class TestModel extends BaseModel {

    @modelProp
    @notEmpty('Test property can not be empty')
    public testProperty: string;

    @modelProp
    @notEmpty()
    public secondTestProperty: string;

}

