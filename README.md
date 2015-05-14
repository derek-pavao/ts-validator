#TypeScript Validator

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

 - Each of your models must extend BaseModel provided by ts-validator. BaseModel provides a public method called validate() which will allow you to validate your model
 - Every property of your model must have the @modelProp decorator. This is a product of JavaScript objects being dynamic.
 - the Person.firstName property also has a @notEmpty decorator with an error message string passed to it
   - This decorator will validate that the property is "not empty" which translates to not null, not undefined, not an empty object, not an empty array, not an empty string, and not a string that contains only spaces.

Validating an instance of person
```typescript
import { Person } from './path/to/person-model';

var person = new Person();

person.validate();
```

When calling person.validate() above, you will get an object of errors as a return value. The object structure is, keys will be the name of the property, and the value is an array of error messages for the validators that failed.

Example output from the above person.validate() call
```typescript
{
    firstName: ['First name can not be empty']
}
```
   
