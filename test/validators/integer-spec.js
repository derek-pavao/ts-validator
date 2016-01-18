import { IntegerValidator } from '../../.tmp/validators/integer-validator';

describe ('IntegerValidator', function () {

    var integerValidator;

    beforeEach(function () {
        integerValidator = new IntegerValidator();
    });

    it ('integer should be valid', function () {
        expect(integerValidator.validate(9)).to.be.true;
    });

    it ('float should be invalid', function () {
        expect(integerValidator.validate(10.5)).to.be.false;
    });
    it ('empty should be true/valid', function () {
        expect(integerValidator.validate('')).to.be.true;
    });

    it ('large number should be valid', function () {
        expect(integerValidator.validate(11000)).to.be.true;
    });

    it ('0 should be valid', function () {
        expect(integerValidator.validate(0)).to.be.true;
    });

});
