import { MaxLengthValidator } from '../../.tmp/validators/max-length-validator';


describe('MaxLengthValidator', function () {
    var maxLengthValidator;

    beforeEach(function () {
        var config = {
            message: 'must be at most x',
            maxLength: 3
        };
        maxLengthValidator = new MaxLengthValidator(config);
    });


    it ('should treat strings with a length less than config.maxLength as valid', function () {
        expect(maxLengthValidator.validate('fo')).to.be.true;
    });

    it ('should treat strings with a length equal to config.maxLength as valid', function () {
        expect(maxLengthValidator.validate('foo')).to.be.true;
    });

    it ('should treat strings with a length greater than config.maxLength as invalid', function () {
        expect(maxLengthValidator.validate('foobar')).to.be.false;
    });


});
