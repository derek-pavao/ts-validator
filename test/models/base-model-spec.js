import { TestModel } from '../../.tmp/test-mocks/test-model';

describe ('BaseModel validate()', function () {

    var testModel;

    beforeEach(function () {
        testModel = new TestModel();
    });


    it ('should return a map with property names as keys and an array of error messages as values', function () {
        testModel.testProperty = null;

        var errorMap = testModel.validate();
        expect(errorMap.testProperty[0]).to.equal('Test property can not be empty');
    });

    it ('should return null if there were no errors', function () {
        testModel.testProperty = 'foo';
        var errorMap = testModel.validate();

        expect(errorMap).to.be.null;

    });


});

