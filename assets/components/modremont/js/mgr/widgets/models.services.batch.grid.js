Ext.QuickTips.init();
modRemont.grid.ModelsServicesBatch = function (config) {
  config = config || {};
  this.sm = new Ext.grid.CheckboxSelectionModel();
  if (!config.id) {
      config.id = 'modremont-grid-model-service-batch';
  }
  Ext.applyIf(config, {
      baseParams: {
          action: 'mgr/service/getlist',

      },
      model_id: config.model_id,
      category_id: config.category_id,
      categoryselected: config.category_id,
      multi_select: true,
      stateful: true,
      stateId: config.id,
      pageSize: 20,
      sm: this.sm,
  });
  modRemont.grid.ModelsServicesBatch.superclass.constructor.call(this, config);
};
Ext.extend(modRemont.grid.ModelsServicesBatch, modRemont.grid.Default, {
  getFields: function () {
    return ['id', 'pagetitle', 'f_price', 'f_time', 'uri', 'defect_names'];
  },
  getColumns: function () {
    return [this.sm,{
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
    }];
},
getTopBar: function (config) {
    return [{
        xtype: 'button',
        cls: 'primary-button',
        text: _('modremont_modelservice_addbatch_selected'),
        handler: this.copySelected,
        scope: this
    }, {
        xtype: 'button',
        cls: 'primary-button',
        text: '<i class="icon icon-plus"></i> ' + _('modremont_modelservice_addbatch_fromcategory'),
        handler: this.copyAllFromCategory,
        scope: this
    },    {
        xtype: 'modremont-combo-category'
        , name: 'modremont_filter_category'
        , id: 'modremont_filter_category_batch'
        , width: 200
        ,fieldLabel: 'CategoryFilter'
        ,emptyText: 'Фильтр по категории'
        ,value: config.category_id
        , emptyValue: 0
        , listeners: {
            'select': {
                fn: this.filterCategory
                , scope: this
            }
        }
    }, '->', {
        xtype: 'modremont-field-search',
        width: 250,
        listeners: {
            search: {
                fn: function (field) {
                    this._doSearch(field);
                }, scope: this
            },
            clear: {
                fn: function (field) {
                    field.setValue('');
                    this._clearSearch();
                }, scope: this
            },
        }
    },
 
];
},
copySelected: function (btn) {

var ids = this._getSelectedIds();
if (!ids.length) {
    return false;
}
MODx.Ajax.request({
    url: modRemont.config['connector_url'],
    params: {
        action: 'mgr/modelservice/addservicesfromselected',
        ids: Ext.util.JSON.encode(ids),
        model_id: this.model_id
    },
    listeners: {
        success: {
            fn: function () {
                // this.close();
                Ext.getCmp('modremont_modelservices_batch').close();
                Ext.getCmp('modremont-grid-model-services').refresh();
            }, scope: this
        }
    }
})


},
copyAllFromCategory: function (e) {
    if (!this.categoryselected) {
        return false;
    }
    MODx.Ajax.request({
        url: modRemont.config['connector_url'],
        params: {
            action: 'mgr/modelservice/addservicesfromcategory',
            category_id: this.categoryselected,
            model_id: this.model_id
        },
        listeners: {
            success: {
                fn: function () {
                    Ext.getCmp('modremont_modelservices_batch').close();
                    Ext.getCmp('modremont-grid-model-services').refresh();
                }, scope: this
            }
        }
    })
    

},
  getListeners: function () {
      return {

      };
  },
  onClick: function (e) {
    var elem = e.getTarget();
    if (elem.nodeName == 'BUTTON') {
        var row = this.getSelectionModel().getSelected();
        if (typeof(row) != 'undefined') {
            var action = elem.getAttribute('action');
            if (action == 'showMenu') {
                var ri = this.getStore().find('id', row.id);
                return this._showMenu(this, ri, e);
            }
            else if (typeof this[action] === 'function') {
                this.menu.record = row.data;
                return this[action](this, e);
            }
        }
    }
    return this.processEvent('click', e);
},
filterCategory: function(cb, nv, ov) {
    this.getStore().setBaseParam('categoryquery', cb.getValue());
    this.getBottomToolbar().changePage(1);
    this.categoryselected = cb.getValue();
    this.refresh();
},
_doSearch: function (tf) {
    this.getStore().baseParams.query = tf.getValue();
    this.getBottomToolbar().changePage(1);
},

_clearSearch: function () {
    // this.getStore().baseParams.query = '';
    this.getStore().baseParams = {
        action: 'mgr/service/getlist'
    };
    Ext.getCmp('modremont_filter_category').reset();
    this.getBottomToolbar().changePage(1);
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
});
Ext.reg('modremont-grid-model-service-batch', modRemont.grid.ModelsServicesBatch);