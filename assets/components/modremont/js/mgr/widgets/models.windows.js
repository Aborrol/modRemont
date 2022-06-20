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
        model_inches: '',
        model_title: '',
        model_year: '',
        model_season: '',
        model_article: '',
        namewasempty: true,
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
                        var alias = Ext.getCmp('modremont-model-window-create-uri');
                        if (!Ext.isEmpty(r.object.transliteration)) {
                            alias.setValue(r.object.transliteration);
                            this.config.translitloading = false;
                        }
                    },scope:this}
                }
            });
        }
    },
    generateAliasRealTime: function(title) {
        // check some system settings before doing real time alias transliteration
        if (parseInt(MODx.config.friendly_alias_realtime) && parseInt(MODx.config.automatic_alias)) {

            if (title !== '') {
                this.translitAlias(title);
            }
        }
    },
    generatePagetitleRealTime: function(title) {
            if (title !== '') {
                var pagetitle = Ext.getCmp('modremont-model-window-create-pagetitle');
                pagetitle.setValue(title);
            }

    },
    generateLongtitleRealTime: function(title) {

            if (title !== '') {
                var pagetitle = Ext.getCmp('modremont-model-window-create-longtitle');


                pagetitle.setValue(title);
            }

    },
    generateAliasRealTime: function(title) {
        // check some system settings before doing real time alias transliteration
        if (parseInt(MODx.config.friendly_alias_realtime) && parseInt(MODx.config.automatic_alias)) {

            if (this.config.aliaswasempty && title !== '') {
                this.translitAlias(title);
            }
        }
    },
    generateModelNameRealTime: function(title) {
            if (this.config.namewasempty && title !== '') {
               
                var modelname = Ext.getCmp('modremont-model-window-create-model_name');
                modelname.setValue(title);
                this.config.model_title = title;
                this.generateAliasRealTime(this.config.model_title+' '+this.config.model_season+' '+this.config.model_year+' '+this.config.model_inches+'inch '+this.config.model_article);
                this.generatePagetitleRealTime(this.config.model_title+' '+this.config.model_year+' '+this.config.model_inches+'\'');
                this.generateLongtitleRealTime(this.config.model_title+' ('+this.config.model_season+' '+this.config.model_year+') '+this.config.model_inches+'\' '+this.config.model_article);

            }
    },
    getFields: function (config) {
        return [{
            layout: 'column',
            border: false,
            anchor: '99%',
            items: [ {
                columnWidth: .50,
                layout: 'form',
                defaults: {msgTarget: 'under'},
                border: false,
                items: [{
                    xtype: 'modremont-combo-category',
                    fieldLabel: _('modremont_model_category'),
                    anchor: '99%',
                    allowBlank: false,
                    listeners: {
                        'select': {fn: function(f,e) {
                            this.generateModelNameRealTime(e.data.pagetitle);
                        }, scope: this}
                    }
                }],
            },{
                columnWidth: .50,
                layout: 'form',
                defaults: {msgTarget: 'under'},
                border: false,
                items: [{
                    xtype: 'textfield',
                    fieldLabel: _('modremont_model_model_name'),
                    name: 'model_name',
                    id: 'modremont-model-window-create-model_name',
                    anchor: '99%',
                    allowBlank: false,
                    listeners: {
                        'change': {fn: function(f,e) {
                            // when the alias is manually cleared, enable real time alias
                            this.config.namewasempty = false;
                            if (Ext.isEmpty(f.getValue())) {
                                this.config.namewasempty = true;
                            }
                            
                        }, scope: this},
                        'blur': {fn: function(f,e) {
                            var title = Ext.util.Format.stripTags(f.getValue());
                            this.config.model_title = title;
                            this.generateAliasRealTime(this.config.model_title+' '+this.config.model_season+' '+this.config.model_year+' '+this.config.model_inches+'inch '+this.config.model_article);
                            this.generatePagetitleRealTime(this.config.model_title+' '+this.config.model_year+' '+this.config.model_inches+'\'');
                            this.generateLongtitleRealTime(this.config.model_title+' ('+this.config.model_season+' '+this.config.model_year+') '+this.config.model_inches+'\' '+this.config.model_article);
                        }, scope: this}
                    }
                }],
            },]
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
                    id: 'modremont-model-window-create-pagetitle',
                    anchor: '99%',
                    allowBlank: false,
                    readOnly: true
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
                    id: 'modremont-model-window-create-longtitle',
                    anchor: '99%',
                    allowBlank: true,
                    readOnly: true
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
                    listeners: {
                        'blur': {fn: function(f,e) {
                            var title = Ext.util.Format.stripTags(f.getValue());
                            this.config.model_season = title;
                            this.generateAliasRealTime(this.config.model_title+' '+this.config.model_season+' '+this.config.model_year+' '+this.config.model_inches+'inch '+this.config.model_article);
                            // this.generatePagetitleRealTime(this.config.model_title+' '+this.config.model_year+' '+this.config.model_inches+'\'');
                            this.generateLongtitleRealTime(this.config.model_title+' ('+this.config.model_season+' '+this.config.model_year+') '+this.config.model_inches+'\' '+this.config.model_article);                        }, scope: this}
                    }
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
                    listeners: {
                        'blur': {fn: function(f,e) {
                            var title = Ext.util.Format.stripTags(f.getValue());
                            this.config.model_year = title;
                            this.generateAliasRealTime(this.config.model_title+' '+this.config.model_season+' '+this.config.model_year+' '+this.config.model_inches+'inch '+this.config.model_article);
                            this.generatePagetitleRealTime(this.config.model_title+' '+this.config.model_year+' '+this.config.model_inches+'\'');
                            this.generateLongtitleRealTime(this.config.model_title+' ('+this.config.model_season+' '+this.config.model_year+') '+this.config.model_inches+'\' '+this.config.model_article);                        }, scope: this}
                    }
                }],
            },{
                columnWidth: .20,
                layout: 'form',
                defaults: {msgTarget: 'under'},
                border: false,
                items: [{
                    xtype: 'textfield',
                    fieldLabel: _('modremont_model_inches'),
                    name: 'inches',
                    id: config.id + '-inches',
                    anchor: '99%',
                    allowBlank: false,
                    listeners: {
                        'blur': {fn: function(f,e) {
                            var title = Ext.util.Format.stripTags(f.getValue());
                            this.config.model_inches = title;
                            this.generateAliasRealTime(this.config.model_title+' '+this.config.model_season+' '+this.config.model_year+' '+this.config.model_inches+'inch '+this.config.model_article);
                            this.generatePagetitleRealTime(this.config.model_title+' '+this.config.model_year+' '+this.config.model_inches+'\'');
                            this.generateLongtitleRealTime(this.config.model_title+' ('+this.config.model_season+' '+this.config.model_year+') '+this.config.model_inches+'\' '+this.config.model_article);                        }, scope: this}
                    }
                }],
            },{
                columnWidth: .30,
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
                    listeners: {
                        'blur': {fn: function(f,e) {
                            var title = Ext.util.Format.stripTags(f.getValue());
                            this.config.model_article = title;
                            this.generateAliasRealTime(this.config.model_title+' '+this.config.model_season+' '+this.config.model_year+' '+this.config.model_inches+'inch '+this.config.model_article);
                            // this.generatePagetitleRealTime(this.config.model_title+' '+this.config.model_year+' '+this.config.model_inches+'\'');
                            this.generateLongtitleRealTime(this.config.model_title+' ('+this.config.model_season+' '+this.config.model_year+') '+this.config.model_inches+'\' '+this.config.model_article);                        }, scope: this}
                    }
                }],
            }]
        },
        {
            xtype: 'textfield',
            fieldLabel: _('modremont_model_article_dop'),
            name: 'article_dop',
            id: config.id + '-article_dop',
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
                    id: 'modremont-model-window-create-uri',
                    anchor: '99%',
                    allowBlank: false,
                    readOnly: true
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
        // model_category: config.record.object.category_id,
        model_inches: config.record.object.inches,
        model_title: config.record.object.model_name,
        model_year: config.record.object.year,
        model_season: config.record.object.season,
        model_article: config.record.object.article,
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
        // used for realtime-alias transliteration
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
                            var alias = Ext.getCmp('modremont-model-window-update-uri');
                            if (!Ext.isEmpty(r.object.transliteration)) {
                                alias.setValue(r.object.transliteration);
                                this.config.translitloading = false;
                            }
                        },scope:this}
                    }
                });
            }
        },
        generateAliasRealTime: function(title) {
            // check some system settings before doing real time alias transliteration
            if (parseInt(MODx.config.friendly_alias_realtime) && parseInt(MODx.config.automatic_alias)) {
    
                if (title !== '') {
                    this.translitAlias(title);
                }
            }
        },
        generatePagetitleRealTime: function(title) {
    
                if (title !== '') {
                    var pagetitle = Ext.getCmp('modremont-model-window-update-pagetitle');
    
    
                    pagetitle.setValue(title);
                }

        },
        generateLongtitleRealTime: function(title) {
    
                if (title !== '') {
                    var pagetitle = Ext.getCmp('modremont-model-window-update-longtitle');
    
    
                    pagetitle.setValue(title);
                }

        },
        generateModelNameRealTime: function(title) {
                if (this.config.namewasempty && title !== '') {
                   
                    var modelname = Ext.getCmp('modremont-model-window-update-model_name');
                    modelname.setValue(title);
                    this.config.model_title = title;
                    this.generateAliasRealTime(this.config.model_title+' '+this.config.model_season+' '+this.config.model_year+' '+this.config.model_inches+'inch '+this.config.model_article);
                    this.generatePagetitleRealTime(this.config.model_title+' '+this.config.model_year+' '+this.config.model_inches+'\'');
                    this.generateLongtitleRealTime(this.config.model_title+' ('+this.config.model_season+' '+this.config.model_year+') '+this.config.model_inches+'\' '+this.config.model_article);
    
                }
        },
    getFields: function (config) {
        console.log('this.config');
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
                    xtype: 'modremont-combo-category',
                    fieldLabel: _('modremont_model_category'),
                    anchor: '99%',
                    allowBlank: false,
                    listeners: {
                        'select': {fn: function(f,e) {
                            this.generateModelNameRealTime(e.data.pagetitle);
                        }, scope: this}
                    }
                }],
            },{
                columnWidth: .50,
                layout: 'form',
                defaults: {msgTarget: 'under'},
                border: false,
                items: [{
                    xtype: 'textfield',
                    fieldLabel: _('modremont_model_model_name'),
                    name: 'model_name',
                    id: 'modremont-model-window-update-model_name',
                    anchor: '99%',
                    allowBlank: false,
                    listeners: {
                        'change': {fn: function(f,e) {
                            // when the alias is manually cleared, enable real time alias
                            this.config.namewasempty = false;
                            if (Ext.isEmpty(f.getValue())) {
                                this.config.namewasempty = true;
                            }
                            
                        }, scope: this},
                        'blur': {fn: function(f,e) {
                            var title = Ext.util.Format.stripTags(f.getValue());
                            this.config.model_title = title;
                            this.generateAliasRealTime(this.config.model_title+' '+this.config.model_season+' '+this.config.model_year+' '+this.config.model_inches+'inch '+this.config.model_article);
                            this.generatePagetitleRealTime(this.config.model_title+' '+this.config.model_year+' '+this.config.model_inches+'\'');
                            this.generateLongtitleRealTime(this.config.model_title+' ('+this.config.model_season+' '+this.config.model_year+') '+this.config.model_inches+'\' '+this.config.model_article);
                        }, scope: this}
                    }
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
                    id: 'modremont-model-window-update-pagetitle',
                    anchor: '99%',
                    allowBlank: false,
                    readOnly: true

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
                    id: 'modremont-model-window-update-longtitle',
                    anchor: '99%',
                    allowBlank: true,
                    readOnly: true
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
                    listeners: {
                        'blur': {fn: function(f,e) {
                            var title = Ext.util.Format.stripTags(f.getValue());
                            this.config.model_season = title;
                            this.generateAliasRealTime(this.config.model_title+' '+this.config.model_season+' '+this.config.model_year+' '+this.config.model_inches+'inch '+this.config.model_article);
                            // this.generatePagetitleRealTime(this.config.model_title+' '+this.config.model_year+' '+this.config.model_inches+'\'');
                            this.generateLongtitleRealTime(this.config.model_title+' ('+this.config.model_season+' '+this.config.model_year+') '+this.config.model_inches+'\' '+this.config.model_article);                        }, scope: this}
                    }
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
                    listeners: {
                        'blur': {fn: function(f,e) {
                            var title = Ext.util.Format.stripTags(f.getValue());
                            this.config.model_year = title;
                            this.generateAliasRealTime(this.config.model_title+' '+this.config.model_season+' '+this.config.model_year+' '+this.config.model_inches+'inch '+this.config.model_article);
                            this.generatePagetitleRealTime(this.config.model_title+' '+this.config.model_year+' '+this.config.model_inches+'\'');
                            this.generateLongtitleRealTime(this.config.model_title+' ('+this.config.model_season+' '+this.config.model_year+') '+this.config.model_inches+'\' '+this.config.model_article);                        }, scope: this}
                    }
                }],
            }, {
                columnWidth: .20,
                layout: 'form',
                defaults: {msgTarget: 'under'},
                border: false,
                items: [{
                    xtype: 'textfield',
                    fieldLabel: _('modremont_model_inches'),
                    name: 'inches',
                    id: config.id + '-inches',
                    anchor: '99%',
                    allowBlank: false,
                    listeners: {
                        'blur': {fn: function(f,e) {
                            var title = Ext.util.Format.stripTags(f.getValue());
                            this.config.model_inches = title;
                            this.generateAliasRealTime(this.config.model_title+' '+this.config.model_season+' '+this.config.model_year+' '+this.config.model_inches+'inch '+this.config.model_article);
                            this.generatePagetitleRealTime(this.config.model_title+' '+this.config.model_year+' '+this.config.model_inches+'\'');
                            this.generateLongtitleRealTime(this.config.model_title+' ('+this.config.model_season+' '+this.config.model_year+') '+this.config.model_inches+'\' '+this.config.model_article);                        }, scope: this}
                    }
                }],
            },{
                columnWidth: .30,
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
                    listeners: {
                        'blur': {fn: function(f,e) {
                            var title = Ext.util.Format.stripTags(f.getValue());
                            this.config.model_article = title;
                            this.generateAliasRealTime(this.config.model_title+' '+this.config.model_season+' '+this.config.model_year+' '+this.config.model_inches+'inch '+this.config.model_article);
                            // this.generatePagetitleRealTime(this.config.model_title+' '+this.config.model_year+' '+this.config.model_inches+'\'');
                            this.generateLongtitleRealTime(this.config.model_title+' ('+this.config.model_season+' '+this.config.model_year+') '+this.config.model_inches+'\' '+this.config.model_article);                        }, scope: this}
                    }
                }],
            }]
        },
        {
            xtype: 'textfield',
            fieldLabel: _('modremont_model_article_dop'),
            name: 'article_dop',
            id: config.id + '-article_dop',
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
                    id: 'modremont-model-window-update-uri',
                    anchor: '99%',
                    allowBlank: false,
                    readOnly: true
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

