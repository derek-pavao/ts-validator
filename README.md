#TypeScript Validator
[![Build Status](https://travis-ci.org/NextStepLiving/ts-validator.svg?branch=master)](https://travis-ci.org/NextStepLiving/ts-validator)


A set of annotations to provide model validation. Akin to Hibernate Validator

TypeScript validator is a library to support defining model constrants, i.e. validation, with decorators. Please note decorators are only available in TypeScript 1.5 which is currently in beta. The implementation of this library may change based on any changes made in TypeScript 1.5 before its stable release.

## How to use it
Include ts-validator in your project. All examples in this readme will assume ts-validator is located in the path "<web-root>/libs/ts-validator". I'm currently not sure the best way to handle thrid party TypeScript code. As of now I have personally been using git submodules. If anyone has a better way please let me know.

## Basic example

Defining a model property as not empty.
```typescript
import { BaseModel } from './libs/ts-validator/ts-validator';

export class Person extends BaseModel {

    @modelProp
    @notEmpty('First name can not be empty')
    public firstName: string;

}
```

 - Each of your models must extend BaseModel provided by ts-validator. BaseModel provides a public method called getErrors() which will allow you to validate your model
 - Every property of your model must have the @modelProp decorator. This is a product of JavaScript objects being dynamic.
 - the Person.firstName property also has a @notEmpty decorator with an error message string passed to it
   - This decorator will validate that the property is "not empty" which translates to not null, not undefined, not an empty object, not an empty array, not an empty string, and not a string that contains only spaces.

Validating an instance of person
```typescript
import { Person } from './path/to/person-model';

var person = new Person();

person.getErrors();
```

When calling person.getErrors() above, you will get an object of errors as a return value. The object structure is, keys will be the name of the property, and the value is an array of error messages for the validators that failed.

Example output from the above person.validate() call
```typescript
{
    firstName: ['First name can not be empty']
}
```
   
## Available Decorators

### @modelProp
@modelProp takes no parameters and is required on every property that you wish to have validated. If this is not present TypeScript Validator would not be able to validate properties that are undefined. This would make a validator like @notEmpty unreliable

### @notEmpty
@notEmpty takes one parameter, a string, which is an error message for this property if the validator fails.

Example:
```typescript
import { BaseModel } from './libs/ts-validator/ts-validator';

export class Person extends BaseModel {

    @modelProp
    @notEmpty('First name can not be empty')
    public firstName: string;

}
```

### @min
@min takes one parameter, a configuration object with keys for 'min' and 'message'.

Example:
```typescript
import { BaseModel } from './libs/ts-validator/ts-validator';

export class Person extends BaseModel {

    @modelProp
    @min({min: 10, message: 'Age must be greater than 10'})
    public age: number;

}
```

### @max
@max takes one parameter, a configuration object with keys for 'max' and 'message'.

Example:
```typescript
import { BaseModel } from './libs/ts-validator/ts-validator';

export class Person extends BaseModel {

    @modelProp
    @max({max: 105, message: 'Age must not be more than 105'})
    public age: number;

}
```

## Defining your own decorators / validators
For general information on decorators check out this issue on the Microsoft/TypeScript repo https://github.com/Microsoft/TypeScript/issues/2249, or this repo by @wycats https://github.com/wycats/javascript-decorators

In ts-validator a validator is made up of two files. One to define the decorator and one to implement the validation logic.

To define a decorator make use of the validatorFactory() function provided by ts-validator. For our example lets define a validator to not allow the word 'derp' in our input (@noDerpAllowed);

```typescript
// no-derp-allowed.ts

import { IConfig, validatorFactory } from './libs/ts-validator';
import { NoDerpAllowedValidator } from './no-derp-allowed-validator';


export let noDerpAllowed = function (config: IConfig) {
    return validatorFactory(new NoDerpAllowedValidator(config));
};
```
In the example above we are importing the IConfig interface, and the validatorFactory function from ts-validator. The IConfig interface is a base interface defining what config object you pass to your decorator when using it. i.e. ``` @noDerpAllowed({message: 'no derp here plzzz'}) ``` Currently IConfig only enforces that you implement message. The validatorFactory funciton is a convenience function that will register the decorator with ts-validator. It take one parameter, a class that implements the IValidatorObject interface provided by ts-validator. In the example above its the NoDerpAllowedValidator class. We will look at that class next, before we do take note that the config object that is a parameter to the decorator is passed to the constructor of the validator class

```typescript
// no-derp-allowed-validator.ts
import { IValidatorObject, IConfig } from '../libs/ng-ts-validator/ng-ts-validator';

export class NoDerpAllowedValidator implements IValidatorObject {

    public name:string = 'noDerpAllowed';
    public config:IConfig;
    public defaultMessage = '{{propertyName}} can not contain any derp';



    constructor(config:IConfig) {
        this.config = config;
     }


    public validate(propertyValue:any):boolean {
        return propertyValue.indexOf('derp') === -1;
    }
}
```
In the file above we are defining a validator class. IValidatorObject defines three properties, name, config, and defaultMessage, and one method validate that returns a boolean. True if the value passes validation false if it does not.

The name property is to be set to a string equal to the name of the decorator defined in the previous step. The config object is the same object that was passed to the decorator in the last file. The defaultMessage property is an error message to use if one is not given when the decorator is used. It has one available template tag, {{propertyName}} which will be a human readable version of the property that was annotated with this decorator. (currently we only support camelCase property names, 'myAwesomeProperty' will 'become My Awesome Property').

Finally the validate method takes the propertyValue as a parameter. From this method you are to return true if the propertyValue passes your validation or false if it does not.

The decorators / validators in this repo are created in this manner. To see examples of decorator definitions check out ./src/decorators and for examples of their corresponding validator classes check out ./src/validators. There is also an example in this repo https://github.com/NextStepLiving/Angular1.4-TypeScript1.5-Starter/tree/ts-validator. This repo contains an example todo app that defines a ``` @noSpecialChars() ``` decorator. the files of interest can be found in ./app/decorators/no-special-chars.ts and ./app/decorators/no-special-chars-validator.ts

More to come soon...
