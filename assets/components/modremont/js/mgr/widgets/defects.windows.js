modRemont.window.CreateDefect = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'modremont-defect-window-create';
    }
    Ext.applyIf(config, {
        title: _('modremont_defect_create'),
        width: 675,
        height: 675,
        autoHeight: false,
        url: modRemont.config.connector_url,
        action: 'mgr/defect/create',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    modRemont.window.CreateDefect.superclass.constructor.call(this, config);

    this.on('activate',function(w,e) {
        MODx.loadRTE(config.id + '-content');
    },this);
};
Ext.extend(modRemont.window.CreateDefect, MODx.Window, {

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
                    fieldLabel: _('modremont_defect_pagetitle'),
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
                    xtype: 'modremont-combo-problem',
                    fieldLabel: _('modremont_defect_problem'),
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
                columnWidth: 1,
                layout: 'form',
                defaults: {msgTarget: 'under'},
                border: false,
                items: [{
                    xtype: 'modx-combo-browser',
                    fieldLabel: _('modremont_defect_image'),
                    name: 'image',
                    id: config.id + '-image',
                    source: MODx.config.modremont_source_images || MODx.config.default_media_source,
                    anchor: '99%',
                    allowBlank: true,
                }],
            },

        ],
        },
         {
            xtype: 'textarea',
            fieldLabel: _('modremont_defect_description'),
            name: 'description',
            id: config.id + '-description',
            height: 150,
            anchor: '99%',
        },
         {
            xtype: 'textarea',
            fieldLabel: _('modremont_defect_content'),
            name: 'content',
            id: config.id + '-content',
            height: 150,
            anchor: '99%',
        },
        {
            xtype: 'xcheckbox',
            boxLabel: _('modremont_defect_active'),
            name: 'active',
            id: config.id + '-active',
            checked: true,
        }];
    },

    loadDropZones: function () {
    }

});
Ext.reg('modremont-defect-window-create', modRemont.window.CreateDefect);


modRemont.window.UpdateDefect = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'modremont-defect-window-update';
    }
    Ext.applyIf(config, {
        title: _('modremont_defect_update'),
        width: 675,
        height: 675,
        autoHeight: false,
        url: modRemont.config.connector_url,
        action: 'mgr/defect/update',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    modRemont.window.UpdateDefect.superclass.constructor.call(this, config);


    this.on('activate',function(w,e) {
        MODx.loadRTE(config.id + '-content');
        MODx.loadRTE(config.id + '-contentbottom');
    },this);
};
Ext.extend(modRemont.window.UpdateDefect, MODx.Window, {

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
                    fieldLabel: _('modremont_defect_pagetitle'),
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
                    xtype: 'modremont-combo-problem',
                    fieldLabel: _('modremont_defect_problem'),
                    anchor: '99%',
                    allowBlank: false,
                }],
            }]
        }, {
            layout: 'column',
            border: false,
            anchor: '99%',
            items: [{
                columnWidth: 1,
                layout: 'form',
                defaults: {msgTarget: 'under'},
                border: false,
                items: [{
                    xtype: 'modx-combo-browser',
                    fieldLabel: _('modremont_defect_image'),
                    name: 'image',
                    id: config.id + '-image',
                    source: MODx.config.modremont_source_images || MODx.config.default_media_source,
                    anchor: '99%',
                    allowBlank: true,
                }],
            },
           

        ],
        },
         {
            xtype: 'textarea',
            fieldLabel: _('modremont_defect_description'),
            name: 'description',
            id: config.id + '-description',
            height: 150,
            anchor: '99%',
        },
         {
            xtype: 'textarea',
            fieldLabel: _('modremont_defect_content'),
            name: 'content',
            id: config.id + '-content',
            height: 150,
            anchor: '99%',
        },
        {
            xtype: 'xcheckbox',
            boxLabel: _('modremont_defect_active'),
            name: 'active',
            id: config.id + '-active',
            checked: true,
        }];
    },
    loadDropZones: function () {
    }

});
Ext.reg('modremont-defect-window-update', modRemont.window.UpdateDefect);
modRemont.window.duplicateDefect = function (config) {
    config = config || {};
    Ext.applyIf(config, {
        title: _('modermont_duplicate'),
        width: 600,
        url: modRemont.config.connector_url,
        action: 'mgr/defect/duplicate',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    modRemont.window.duplicateDefect.superclass.constructor.call(this, config);
};
Ext.extend(modRemont.window.duplicateDefect, MODx.Window, {
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
            boxLabel: _('modermont_active'),
            xtype: 'xcheckbox',
            anchor: '99%',
            name: 'active',
        }];
    },
});
Ext.reg('modermont-window-copy-defect', modRemont.window.duplicateDefect);