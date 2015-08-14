import { BaseModel, modelProp, swaggerDef } from '../main';

export class TestBase extends BaseModel {
    @modelProp
    public id: number;
}

@swaggerDef({
    properties: {
        id: {
            type: 'integer'
        },
        firstName: {
            type: 'string',
            minLength: 1,
            maxLength: 5
        },
        middleName: {
            type: 'string',
            minLength: 1,
            maxLength: 5
        },
        lastName: {
            type: 'string',
            minLength: 1,
            maxLength: 5
        },
        username: {
            type: 'string',
            minLength: 5,
            maxLength: 10
        },
        type: {
            type: 'string',
            enum: [
                'PERSONAL',
                'WORK'
            ]
        },
        age: {
            type: 'integer',
            minimum: 10,
            maximum: 20
        }
    },
    required: ['firstName', 'lastName']
})

export class TestSwaggerModel extends TestBase {

    @modelProp
    public firstName: string;

    @modelProp
    public middleName: string;

    @modelProp
    public lastName: string;

    @modelProp
    public type: string;

    @modelProp
    public username: string;

    @modelProp
    public age: number;

}
