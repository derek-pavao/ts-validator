/**
 * identifies the property it decorates as a model property of the class, target.
 * Since javascript objects are dynamic we must know what properties are to be set
 * on a model so we can validate even the ones that are still undefined
 *
 * @param target
 * @param name
 */
export let modelProp = function (target, name: string) {
    target._properties = target._properties || [];
    target._properties.push(name);
};