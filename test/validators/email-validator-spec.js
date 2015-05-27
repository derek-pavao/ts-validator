import { EmailValidator } from '../../.tmp/validators/email-validator';

describe ('Standard Pattern EmailValidator', function () {
    var emailValidator;

    beforeEach(function () {
        var config = {message: 'test message'};

        emailValidator = new EmailValidator(config);
    });

    it ('should validate derek@derekpavao.com as a valid email', function () {
        expect(emailValidator.validate('derek@erekpavao.com')).to.be.true;
    });

    it ('should not validate d@g.c as a valid email address', function () {
        expect(emailValidator.validate('d@g.c')).to.be.false;
    });

    it ('should not validate derp@@@@.com as a valid email address', function () {
        expect(emailValidator.validate('derp@@@@.com')).to.be.false;
    });
});
