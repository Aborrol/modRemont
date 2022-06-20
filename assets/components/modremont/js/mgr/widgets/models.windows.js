modRemont.window.CreateModel = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'modremont-model-window-create';
    }
    Ext.applyIf(config, {
        title: _('modremont_model_create'),
        width: 675,
        height: 675,
        autoHeight: false,
        url: modRemont.config.connector_url,
        action: 'mgr/model/create',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    modRemont.window.CreateModel.superclass.constructor.call(this, config);

    this.on('activate',function(w,e) {
        MODx.loadRTE(config.id + '-content');
        MODx.loadRTE(config.id + '-contentbottom');
    },this);
};
Ext.extend(modRemont.window.CreateModel, MODx.Window, {

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
                    fieldLabel: _('modremont_model_model_name'),
                    name: 'model_name',
                    id: config.id + '-model_name',
                    anchor: '99%',
                    allowBlank: false,
                }],
            }, {
                columnWidth: .50,
                layout: 'form',
                defaults: {msgTarget: 'under'},
                border: false,
                items: [{
                    xtype: 'modremont-combo-category',
                    fieldLabel: _('modremont_model_category'),
                    anchor: '99%',
                    allowBlank: false,
                }],
            }]
        }, 
        {
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
                    fieldLabel: _('modremont_model_pagetitle'),
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
                items: [        {
                    xtype: 'textfield',
                    fieldLabel: _('modremont_model_longtitle'),
                    name: 'longtitle',
                    id: config.id + '-longtitle',
                    anchor: '99%',
                    allowBlank: true,
                },],
            }]
        },

        {
            layout: 'column',
            border: false,
            anchor: '99%',
            items: [{ 
                
                columnWidth: .30,
                layout: 'form',
                defaults: {msgTarget: 'under'},
                border: false,
                items: [{
                    xtype: 'textfield',
                    fieldLabel: _('modremont_model_season'),
                    name: 'season',
                    id: config.id + '-season',
                    anchor: '99%',
                    allowBlank: false,
                }],
            },{
                columnWidth: .20,
                layout: 'form',
                defaults: {msgTarget: 'under'},
                border: false,
                items: [{
                    xtype: 'textfield',
                    fieldLabel: _('modremont_model_year'),
                    name: 'year',
                    id: config.id + '-year',
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
                    fieldLabel: _('modremont_model_article'),
                    name: 'article',
                    id: config.id + '-article',
                    anchor: '99%',
                    allowBlank: false,
                }],
            }]
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
                    xtype: 'modx-combo-browser',
                    fieldLabel: _('modremont_model_image'),
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
                    fieldLabel: _('modremont_model_uri'),
                    name: 'uri',
                    id: config.id + '-uri',
                    anchor: '99%',
                    allowBlank: false,
                }],
            },

        ],
        },
        {
            xtype: 'xcheckbox',
            boxLabel: _('modremont_model_getservicesfromcategory'),
            name: 'isgetservices',
            id: config.id + '-isgetservices',
            checked: true,
        },
         {
            xtype: 'textarea',
            fieldLabel: _('modremont_model_description'),
            name: 'description',
            id: config.id + '-description',
            height: 150,
            anchor: '99%',
        },
         {
            xtype: 'textarea',
            fieldLabel: _('modremont_model_content'),
            name: 'content',
            id: config.id + '-content',
            height: 150,
            anchor: '99%',
        },
         {
            xtype: 'textarea',
            fieldLabel: _('modremont_model_contentbottom'),
            name: 'contentbottom',
            id: config.id + '-contentbottom',
            height: 150,
            anchor: '99%',
        }, {
            xtype: 'xcheckbox',
            boxLabel: _('modremont_model_active'),
            name: 'active',
            id: config.id + '-active',
            checked: true,
        }];
    },

    loadDropZones: function () {
    }

});
Ext.reg('modremont-model-window-create', modRemont.window.CreateModel);


