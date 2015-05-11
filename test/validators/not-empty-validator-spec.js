
import { NotEmptyValidator } from '../../.tmp/main';


describe('NotEmptyValidator', function () {

    var notEmptyValidator;

    beforeEach(function () {
        notEmptyValidator = new NotEmptyValidator();

    });

    it ('should implement the IValidatorObject interface', function () {
        expect(notEmptyValidator).to.have.all.keys('name');

        expect(notEmptyValidator.validator).to.be.defined;
    });

    it ('should treat empty strings as invalid', function () {
        expect(notEmptyValidator.validate('')).to.be.false;
    });

    it ('should ignore spaces in strings', function () {
        expect(notEmptyValidator.validate('  ')).to.be.false;
    });

    it ('should treat an empty object as invalid', function () {
        expect(notEmptyValidator.validate({})).to.be.false;
    });

    it ('should treat an empty array as invalid', function () {
        expect(notEmptyValidator.validate([])).to.be.false;
    })
});