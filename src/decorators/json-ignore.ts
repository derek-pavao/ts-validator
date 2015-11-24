export let jsonIgnore = function (target: any, name: string) {
    target._ignoreProperties = target._ignoreProperties || {};

    target._ignoreProperties[name] = true;
};
