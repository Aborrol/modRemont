modRemont.grid.ModelsServices = function (config) {
  config = config || {};
  if (!config.id) {
      config.id = 'modremont-grid-model-services';
  }

  Ext.applyIf(config, {
      baseParams: {
          action: 'mgr/modelservice/getlist',
          model_id: config.model_id
      },
      multi_select: false,
      stateful: true,
      stateId: config.id,
      pageSize: 20,
  });
  modRemont.grid.ModelsServices.superclass.constructor.call(this, config);
};
Ext.extend(modRemont.grid.ModelsServices, modRemont.grid.Default, {

  getFields: function () {
    return ['id', 'pagetitle', 'uri', 'f_price', 'f_time', 'image', 'defect_names' , 'active', 'actions'];
  },

  getColumns: function () {
    return [{
        header: _('modremont_service_id'),
        dataIndex: 'id',
        sortable: true,
        width: 70
    }, {
        header: _('modremont_service_image'),
        dataIndex: 'image',
        sortable: true,
        width: 100,
        renderer: function(value){
            if(value) {
                return '<img width="50" src="/' + value + '">';
            } else {
                return '<img width="50" src="/assets/images/uploads/noimage.png">';
            }
        },
        editor: { xtype: 'modx-combo-browser' }
    }, {
        header: _('modremont_service_pagetitle'),
        dataIndex: 'pagetitle',
        sortable: true,
        width: 150,
    },
    {
        header: _('modremont_service_price'),
        dataIndex: 'f_price',
        sortable: true,
        width: 150,
    }, {
        header: _('modremont_service_time'),
        dataIndex: 'f_time',
        sortable: true,
        width: 150,
    },
     {
        header: _('modremont_service_uri'),
        dataIndex: 'uri',
        sortable: true,
        width: 150,
    },
    {
        header: _('modremont_service_defects'),
        dataIndex: 'defect_names',
        sortable: false,
        width: 150,
    }, 
    {
        header: _('modremont_service_active'),
        dataIndex: 'active',
        renderer: modRemont.utils.renderBoolean,
        sortable: true,
        width: 100,
    }, {
        header: _('modremont_grid_actions'),
        dataIndex: 'actions',
        renderer: modRemont.utils.renderActions,
        sortable: false,
        width: 150,
        id: 'actions'
    }];
},

  getTopBar: function () {
      return [{
          xtype: 'modremont-combo-modelservice',
          allowBlank: true,
          width: '50%',
          listeners: {
              select: {
                  fn: this.addModelService,
                  scope: this
              }
          }
      },
      {
        xtype: 'button',
        cls: 'primary-button',
        text: '<i class="icon icon-plus"></i> ' + _('modremont_modelservice_create'),
        handler: this.createModelService,
        scope: this
    },
    {
      xtype: 'button',
      cls: 'primary-button',
      text: '<i class="icon icon-plus"></i> ' + _('modremont_modelservice_addbatch'),
      handler: this.addModelServicesBatch,
      scope: this
  }
    
    ];
  },

  getListeners: function () {
      return {
          rowDblClick: function (grid, rowIndex, e) {
              var row = grid.store.getAt(rowIndex);
              this.updateModelService(grid, e, row);
          }
      };
  },
  createModelService: function (btn, e) {

    w = MODx.load({
      xtype: 'modremont-window-modelservice-update',
      id: 'modremont-window-modelservice-create',
      action: 'mgr/modelservice/create',
      listeners: {
          success: {
              fn: function () {
                  this.refresh();
              }, scope: this
          }
      }
  });
  w.setValues({model_id: this.config.model_id});
  w.show(e.target);
  w.reset();
  },
  addModelServicesBatch: function (btn, e) {

    w = MODx.load({
      xtype: 'modremont_modelservices_batch',
      id: 'modremont_modelservices_batch',
      action: 'mgr/services/getlist',
      model_id: this.config.model_id,
      category_id: this.config.category_id,
      listeners: {
          success: {
              fn: function () {
                  this.refresh();
              }, scope: this
          }
      }
  });
  w.setValues({model_id: this.config.model_id});
  w.setValues({category_id: '2'});
  w.show(e.target);
  w.reset();

  },
  addModelService: function (combo, row) {
    var id = row.id;
    combo.reset();
    
    MODx.Ajax.request({
      url: modRemont.config['connector_url'],
      params: {
        action: 'mgr/service/get',
        id: id
      },
      listeners: {
        success: {
          fn: function (r) {
            var w = Ext.getCmp('modremont-window-modelservice-update');
            if (w) {
              w.close();
            }
            
            r.object.model_id = this.config.model_id;
            r.object.service_id = r.object.id;
            r.object.id = '';
                      w = MODx.load({
                          xtype: 'modremont-window-modelservice-update',
                          id: 'modremont-window-modelservice-update',
                          record: r.object,
                          action: 'mgr/modelservice/create',
                          listeners: {
                              success: {
                                  fn: function () {
                                      modRemont.grid.Models.changed = true;
                                      this.refresh();
                                  }, scope: this
                              }
                          }
                      });
                      w.fp.getForm().reset();
                      w.fp.getForm().setValues(r.object);
                      w.show(Ext.EventObject.target);
                  }, scope: this
              }
          }
      });
  },
  _getSelectedIds: function () {
    var ids = [];
    var selected = this.getSelectionModel().getSelections();

    for (var i in selected) {
        if (!selected.hasOwnProperty(i)) {
            continue;
        }
        ids.push(selected[i]['id']);
    }

    return ids;
},
  updateModelService: function (btn, e, row) {
      if (typeof(row) != 'undefined') {
          this.menu.record = row.data;
      }
      var id = this.menu.record.id;
      MODx.Ajax.request({
          url: modRemont.config['connector_url'],
          params: {
              action: 'mgr/modelservice/get',
              id: id
          },
          listeners: {
              success: {
                  fn: function (r) {
                      var w = Ext.getCmp('modremont-window-modelservice-update');
                      if (w) {
                          w.close();
                      }

                      r.object.order_id = this.config.order_id;
                      w = MODx.load({
                          xtype: 'modremont-window-modelservice-update',
                          id: 'modremont-window-modelservice-update',
                          record: r.object,
                          action: 'mgr/modelservice/update',
                          listeners: {
                              success: {
                                  fn: function () {
                                      modRemont.grid.Models.changed = true;
                                      this.refresh();
                                  }, scope: this
                              },
                          }
                      });
                      w.fp.getForm().reset();
                      w.fp.getForm().setValues(r.object);
                      w.show(e.target);
                  }, scope: this
              }
          }
      });
  },
  disableModelService: function () {
    var ids = this._getSelectedIds();
    if (!ids.length) {
        return false;
    }
    MODx.Ajax.request({
        url: this.config.url,
        params: {
            action: 'mgr/modelservice/disable',
            ids: Ext.util.JSON.encode(ids),
        },
        listeners: {
            success: {
                fn: function () {
                    this.refresh();
                }, scope: this
            }
        }
    })
},
duplicateModelService: function (btn,e) {
    var r = this.menu.record;
    
    var w = MODx.load({
        id: Ext.id(),
        xtype: 'modermont-window-copy-modelservice',
        listeners: {
            success: {
                fn: function (res) {
                    if(res.a.result.object.total_message) {
                        MODx.msg.alert(_('moderemont_info'), res.a.result.object.total_message);
                    }
                    this.refresh();
                }, scope: this
            }
        }
    });
    var f = w.fp.getForm();
    f.reset();
    f.setValues({id: r.id, pagetitle: r.pagetitle+'_copy'});
    f.setValues({id: r.id, uri: r.uri+'_copy'});
    w.show(e.target);
},
enableModelService: function () {
    var ids = this._getSelectedIds();
    if (!ids.length) {
        return false;
    }
    MODx.Ajax.request({
        url: this.config.url,
        params: {
            action: 'mgr/modelservice/enable',
            ids: Ext.util.JSON.encode(ids),
        },
        listeners: {
            success: {
                fn: function () {
                    this.refresh();
                }, scope: this
            }
        }
    })
},
  removeModelService: function () {


      var ids = this._getSelectedIds();
      if (!ids.length) {
          return false;
      }
      MODx.msg.confirm({
          title: ids.length > 1
              ? _('modremont_problems_remove')
              : _('modremont_problem_remove'),
          text: ids.length > 1
              ? _('modremont_problems_remove_confirm')
              : _('modremont_problem_remove_confirm'),
          url: this.config.url,
          params: {
              action: 'mgr/modelservice/remove',
              ids: Ext.util.JSON.encode(ids),
          },
          listeners: {
              success: {
                  fn: function () {
                      this.refresh();
                  }, scope: this
              }
          }
      });
      return true;

  }
});
Ext.reg('modremont-grid-model-service', modRemont.grid.ModelsServices);




modRemont.combo.ModelServices = function (config) {
    config = config || {};

    Ext.applyIf(config, {
        name: 'modelservice',
        fieldLabel: _('modremont_' + config.name + '_select' || 'problem'),
        hiddenName: 'modelservice',
        displayField: 'pagetitle',
        valueField: 'id',
        anchor: '99%',
        fields: ['pagetitle', 'id'],
        pageSize: 20,
        url: modRemont.config['connector_url'],
        typeAhead: true,
        editable: true,
        allowBlank: true,
        emptyText: _('no'),
        minChars: 1,
        baseParams: {
            action: 'mgr/service/getlist',
            combo: true,
            id: config.value,
        },

    });
    modRemont.combo.ModelServices.superclass.constructor.call(this, config);
    this.on('expand', function () {
        if (!!this.pageTb) {
            this.pageTb.show();
        }
    });
};
Ext.extend(modRemont.combo.ModelServices, MODx.combo.ComboBox);
Ext.reg('modremont-combo-modelservice', modRemont.combo.ModelServices);