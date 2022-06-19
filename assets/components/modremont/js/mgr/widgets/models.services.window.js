modRemont.window.ModelService = function (config) {
  config = config || {};

  Ext.applyIf(config, {
      title: _('modremont_modelservices_update'),
      width: 900,
      baseParams: {
          action: config.action || 'mgr/modelservices/update',
      },
      modal: true,
  });
  modRemont.window.ModelService.superclass.constructor.call(this, config);
};
Ext.extend(modRemont.window.ModelService, modRemont.window.Default, {

  getFields: function () {
      return [
          {xtype: 'hidden', name: 'id'},
          {xtype: 'hidden', name: 'model_id'},
          {xtype: 'hidden', name: 'service_id'},
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
                    fieldLabel: _('modremont_service_pagetitle'),
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
                    fieldLabel: _('modremont_service_longtitle'),
                    name: 'longtitle',
                    id: config.id + '-longtitle',
                    anchor: '99%',
                    allowBlank: true,
                }],
            }]
        },
        {
            layout: 'column',
            border: false,
            anchor: '99%',
            items: [
              {
                columnWidth: .50,
                layout: 'form',
                defaults: {msgTarget: 'under'},
                border: false,
                items: [{
                    xtype: 'modremont-combo-defects',
                    fieldLabel: _('modremont_defect_problems'),
                    name: 'defects',
                    dataIndex : 'defects',
                    id: config.id + '-defects',
                    anchor: '99%',
                    allowBlank: false,
                    baseParams: {
                        action: 'mgr/defect/getlist',
                        combo: true,
                        id: config.value,
                    }
                }],
            }
        
        ]
        },
        {
            layout: 'column',
            border: false,
            anchor: '99%',
            items: [
            {
                columnWidth: .2,
                layout: 'form',
                defaults: {msgTarget: 'under'},
                border: false,
                items: [{
                    xtype: 'xcheckbox',
                    fieldLabel: _('modremont_service_priceby_active'),
                    boxLabel: _('modremont_service_active'),
                    name: 'priceby',
                    id: config.id + '-priceby',
                    checked: true,
                }],
            },
            {
                columnWidth: .3,
                layout: 'form',
                defaults: {msgTarget: 'under'},
                border: false,
                items: [{
                    xtype: 'textfield',
                    fieldLabel: _('modremont_service_time'),
                    name: 'time',
                    id: config.id + '-time',
                    anchor: '99%',
                    allowBlank: false,
                }],
            },
            {
                columnWidth: .2,
                layout: 'form',
                defaults: {msgTarget: 'under'},
                border: false,
                items: [{
                    xtype: 'xcheckbox',
                    fieldLabel: _('modremont_service_timeby_active'),
                    boxLabel: _('modremont_service_active'),
                    name: 'timeby',
                    id: config.id + '-timeby',
                    checked: true,
                }],
            },
            {
                columnWidth: .3,
                layout: 'form',
                defaults: {msgTarget: 'under'},
                border: false,
                items: [{
                    xtype: 'textfield',
                    fieldLabel: _('modremont_service_price'),
                    name: 'price',
                    id: config.id + '-price',
                    anchor: '99%',
                    allowBlank: false,
                }],
            },
            ]
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
                    fieldLabel: _('modremont_service_image'),
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
                    fieldLabel: _('modremont_service_uri'),
                    name: 'uri',
                    id: config.id + '-uri',
                    anchor: '99%',
                    allowBlank: false,
                }],
            },
            //  {
            //     columnWidth: .50,
            //     layout: 'form',
            //     defaults: {msgTarget: 'under'},
            //     border: false,
            //     items: [{
            //         xtype: 'modremont-combo-options',
            //         fieldLabel: _('modremont_products'),
            //         name: 'products',
            //         id: config.id + '-products',
            //         anchor: '99%',
            //         allowBlank: true,
            //     }],
            // },
        ],
        },
         {
            xtype: 'textarea',
            fieldLabel: _('modremont_service_description'),
            name: 'description',
            id: config.id + '-description',
            height: 150,
            anchor: '99%',
        },
         {
            xtype: 'textarea',
            fieldLabel: _('modremont_service_content'),
            name: 'content',
            id: config.id + '-content',
            height: 150,
            anchor: '99%',
        },
         {
            xtype: 'textarea',
            fieldLabel: _('modremont_service_contentbottom'),
            name: 'contentbottom',
            id: config.id + '-contentbottom',
            height: 150,
            anchor: '99%',
            // listeners: {
            //     render: function () {
            //         MODx.loadRTE("contentbottom");
            //     }
            // }
        }, {
            xtype: 'xcheckbox',
            boxLabel: _('modremont_service_active'),
            name: 'active',
            id: config.id + '-active',
            checked: true,
        }
      ];
  },

  getKeys: function () {
      return [{
          key: Ext.EventObject.ENTER,
          shift: true,
          fn: function () {
              this.submit()
          }, scope: this
      }];
  },

});
Ext.reg('modremont-window-modelserevice-update', modRemont.window.ModelService);modRemont.window.ModelService = function (config) {
  config = config || {};

  Ext.applyIf(config, {
      title: 'update',
      width: 600,
      baseParams: {
          action: config.action || 'mgr/modelservice/update',
      },
      modal: true,
  });
  modRemont.window.ModelService.superclass.constructor.call(this, config);
};
Ext.extend(modRemont.window.ModelService, modRemont.window.Default, {

  getFields: function () {
    return [
      {xtype: 'hidden', name: 'id'},
      {xtype: 'hidden', name: 'model_id'},
      {xtype: 'hidden', name: 'service_id'},
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
                fieldLabel: _('modremont_service_pagetitle'),
                name: 'pagetitle',
                // id: config.id + '-pagetitle',
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
                fieldLabel: _('modremont_service_longtitle'),
                name: 'longtitle',
                // id: config.id + '-longtitle',
                anchor: '99%',
                allowBlank: true,
            }],
        }]
    },
    {
        layout: 'column',
        border: false,
        anchor: '99%',
        items: [ 
          {
            columnWidth: .50,
            layout: 'form',
            defaults: {msgTarget: 'under'},
            border: false,
            items: [{
                xtype: 'modremont-combo-defects',
                fieldLabel: _('modremont_defect_problems'),
                name: 'defects',
                dataIndex : 'defects',
                // id: config.id + '-defects',
                anchor: '99%',
                allowBlank: false,
                baseParams: {
                    action: 'mgr/defect/getlist',
                    combo: true,
                    // id: config.value,
                }
            }],
        }
    
    ]
    },
    {
        layout: 'column',
        border: false,
        anchor: '99%',
        items: [
        {
            columnWidth: .2,
            layout: 'form',
            defaults: {msgTarget: 'under'},
            border: false,
            items: [{
                xtype: 'xcheckbox',
                fieldLabel: _('modremont_service_priceby_active'),
                boxLabel: _('modremont_service_active'),
                name: 'priceby',
                // id: config.id + '-priceby',
                checked: true,
            }],
        },
        {
            columnWidth: .3,
            layout: 'form',
            defaults: {msgTarget: 'under'},
            border: false,
            items: [{
                xtype: 'textfield',
                fieldLabel: _('modremont_service_time'),
                name: 'time',
                // id: config.id + '-time',
                anchor: '99%',
                allowBlank: false,
            }],
        },
        {
            columnWidth: .2,
            layout: 'form',
            defaults: {msgTarget: 'under'},
            border: false,
            items: [{
                xtype: 'xcheckbox',
                fieldLabel: _('modremont_service_timeby_active'),
                boxLabel: _('modremont_service_active'),
                name: 'timeby',
                // id: config.id + '-timeby',
                checked: true,
            }],
        },
        {
            columnWidth: .3,
            layout: 'form',
            defaults: {msgTarget: 'under'},
            border: false,
            items: [{
                xtype: 'textfield',
                fieldLabel: _('modremont_service_price'),
                name: 'price',
                // id: config.id + '-price',
                anchor: '99%',
                allowBlank: false,
            }],
        },
        ]
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
                fieldLabel: _('modremont_service_image'),
                name: 'image',
                // id: config.id + '-image',
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
                fieldLabel: _('modremont_service_uri'),
                name: 'uri',
                // id: config.id + '-uri',
                anchor: '99%',
                allowBlank: false,
            }],
        },
        //  {
        //     columnWidth: .50,
        //     layout: 'form',
        //     defaults: {msgTarget: 'under'},
        //     border: false,
        //     items: [{
        //         xtype: 'modremont-combo-options',
        //         fieldLabel: _('modremont_products'),
        //         name: 'products',
        //         id: config.id + '-products',
        //         anchor: '99%',
        //         allowBlank: true,
        //     }],
        // },
    ],
    },
     {
        xtype: 'textarea',
        fieldLabel: _('modremont_service_description'),
        name: 'description',
        // id: config.id + '-description',
        height: 150,
        anchor: '99%',
    },
     {
        xtype: 'textarea',
        fieldLabel: _('modremont_service_content'),
        name: 'content',
        // id: config.id + '-content',
        height: 150,
        anchor: '99%',
    },
     {
        xtype: 'textarea',
        fieldLabel: _('modremont_service_contentbottom'),
        name: 'contentbottom',
        // id: config.id + '-contentbottoModelServicem',
        height: 150,
        anchor: '99%',
        // listeners: {
        //     render: function () {
        //         MODx.loadRTE("contentbottom");
        //     }
        // }
    }, {
        xtype: 'xcheckbox',
        boxLabel: _('modremont_service_active'),
        name: 'active',
        // id: config.id + '-active',
        checked: true,
    }
  ];
  },

  getKeys: function () {
      return [{
          key: Ext.EventObject.ENTER,
          shift: true,
          fn: function () {
              this.submit()
          }, scope: this
      }];
  },

});
Ext.reg('modremont-window-modelservice-update', modRemont.window.ModelService);
modRemont.window.duplicateModelService = function (config) {
  config = config || {};
  Ext.applyIf(config, {
      title: _('modermont_duplicate'),
      width: 600,
      url: modRemont.config.connector_url,
      action: 'mgr/modelservice/duplicate',
      fields: this.getFields(config),
      keys: [{
          key: Ext.EventObject.ENTER, shift: true, fn: function () {
              this.submit()
          }, scope: this
      }]
  });
  modRemont.window.duplicateModelService.superclass.constructor.call(this, config);
};
Ext.extend(modRemont.window.duplicateModelService, MODx.Window, {
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
          fieldLabel: _('modermont_field_name'),
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
Ext.reg('modermont-window-copy-modelservice', modRemont.window.duplicateModelService);