import { MaxValidator } from '../../.tmp/validators/max-validator';

describe ('MaxValidator', function () {

    var maxValidator;

    beforeEach(function () {
        var config = {
            message: 'must be less than x',
            max: 10
        };

        maxValidator = new MaxValidator(config);
    });


    it ('should treat numbers below config.max as valid', function () {
        expect(maxValidator.validate(9)).to.be.true;
    });

    it ('should treat number equal to config.max as valid', function () {
        expect(maxValidator.validate(10)).to.be.true;
    });

    it ('should treat numbers greater than config.max as invalid', function () {
        expect(maxValidator.validate(11)).to.be.false;
    });

    it ('should convert a string to a number before doing comparison', function () {
        expect(maxValidator.validate('11')).to.be.false;
    });

    it ('should throw an error if it can not parse the modelValue', function () {
        expect(maxValidator.validate.bind(maxValidator, 'sdfljdfsklj')).to.throw('the max validator requires that the model value can be parsed into a number');
    });

});