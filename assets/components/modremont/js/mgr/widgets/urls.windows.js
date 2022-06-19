modRemont.window.CreateUrl = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'modremont-url-window-create';
    }
    Ext.applyIf(config, {
        title: _('modremont_urlcreate'),
        width: 850,
        height: 800,
        autoHeight: false,
        url: modRemont.config.connector_url,
        action: 'mgr/url/create',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    modRemont.window.CreateUrl.superclass.constructor.call(this, config);
    this.on('activate',function(w,e) {
        MODx.loadRTE(config.id + '-content');
        MODx.loadRTE(config.id + '-contentbottom');
    },this);
};
Ext.extend(modRemont.window.CreateUrl, MODx.Window, {

    getFields: function (config) {
        return [{
            layout: 'column',
            border: false,
            anchor: '99%',
            items: [{
                columnWidth: .50,
                layout: 'form',
                defaults: {msgTarget: 'under'},
                border: false,
                items: [{
                    xtype: 'textfield',
                    fieldLabel: _('modremont_caurl_pagetitle'),
                    name: 'pagetitle',
                    id: config.id + '-pagetitle',
                    anchor: '99%',
                    allowBlank: false,
                }],
            }, {
                columnWidth: .50,
                layout: 'form',
                defaults: {msgTarget: 'under'},
                border: false,
                items: [{
                    xtype: 'textfield',
                    fieldLabel: _('modremont_category_priceby'),
                    name: 'priceby',
                    id: config.id + '-priceby',
                    anchor: '99%',
                    allowBlank: false,
                }],
            }]
        }, 
        {
            xtype: 'textfield',
            fieldLabel: _('modremont_category_longtitle'),
            name: 'longtitle',
            id: config.id + '-longtitle',
            anchor: '99%',
            allowBlank: true,
        },{
            layout: 'column',
            border: false,
            anchor: '99%',
            items: [{
                columnWidth: .50,
                layout: 'form',
                defaults: {msgTarget: 'under'},
                border: false,
                items: [{
                    xtype: 'modx-combo-browser',
                    fieldLabel: _('modremont_category_image'),
                    name: 'image',
                    id: config.id + '-image',
                    source: MODx.config.modremont_source_images || MODx.config.default_media_source,
                    anchor: '99%',
                    allowBlank: true,
                }],
            },
            {
                columnWidth: .50,
                layout: 'form',
                defaults: {msgTarget: 'under'},
                border: false,
                items: [{
                    xtype: 'textfield',
                    fieldLabel: _('modremont_category_uri'),
                    name: 'uri',
                    id: config.id + '-uri',
                    anchor: '99%',
                    allowBlank: false,
                }],
            },
        ],
        },
         {
            xtype: 'textarea',
            fieldLabel: _('modremont_category_description'),
            name: 'description',
            id: config.id + '-description',
            height: 150,
            anchor: '99%',
        },
         {
            xtype: 'textarea',
            fieldLabel: _('modremont_category_content'),
            name: 'content',
            id: config.id + '-content',
            height: 150,
            anchor: '99%',
        },
         {
            xtype: 'textarea',
            fieldLabel: _('modremont_category_contentbottom'),
            name: 'contentbottom',
            id: config.id + '-contentbottom',
            height: 150,
            anchor: '99%',
        }, {
            xtype: 'xcheckbox',
            boxLabel: _('modremont_category_active'),
            name: 'active',
            id: config.id + '-active',
            checked: true,
        }];
    },

    loadDropZones: function () {
    }

});
Ext.reg('modremont-url-window-create', modRemont.window.CreateUrl);


modRemont.window.UpdateUrl = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'modremont-category-window-update';
    }
    Ext.applyIf(config, {
        title: _('modremont_category_update'),
        width: 850,
        height: 800,
        autoHeight: false,
        url: modRemont.config.connector_url,
        action: 'mgr/category/update',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    modRemont.window.UpdateUrl.superclass.constructor.call(this, config);
    this.on('activate',function(w,e) {
        MODx.loadRTE(config.id + '-content');
        MODx.loadRTE(config.id + '-contentbottom');
    },this);
};
Ext.extend(modRemont.window.UpdateUrl, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'hidden',
            name: 'id',
            id: config.id + '-id',
        }, {
            layout: 'column',
            border: false,
            anchor: '99%',
            items: [{
                columnWidth: .50,
                layout: 'form',
                defaults: {msgTarget: 'under'},
                border: false,
                items: [{
                    xtype: 'textfield',
                    fieldLabel: _('modremont_url_pagetitle'),
                    name: 'pagetitle',
                    id: config.id + '-pagetitle',
                    anchor: '99%',
                    allowBlank: false,
                }],
            }, {
                columnWidth: .50,
                layout: 'form',
                defaults: {msgTarget: 'under'},
                border: false,
                items: [{
                    xtype: 'textfield',
                    fieldLabel: _('modremont_url_priceby'),
                    name: 'priceby',
                    id: config.id + '-priceby',
                    anchor: '99%',
                    allowBlank: false,
                }],
            }]
        }, 
        {
            xtype: 'textfield',
            fieldLabel: _('modremont_url_longtitle'),
            name: 'longtitle',
            id: config.id + '-longtitle',
            anchor: '99%',
            allowBlank: true,
        },{
            layout: 'column',
            border: false,
            anchor: '99%',
            items: [{
                columnWidth: .50,
                layout: 'form',
                defaults: {msgTarget: 'under'},
                border: false,
                items: [{
                    xtype: 'modx-combo-browser',
                    fieldLabel: _('modremont_url_image'),
                    name: 'image',
                    id: config.id + '-image',
                    source: MODx.config.modremont_source_images || MODx.config.default_media_source,
                    anchor: '99%',
                    allowBlank: true,
                }],
            },
            {
                columnWidth: .50,
                layout: 'form',
                defaults: {msgTarget: 'under'},
                border: false,
                items: [{
                    xtype: 'textfield',
                    fieldLabel: _('modremont_url_uri'),
                    name: 'uri',
                    id: config.id + '-uri',
                    anchor: '99%',
                    allowBlank: false,
                }],
            },
        ],
        },
         {
            xtype: 'textarea',
            fieldLabel: _('modremont_url_description'),
            name: 'description',
            id: config.id + '-description',
            height: 150,
            anchor: '99%',
        },
         {
            xtype: 'textarea',
            fieldLabel: _('modremont_url_content'),
            name: 'content',
            id: config.id + '-content',
            height: 150,
            anchor: '99%',
        },
         {
            xtype: 'textarea',
            fieldLabel: _('modremont_url_contentbottom'),
            name: 'contentbottom',
            id: config.id + '-contentbottom',
            height: 150,
        }, {
            xtype: 'xcheckbox',
            boxLabel: _('modremont_url_active'),
            name: 'active',
            id: config.id + '-active',
            checked: true,
        }];
    },

    loadDropZones: function () {
    }

});
Ext.reg('modremont-url-window-update', modRemont.window.UpdateUrl);
modRemont.window.duplicateUrl = function (config) {
    config = config || {};
    Ext.applyIf(config, {
        title: _('modermont_duplicate'),
        width: 600,
        url: modRemont.config.connector_url,
        action: 'mgr/url/duplicate',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    modRemont.window.duplicateUrl.superclass.constructor.call(this, config);
};
Ext.extend(modRemont.window.duplicateUrl, MODx.Window, {
    getFields: function (config) {
        return [{
            xtype: 'hidden',
            anchor: '99%',
            name: 'id',
        }, {
            fieldLabel: _('modermont_field_name'),
            xtype: 'textfield',
            anchor: '99%',
            name: 'pagetitle',
            allowBlank: false,
            maxLength: 255,
        }, 
        {
            fieldLabel: _('modermont_field_url'),
            xtype: 'textfield',
            anchor: '99%',
            name: 'url',
            allowBlank: false,
            maxLength: 255,
        }, 
        {
            boxLabel: _('modermont_active'),
            xtype: 'xcheckbox',
            anchor: '99%',
            name: 'active',
        }];
    },
});
Ext.reg('modremont-window-copy-url', modRemont.window.duplicateUrl);