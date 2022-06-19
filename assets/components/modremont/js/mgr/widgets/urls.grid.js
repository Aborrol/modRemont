modRemont.grid.Urls = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'modremont-grid-urls';
    }
    Ext.applyIf(config, {
        url: modRemont.config.connector_url,
        fields: this.getFields(config),
        columns: this.getColumns(config),
        tbar: this.getTopBar(config),
        sm: new Ext.grid.CheckboxSelectionModel(),
        baseParams: {
            action: 'mgr/url/getlist'
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
    modRemont.grid.Urls.superclass.constructor.call(this, config);
    // Clear selection on grid refresh
    this.store.on('load', function () {
        if (this._getSelectedIds().length) {
            this.getSelectionModel().clearSelections();
        }
    }, this);
};
Ext.extend(modRemont.grid.Urls, MODx.grid.Grid, {
    windows: {},

    getMenu: function (grid, rowIndex) {
        var ids = this._getSelectedIds();

        var row = grid.getStore().getAt(rowIndex);
        var menu = modRemont.utils.getMenu(row.data['actions'], this, ids);

        this.addContextMenuItem(menu);
    },

    openUrl: function () {
        window.open('/'+MODx.config.modremont_base_url+'/'+this.menu.record['url']+'/');

        return false;
    },
    removeUrl: function () {
        var ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        MODx.msg.confirm({
            title: ids.length > 1
                ? _('modremont_urls_remove')
                : _('modremont_url_remove'),
            text: ids.length > 1
                ? _('modremont_urls_remove_confirm')
                : _('modremont_url_remove_confirm'),
            url: this.config.url,
            params: {
                action: 'mgr/url/remove',
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

    disableUrl: function () {
        var ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        MODx.Ajax.request({
            url: this.config.url,
            params: {
                action: 'mgr/url/disable',
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

    enableUrl: function () {
        var ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        MODx.Ajax.request({
            url: this.config.url,
            params: {
                action: 'mgr/url/enable',
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
    generateUrls: function () {
        MODx.Ajax.request({
            url: this.config.url,
            params: {
                action: 'mgr/url/generate'
            },
            listeners: {
                success: {
                    fn: function (res) {
                        if(res) {
                            out = '';
                            if(res.object.length > 0){
                                for (let index = 0; index < res.object.length; index++) {
                                    const element = res.object[index];
                                    out += 'id: '+element.id+' url: '+element.url+' повторений: '+element.count+'<br/>'
                                }
                            }
                            else{
                                out = 'Дубликатов при создании не найдено'
                            }
                            MODx.msg.alert(_('moderemont_info'), out);
                        }
                        this.refresh();
                    }, scope: this
                }
            }
        })
    },

    getFields: function () {
        return ['id', 'pagetitle', 'url', 'type', 'active', 'actions'];
    },

    getColumns: function () {
        return [{
            header: _('modremont_url_id'),
            dataIndex: 'id',
            sortable: true,
            width: 70
        }, {
            header: _('modremont_url_pagetitle'),
            dataIndex: 'pagetitle',
            sortable: true,
            width: 200,
        }, {
            header: _('modremont_url_url'),
            dataIndex: 'url',
            sortable: true,
            width: 200,
            renderer: function(val, cell, row) {
                return modRemont.utils.link(val, MODx.config.modremont_base_url);
            }
        }, {
            header: _('modremont_url_type'),
            dataIndex: 'type',
            sortable: true,
            width: 200,
        }, {
            header: _('modremont_url_active'),
            dataIndex: 'active',
            renderer: modRemont.utils.renderBoolean,
            sortable: true,
            width: 50,
        }, {
            header: _('modremont_grid_actions'),
            dataIndex: 'actions',
            renderer: modRemont.utils.renderActions,
            sortable: false,
            width: 50,
            id: 'actions'
        }];
    },

    getTopBar: function () {
        return [
        {
            xtype: 'button',
            cls: 'primary-button',
            text: '<i class="icon icon-magic"></i> ' + _('modremont_url_generate'),
            handler: this.generateUrls,
            scope: this
        },{
            text: '<i class="icon icon-cogs"></i> ',
            menu: [{
                text: '<i class="icon icon-eye"></i> ' + _('modremont_url_open'),
                cls: 'modremont-cogs',
                handler: this.openUrl,
                scope: this
            },{
                text: '<i class="icon icon-toggle-on green"></i> ' + _('modremont_url_enable'),
                cls: 'modremont-cogs',
                handler: this.enableUrl,
                scope: this
            }, {
                text: '<i class="icon icon-toggle-off red"></i> ' + _('modremont_url_disable'),
                cls: 'modremont-cogs',
                handler: this.disableUrl,
                scope: this
            }]
        }, '->',{
            xtype: 'modremont-combo-types'
            , name: 'modremont_filter_types'
            , id: 'modremont_filter_types'
            , width: 200
            ,fieldLabel: 'TypeFilter'
            ,emptyText: 'Фильтр по типу'
            , emptyValue: 0
            , listeners: {
                'select': {
                    fn: this.filterType
                    , scope: this
                }
            }
        },{
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
	filterCategory: function(cb, nv, ov) {
		this.getStore().setBaseParam('categoryquery', cb.getValue());
		this.getBottomToolbar().changePage(1);
		this.refresh();
	},
	filterType: function(cb, nv, ov) {
		this.getStore().setBaseParam('typequery', cb.getValue());
		this.getBottomToolbar().changePage(1);
		this.refresh();
	},
    _doSearch: function (tf) {
        this.getStore().baseParams.query = tf.getValue();
        this.getBottomToolbar().changePage(1);
    },

    _clearSearch: function () {
        this.getStore().baseParams.query = '';
        this.getStore().baseParams.typequery = '';
        this.getBottomToolbar().changePage(1);
    },
});
Ext.reg('modremont-grid-urls', modRemont.grid.Urls);