modRemont.window.UpdateModel = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'modremont-model-window-update';
    }
    Ext.applyIf(config, {
        title: _('modremont_model_update'),
        width: 975,
        height: 675,
        autoHeight: false,
        url: modRemont.config.connector_url,
        action: 'mgr/model/update',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    modRemont.window.UpdateModel.superclass.constructor.call(this, config);


    this.on('activate',function(w,e) {
        MODx.loadRTE(config.id + '-content');
        MODx.loadRTE(config.id + '-contentbottom');
    },this);
};
Ext.extend(modRemont.window.UpdateModel, MODx.Window, {
    
    getFields: function (config) {
        return [{
            xtype: 'hidden',
            name: 'id',
            id: config.id + '-id',
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
                    xtype: 'textfield',
                    fieldLabel: _('modremont_model_pagetitle'),
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
                    xtype: 'modremont-combo-category',
                    fieldLabel: _('modremont_model_category'),
                    anchor: '99%',
                    allowBlank: false,
                }],
            }]
        }, 
        {
            xtype: 'textfield',
            fieldLabel: _('modremont_model_longtitle'),
            name: 'longtitle',
            id: config.id + '-longtitle',
            anchor: '99%',
            allowBlank: true,
        },
        {
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
                    fieldLabel: _('modremont_model_year'),
                    name: 'year',
                    id: config.id + '-year',
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
                    fieldLabel: _('modremont_model_article'),
                    name: 'article',
                    id: config.id + '-article',
                    anchor: '99%',
                    allowBlank: false,
                }],
            }]
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
                    xtype: 'modx-combo-browser',
                    fieldLabel: _('modremont_model_image'),
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
                    fieldLabel: _('modremont_model_uri'),
                    name: 'uri',
                    id: config.id + '-uri',
                    anchor: '99%',
                    allowBlank: false,
                }],
            },

        ],
        },
        {
            xtype: 'modremont-grid-model-service',
            title: _('modremont_services'),
            model_id: config.record.object.id,
            category_id: config.record.object.category_id
        },
         {
            xtype: 'textarea',
            fieldLabel: _('modremont_model_description'),
            name: 'description',
            id: config.id + '-description',
            height: 150,
            anchor: '99%',
        },
         {
            xtype: 'textarea',
            fieldLabel: _('modremont_model_content'),
            name: 'content',
            id: config.id + '-content',
            height: 150,
            anchor: '99%',
        },
         {
            xtype: 'textarea',
            fieldLabel: _('modremont_model_contentbottom'),
            name: 'contentbottom',
            id: config.id + '-contentbottom',
            height: 150,
            anchor: '99%',

        }, {
            xtype: 'xcheckbox',
            boxLabel: _('modremont_model_active'),
            name: 'active',
            id: config.id + '-active',
            checked: true,
        }];
    },
    loadDropZones: function () {
    }

});
Ext.reg('modremont-model-window-update', modRemont.window.UpdateModel);
modRemont.window.duplicateModel = function (config) {
    config = config || {};
    Ext.applyIf(config, {
        title: _('modermont_duplicate'),
        width: 600,
        url: modRemont.config.connector_url,
        action: 'mgr/model/duplicate',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    modRemont.window.duplicateModel.superclass.constructor.call(this, config);
};
Ext.extend(modRemont.window.duplicateModel, MODx.Window, {
    getFields: function (config) {
        return [{
            xtype: 'hidden',
            anchor: '99%',
            name: 'id',
        },
         {
            fieldLabel: _('modermont_field_name'),
            xtype: 'textfield',
            anchor: '99%',
            name: 'pagetitle',
            allowBlank: false,
            maxLength: 255,
        }, 
         {
            fieldLabel: _('modermont_field_uri'),
            xtype: 'textfield',
            anchor: '99%',
            name: 'uri',
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
Ext.reg('modermont-window-copy-model', modRemont.window.duplicateModel);

