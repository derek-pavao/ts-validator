export let modelProp = function (target, name: string) {
    target._properties = target._properties || [];
    target._properties.push(name)
};