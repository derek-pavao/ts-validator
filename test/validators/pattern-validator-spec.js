import { PatternValidator } from '../../.tmp/validators/pattern-validator';

describe ('PatternValidator', function () {
    var patternValidator;

    beforeEach(function () {
        var config = {
            pattern: /^[0-9]{3}\-[0-9]{3}\-[0-9]{4}$/
        };

        patternValidator = new PatternValidator(config);
    });


    it ('should identify 900-649-2568 as a valid pattern', function () {
        expect(patternValidator.validate('900-649-2568')).to.be.true;
    });

    it ('should identify (900)-649-2568 as an invalid pattern', function () {
        expect(patternValidator.validate('(900)-649-2568')).to.be.false;
    });


});