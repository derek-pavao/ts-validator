import { AllowedValuesValidator } from '../../.tmp/validators/allowed-values-validator';

describe('AllowedValuesValidator', function () {
    var allowedValuesValidator;

    beforeEach(function () {
        var config = {
            values: ['one', 'two']
        };

        allowedValuesValidator = new AllowedValuesValidator(config);
    });

    it ('should treat values that are in config.allowedValues as valid', function () {
        expect(allowedValuesValidator.validate('one')).to.be.true;
    });

    it ('should treat values that are not in config.allowedValues as invalid', function () {
        expect(allowedValuesValidator.validate('three')).to.be.false;
    });
});
