import { MinLengthValidator } from '../../.tmp/validators/min-length-validator';

describe('MinLengthValidator', function () {
    var minLengthValidator;

    beforeEach(function () {
        var config = {
            message: 'must be longer than x',
            minLength: 3
        };
        minLengthValidator = new MinLengthValidator(config);
    });

    it ('should treat strings with a length greater than config.minLength as valid', function () {
        expect(minLengthValidator.validate('foobar')).to.be.true;
    });

    it ('should treat strings with a length equal to config.minLength as valid', function () {
        expect(minLengthValidator.validate('foo')).to.be.true;
    });

    it ('should treat strings with a length less than config.minLength as invalid', function () {
        expect(minLengthValidator.validate('12')).to.be.false;
    });
});
