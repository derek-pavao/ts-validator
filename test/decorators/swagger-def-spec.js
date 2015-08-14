import { TestSwaggerModel } from '../../.tmp/test-mocks/test-swagger-model';

describe ('swaggerDef decorator', function () {
    var testSwaggerModel;

    beforeEach(function () {
        testSwaggerModel = new TestSwaggerModel();
    });


    it ('should error on missing required fields', function () {

        var errors = testSwaggerModel.getErrors();

        expect(errors.firstName.indexOf('First Name can not be empty')).to.not.equal(-1);
        expect(errors.lastName.indexOf('Last Name can not be empty')).to.not.equal(-1);
        expect(errors.middleName).to.be.undefined;
    });


    it ('should error on invalid minLength properties', function () {
        testSwaggerModel.username = 'foo';

        var errors = testSwaggerModel.getErrors();

        expect(errors.username.indexOf('Username length must be at least 5')).to.not.equal(-1);
    });

    it ('should not error on valid minLength properties', function () {
        testSwaggerModel.username = 'derekp';

        var errors = testSwaggerModel.getErrors();

        expect(errors.username).to.be.undefined;
    });

    it ('should error on invalid maxLength properties', function () {
        testSwaggerModel.username = 'foobarbazderp';
        testSwaggerModel.lastName = 'sfdjklsfjklsdf';

        var errors = testSwaggerModel.getErrors();

        expect(errors.lastName.indexOf('Last Name length must be at most 5')).to.not.equal(-1);
        expect(errors.username.indexOf('Username length must be at most 10')).to.not.equal(-1);
    });

    it ('should not error on valid maxLength properties', function () {
        testSwaggerModel.username = 'Derek';
        testSwaggerModel.lastName = 'Pavao';

        var errors = testSwaggerModel.getErrors();

        expect(errors.username).to.be.undefined;
        expect(errors.lastName).to.be.undefined;
    });

    it ('should error on invalid enum properties', function () {
        testSwaggerModel.type = 'FOO';

        var errors = testSwaggerModel.getErrors();

        expect(errors.type.indexOf('Type must be one of the following values, [PERSONAL, WORK]')).to.not.equal(-1);
    });

    it ('should not error on valid enum properties', function () {
        testSwaggerModel.type = 'PERSONAL';

        var errors = testSwaggerModel.getErrors();

        expect(errors.type).to.be.undefined;
    });

    it ('should error on invalid minimum values', function () {
        testSwaggerModel.age = 5;

        var errors = testSwaggerModel.getErrors();

        expect(errors.age.indexOf('Age must be at least 10')).to.not.equal(-1);
    });

    it ('should not error on valid minimum values', function () {
        testSwaggerModel.age = 10;

        var errors = testSwaggerModel.getErrors();

        expect(errors.age).to.be.undefined;
    });

    it ('should error on invalid maximum values', function () {
        testSwaggerModel.age = 21;

        var errors = testSwaggerModel.getErrors();

        expect(errors.age.indexOf('Age must be at most 20')).to.not.equal(-1);
    });

    it ('should not error on valid maximum values', function () {
        testSwaggerModel.age = 20;

        var errors = testSwaggerModel.getErrors();

        expect(errors.age).to.be.undefined;
    });

});
