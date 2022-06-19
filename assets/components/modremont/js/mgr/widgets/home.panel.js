modRemont.panel.Home = function (config) {
    config = config || {};
    Ext.apply(config, {
        baseCls: 'modx-formpanel',
        layout: 'anchor',

        hideMode: 'offsets',
        items: [{
            html: '<h2>' + _('modremont') + '</h2>',
            cls: '',
            style: {margin: '15px 0'}
        }, {
            xtype: 'modx-tabs',
            defaults: {border: false, autoHeight: true},
            border: true,
            hideMode: 'offsets',
            items: [ {
                title: _('modremont_categories'),
                layout: 'anchor',
                items: [{
                    html: _('modremont_intro_msg'),
                    cls: 'panel-desc',
                }, {
                    xtype: 'modremont-grid-categories',
                    cls: 'main-wrapper',
                }]
            },
            {
                title: _('modremont_models'),
                layout: 'anchor',
                items: [{
                    html: _('modremont_intro_msg'),
                    cls: 'panel-desc',
                }, {
                    xtype: 'modremont-grid-models',
                    cls: 'main-wrapper',
                }]
            },{
                title: _('modremont_problems'),
                layout: 'anchor',
                items: [{
                    html: _('modremont_intro_msg'),
                    cls: 'panel-desc',
                }, {
                    xtype: 'modremont-grid-problems',
                    cls: 'main-wrapper',
                }]
            },{
                title: _('modremont_defects'),
                layout: 'anchor',
                items: [{
                    html: _('modremont_intro_msg'),
                    cls: 'panel-desc',
                }, {
                    xtype: 'modremont-grid-defects',
                    cls: 'main-wrapper',
                }]
            },
            {
                title: _('modremont_services'),
                layout: 'anchor',
                items: [{
                    html: _('modremont_intro_msg'),
                    cls: 'panel-desc',
                }, {
                    xtype: 'modremont-grid-services',
                    cls: 'main-wrapper',
                }]
            },
            {
                title: _('modremont_urls'),
                layout: 'anchor',
                items: [{
                    html: _('modremont_intro_msg'),
                    cls: 'panel-desc',
                }, {
                    xtype: 'modremont-grid-urls',
                    cls: 'main-wrapper',
                }]
            }
        ]
        }]
    });
    modRemont.panel.Home.superclass.constructor.call(this, config);
};
Ext.extend(modRemont.panel.Home, MODx.Panel);
Ext.reg('modremont-panel-home', modRemont.panel.Home);