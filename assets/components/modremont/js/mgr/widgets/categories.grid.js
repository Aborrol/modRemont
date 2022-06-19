modRemont.grid.Categories = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'modremont-grid-categories';
    }
    Ext.applyIf(config, {
        url: modRemont.config.connector_url,
        fields: this.getFields(config),
        columns: this.getColumns(config),
        tbar: this.getTopBar(config),
        sm: new Ext.grid.CheckboxSelectionModel(),
        baseParams: {
            action: 'mgr/category/getlist'
        },
        listeners: {
            rowDblClick: function (grid, rowIndex, e) {
                var row = grid.store.getAt(rowIndex);
                this.updateCategory(grid, e, row);
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
        tpl: new Ext.XTemplate(
            '<tpl for=".">\
                <div class="x-combo-list-item">\
                    <strong>{pagetitle}</strong> <sup>({id})</sup>\
                </div>\
            </tpl>'
            ,{compiled: true}
        )
    });
    modRemont.grid.Categories.superclass.constructor.call(this, config);

    // Clear selection on grid refresh
    this.store.on('load', function () {
        if (this._getSelectedIds().length) {
            this.getSelectionModel().clearSelections();
        }
    }, this);
};
Ext.extend(modRemont.grid.Categories, MODx.grid.Grid, {
    windows: {},

    getMenu: function (grid, rowIndex) {
        var ids = this._getSelectedIds();

        var row = grid.getStore().getAt(rowIndex);
        var menu = modRemont.utils.getMenu(row.data['actions'], this, ids);

        this.addContextMenuItem(menu);
    },

    createCategory: function (btn, e) {
        var w = MODx.load({
            xtype: 'modremont-category-window-create',
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

    updateCategory: function (btn, e, row) {
        
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
                action: 'mgr/category/get',
                id: id
            },
            listeners: {
                success: {
                    fn: function (r) {
                        var w = MODx.load({
                            xtype: 'modremont-category-window-update',
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

    removeCategory: function () {
        var ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        MODx.msg.confirm({
            title: ids.length > 1
                ? _('modremont_categories_remove')
                : _('modremont_category_remove'),
            text: ids.length > 1
                ? _('modremont_categories_remove_confirm')
                : _('modremont_category_remove_confirm'),
            url: this.config.url,
            params: {
                action: 'mgr/category/remove',
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

    disableCategory: function () {
        var ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        MODx.Ajax.request({
            url: this.config.url,
            params: {
                action: 'mgr/category/disable',
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
    duplicateCategory: function (btn,e) {
        var r = this.menu.record;
        
        var w = MODx.load({
            id: Ext.id(),
            xtype: 'modermont-window-copy-category',
            ptitle: 'ppss',
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
    enableCategory: function () {
        var ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        MODx.Ajax.request({
            url: this.config.url,
            params: {
                action: 'mgr/category/enable',
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

    getFields: function () {
        return ['id', 'pagetitle', 'uri', 'priceby', 'active', 'actions'];
    },

    getColumns: function () {
        return [{
            header: _('modremont_category_id'),
            dataIndex: 'id',
            sortable: true,
            width: 70
        }, {
            header: _('modremont_category_pagetitle'),
            dataIndex: 'pagetitle',
            sortable: true,
            width: 200,
        }, {
            header: _('modremont_category_alias'),
            dataIndex: 'uri',
            sortable: true,
            width: 200,
        }, {
            header: _('modremont_category_priceby'),
            dataIndex: 'priceby',
            sortable: true,
            width: 200,
        }, {
            header: _('modremont_category_active'),
            dataIndex: 'active',
            renderer: modRemont.utils.renderBoolean,
            sortable: true,
            width: 50,
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
            xtype: 'button',
            cls: 'primary-button',
            text: '<i class="icon icon-plus"></i> ' + _('modremont_category_create'),
            handler: this.createCategory,
            scope: this
        },{
            text: '<i class="icon icon-cogs"></i> ',
            menu: [{
                text: '<i class="icon icon-plus"></i> ' + _('modremont_category_create'),
                cls: 'modremont-cogs',
                handler: this.createCategory,
                scope: this
            }, {
                text: '<i class="icon icon-trash-o red"></i> ' + _('modremont_category_remove'),
                cls: 'modremont-cogs',
                handler: this.removeCategory,
                scope: this
            }, {
                text: '<i class="icon icon-toggle-on green"></i> ' + _('modremont_category_enable'),
                cls: 'modremont-cogs',
                handler: this.enableCategory,
                scope: this
            }, {
                text: '<i class="icon icon-toggle-off red"></i> ' + _('modremont_category_disable'),
                cls: 'modremont-cogs',
                handler: this.disableCategory,
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
        }];
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

    _doSearch: function (tf) {
        this.getStore().baseParams.query = tf.getValue();
        this.getBottomToolbar().changePage(1);
    },

    _clearSearch: function () {
        this.getStore().baseParams.query = '';
        this.getBottomToolbar().changePage(1);
    },
});
Ext.reg('modremont-grid-categories', modRemont.grid.Categories);