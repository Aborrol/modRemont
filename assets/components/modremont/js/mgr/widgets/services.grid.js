modRemont.grid.Service = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'modremont-grid-services';
    }
    Ext.applyIf(config, {
        url: modRemont.config.connector_url,
        fields: this.getFields(config),
        columns: this.getColumns(config),
        tbar: this.getTopBar(config),
        sm: new Ext.grid.CheckboxSelectionModel(),
        baseParams: {
            action: 'mgr/service/getlist'
        },
        listeners: {
            rowDblClick: function (grid, rowIndex, e) {
                var row = grid.store.getAt(rowIndex);
                this.updateService(grid, e, row);
            }
        },
        viewConfig: {
            forceFit: true,
            enableRowBody: true,
            autoFill: true,
            showPreview: true,
            scrollOffset: 0,
            getRowClass: function (rec) {
                return !rec.data.active
                    ? 'modremont-grid-row-disabled'
                    : '';
            }
        },
        paging: true,
        remoteSort: true,
        autoHeight: true,
    });
    modRemont.grid.Service.superclass.constructor.call(this, config);

    // Clear selection on grid refresh
    this.store.on('load', function () {
        if (this._getSelectedIds().length) {
            this.getSelectionModel().clearSelections();
        }
    }, this);
};
Ext.extend(modRemont.grid.Service, MODx.grid.Grid, {
    windows: {},

    getMenu: function (grid, rowIndex) {
        var ids = this._getSelectedIds();

        var row = grid.getStore().getAt(rowIndex);
        var menu = modRemont.utils.getMenu(row.data['actions'], this, ids);

        this.addContextMenuItem(menu);
    },

    createService: function (btn, e) {
        var w = MODx.load({
            xtype: 'modremont-service-window-create',
            id: Ext.id(),
            listeners: {
                success: {
                    fn: function () {
                        this.refresh();
                    }, scope: this
                }
            }
        });
        w.reset();
        w.setValues({active: true});
        w.show(e.target);
    },

    updateService: function (btn, e, row) {
        if (typeof(row) != 'undefined') {
            this.menu.record = row.data;
        }
        else if (!this.menu.record) {
            return false;
        }
        var id = this.menu.record.id;

        MODx.Ajax.request({
            url: this.config.url,
            params: {
                action: 'mgr/service/get',
                id: id
            },
            listeners: {
                success: {
                    fn: function (r) {
                        var w = MODx.load({
                            xtype: 'modremont-service-window-update',
                            id: Ext.id(),
                            record: r,
                            listeners: {
                                success: {
                                    fn: function () {
                                        this.refresh();
                                    }, scope: this
                                }
                            }
                        });
                        w.reset();
                        w.setValues(r.object);
                        w.show(e.target);
                    }, scope: this
                }
            }
        });
    },

    removeService: function () {
        var ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        MODx.msg.confirm({
            title: ids.length > 1
                ? _('modremont_services_remove')
                : _('modremont_service_remove'),
            text: ids.length > 1
                ? _('modremont_services_remove_confirm')
                : _('modremont_service_remove_confirm'),
            url: this.config.url,
            params: {
                action: 'mgr/service/remove',
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
    },

    disableService: function () {
        var ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        MODx.Ajax.request({
            url: this.config.url,
            params: {
                action: 'mgr/service/disable',
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
    duplicateService: function (btn,e) {
        var r = this.menu.record;
        
        var w = MODx.load({
            id: Ext.id(),
            xtype: 'modermont-window-copy-service',
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
    enableService: function () {
        var ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        MODx.Ajax.request({
            url: this.config.url,
            params: {
                action: 'mgr/service/enable',
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

    uploadService: function(btn,e) {
        if (!this.uploader) {
            aVer = MODx.config.version.split('.');
            uploaddialog = ((aVer[0] == 2) && aVer[1] >= 3)? MODx.util.MultiUploadDialog.Dialog : Ext.ux.UploadDialog.Dialog;

            this.uploader = new uploaddialog({
                title: _('upload'),
                url: this.config.url,
                base_params: {
                    action: 'mgr/service/upload',
                    docid: modRemont.config.docid
                },
                cls: 'ext-ux-uploaddialog-dialog modx-upload-window'
            });
            this.uploader.on('hide', this.refresh,this);
            this.uploader.on('close', this.refresh,this);
        }

        this.uploader.show(btn);
        this.uploader.buttons[0].input_file.dom.click();
    },

    getFields: function () {
        return ['id', 'pagetitle', 'uri', 'f_price', 'f_time', 'description', 'image',  'categories_names' , 'defect_names' , 'active', 'actions'];
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
        }, {
            header: _('modremont_service_uri'),
            dataIndex: 'uri',
            sortable: true,
            width: 150,
        }, {
            header: _('modremont_service_description'),
            dataIndex: 'description',
            sortable: false,
            width: 150,
        }, {
            header: _('modremont_service_categories'),
            dataIndex: 'categories_names',
            sortable: false,
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
        return [ {
            xtype: 'button',
            cls: 'primary-button',
            text: '<i class="icon icon-plus"></i> ' + _('modremont_service_create'),
            handler: this.createService,
            scope: this
        }, {
            text: '<i class="icon icon-cogs"></i> ',
            menu: [{
                text: '<i class="icon icon-plus"></i> ' + _('modremont_service_create'),
                cls: 'modremont-cogs',
                handler: this.createService,
                scope: this
            }, {
                text: '<i class="icon icon-trash-o red"></i> ' + _('modremont_service_remove'),
                cls: 'modremont-cogs',
                handler: this.removeService,
                scope: this
            }, {
                text: '<i class="icon icon-toggle-on green"></i> ' + _('modremont_service_enable'),
                cls: 'modremont-cogs',
                handler: this.enableService,
                scope: this
            }, {
                text: '<i class="icon icon-toggle-off red"></i> ' + _('modremont_service_disable'),
                cls: 'modremont-cogs',
                handler: this.disableService,
                scope: this
            },{
                text: '<i class="icon icon-laptop action-green"></i> ' + _('modremont_service_add_to_model'),
                cls: 'modremont-cogs',
                handler: this.addServiceToModel,
                scope: this
            }]
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
        }, {
            xtype: 'modremont-combo-category'
            , name: 'modremont_filter_category'
            , id: 'modremont_filter_category'
            , width: 200
            ,fieldLabel: 'CategoryFilter'
            ,emptyText: 'Фильтр по категории'
            , emptyValue: 0
            , listeners: {
                'select': {
                    fn: this.filterCategory
                    , scope: this
                }
            }
        }];
    },

    addServiceToModel: function () {
        var ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        MODx.Ajax.request({
            url: modRemont.config['connector_url'],
            params: {
                action: 'mgr/modelservice/addModelServiceFromService',
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
	filterCategory: function(cb, nv, ov) {
		this.getStore().setBaseParam('categoryquery', cb.getValue());
		this.getBottomToolbar().changePage(1);
		this.refresh();
	},
    _doSearch: function (tf) {
        this.getStore().baseParams.query = tf.getValue();
        this.getBottomToolbar().changePage(1);
    },

    _clearSearch: function () {
        this.getStore().baseParams = {
			action: 'mgr/service/getlist'
		};
        Ext.getCmp('modremont_filter_category').reset();
        this.getBottomToolbar().changePage(1);
    },
});
Ext.reg('modremont-grid-services', modRemont.grid.Service);
