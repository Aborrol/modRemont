var modRemont = function (config) {
    config = config || {};
    modRemont.superclass.constructor.call(this, config);
};
Ext.extend(modRemont, Ext.Component, {
    page: {}, window: {}, grid: {}, tree: {}, panel: {}, combo: {}, config: {}, view: {}, utils: {}
});
Ext.reg('modremont', modRemont);

modRemont = new modRemont();