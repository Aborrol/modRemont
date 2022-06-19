modRemont.page.Home = function (config) {
    config = config || {};
    Ext.applyIf(config, {
        components: [{
            xtype: 'modremont-panel-home',
            renderTo: 'modremont-panel-home-div'
        }]
    });
    modRemont.page.Home.superclass.constructor.call(this, config);
};
Ext.extend(modRemont.page.Home, MODx.Component);
Ext.reg('modremont-page-home', modRemont.page.Home);