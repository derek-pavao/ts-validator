import { TestModel } from '../../.tmp/test-mocks/test-model';


describe ('notEmpty decorator', function () {
    var testModel;

    beforeEach(function () {
        testModel = new TestModel();
    });

    it ('should have an _errorMessages property', function () {
        expect(testModel._errorMessages).to.not.be.undefined;
    });

    it ('should have an _validators property', function () {
        expect(testModel._validators).to.not.be.undefined;
    });

    it ('should have an entry in _validators for testProperty', function () {
        expect(testModel._validators.testProperty).to.not.be.undefined
    });


});


