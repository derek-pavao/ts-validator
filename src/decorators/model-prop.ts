/**
 * identifies the property it decorates as a model property of the class, target.
 * Since javascript objects are dynamic we must know what properties are to be set
 * on a model so we can validate even the ones that are still undefined
 *
 * @param target
 * @param name
 */
var decoratorFactory = function (config?) {
    return function (target, name: string) {
        target._properties = target._properties || [];

        if (typeof config !== 'undefined' && config.hasGetterSetter === true && name[0] === '_') {
            target._properties.push(name.slice(1));
        } else {
            target._properties.push(name);
        }
    };
};

export interface ImodelProp {
    (target: any, name: string)
    (config: any)
}

export let modelProp: ImodelProp = function (config?) {

    if (arguments.length > 1) {
        decoratorFactory().apply(this, arguments);
    } else {
        return decoratorFactory(config);
    }
};
