modRemont.window.CreateCategory = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'modremont-category-window-create';
    }
    Ext.applyIf(config, {
        title: _('modremont_category_create'),
        width: 850,
        height: 800,
        aliaswasempty: true,
        autoHeight: false,
        url: modRemont.config.connector_url,
        action: 'mgr/category/create',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    modRemont.window.CreateCategory.superclass.constructor.call(this, config);
    this.on('activate',function(w,e) {
        MODx.loadRTE(config.id + '-content');
        MODx.loadRTE(config.id + '-contentbottom');
    },this);
};
Ext.extend(modRemont.window.CreateCategory, MODx.Window, {
    translitAlias: function(string) {
        if (!this.config.translitloading) {
            this.config.translitloading = true;
            MODx.Ajax.request({
                url: MODx.config.connector_url
                ,params: {
                    action: 'resource/translit'
                    ,string: string
                }
                ,listeners: {
                    'success': {fn:function(r) {
                        var alias = Ext.getCmp('modx-categories-create-alias');
                        if (!Ext.isEmpty(r.object.transliteration)) {
                            alias.setValue(r.object.transliteration);
                            this.config.translitloading = false;
                        }
                    },scope:this}
                }
            });
        }
    }

    ,generateAliasRealTime: function(title) {
        // check some system settings before doing real time alias transliteration
        if (parseInt(MODx.config.friendly_alias_realtime) && parseInt(MODx.config.automatic_alias)) {
            // handles the realtime-alias transliteration
            if (this.config.aliaswasempty && title !== '') {
                this.translitAlias(title);
            }
        }
    },
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
                    fieldLabel: _('modremont_category_pagetitle'),
                    name: 'pagetitle',
                    id: config.id + '-pagetitle',
                    anchor: '99%',
                    allowBlank: false,
                    listeners: {
                        'keyup': {fn: function(f) {
                            var title = Ext.util.Format.stripTags(f.getValue());
                            this.generateAliasRealTime(title);
                        }, scope: this}
                        // also do realtime transliteration of alias on blur of pagetitle field
                        // as sometimes (when typing very fast) the last letter(s) are not catched
                        ,'blur': {fn: function(f,e) {
                            var title = Ext.util.Format.stripTags(f.getValue());
        
                            this.generateAliasRealTime(title);
                        }, scope: this}
                    }
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
                    id: 'modx-categories-create-alias',
                    anchor: '99%',
                    allowBlank: false,
                    listeners: {
                        'change': {fn: function(f,e) {
                            this.config.aliaswasempty = false;
                            // when the alias is manually cleared, enable real time alias
                            if (Ext.isEmpty(f.getValue())) {
                                this.config.aliaswasempty = true;
                            }
                        }, scope: this}
                    }
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
Ext.reg('modremont-category-window-create', modRemont.window.CreateCategory);


modRemont.window.UpdateCategory = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'modremont-category-window-update';
    }
    Ext.applyIf(config, {
        title: _('modremont_category_update'),
        width: 850,
        height: 800,
        autoHeight: false,
        aliaswasempty: true,
        url: modRemont.config.connector_url,
        action: 'mgr/category/update',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    modRemont.window.UpdateCategory.superclass.constructor.call(this, config);
    this.on('activate',function(w,e) {
        MODx.loadRTE(config.id + '-content');
        MODx.loadRTE(config.id + '-contentbottom');
    },this);
};
Ext.extend(modRemont.window.UpdateCategory, MODx.Window, {
    translitAlias: function(string) {
        if (!this.config.translitloading) {
            this.config.translitloading = true;
            MODx.Ajax.request({
                url: MODx.config.connector_url
                ,params: {
                    action: 'resource/translit'
                    ,string: string
                }
                ,listeners: {
                    'success': {fn:function(r) {
                        var alias = Ext.getCmp('modx-categories-update-alias');
                        if (!Ext.isEmpty(r.object.transliteration)) {
                            alias.setValue(r.object.transliteration);
                            this.config.translitloading = false;
                        }
                    },scope:this}
                }
            });
        }
    }

    ,generateAliasRealTime: function(title) {
        // check some system settings before doing real time alias transliteration
        if (parseInt(MODx.config.friendly_alias_realtime) && parseInt(MODx.config.automatic_alias)) {
            // handles the realtime-alias transliteration
            if (this.config.aliaswasempty && title !== '') {
                this.translitAlias(title);
            }
        }
    },
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
                    fieldLabel: _('modremont_category_pagetitle'),
                    name: 'pagetitle',
                    id: config.id + '-pagetitle',
                    anchor: '99%',
                    allowBlank: false
                    ,listeners: {
                        'keyup': {fn: function(f) {
                            var title = Ext.util.Format.stripTags(f.getValue());
                            this.generateAliasRealTime(title);
                        }, scope: this}
                        // also do realtime transliteration of alias on blur of pagetitle field
                        // as sometimes (when typing very fast) the last letter(s) are not catched
                        ,'blur': {fn: function(f,e) {
                            var title = Ext.util.Format.stripTags(f.getValue());
        
                            this.generateAliasRealTime(title);
                        }, scope: this}
                    }
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
                    id: 'modx-categories-update-alias',
                    anchor: '99%',
                    allowBlank: false,
                    listeners: {
                        'change': {fn: function(f,e) {
                            this.config.aliaswasempty = false;
                            // when the alias is manually cleared, enable real time alias
                            if (Ext.isEmpty(f.getValue())) {
                                this.config.aliaswasempty = true;
                            }
                        }, scope: this}
                    }
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
Ext.reg('modremont-category-window-update', modRemont.window.UpdateCategory);
modRemont.window.duplicateCategory = function (config) {
    config = config || {};
    Ext.applyIf(config, {
        title: _('modermont_duplicate'),
        width: 600,
        url: modRemont.config.connector_url,
        action: 'mgr/category/duplicate',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    modRemont.window.duplicateCategory.superclass.constructor.call(this, config);
};
Ext.extend(modRemont.window.duplicateCategory, MODx.Window, {
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
Ext.reg('modermont-window-copy-category', modRemont.window.duplicateCategory);