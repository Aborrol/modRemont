modRemont.grid.Problems = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'modremont-grid-problems';
    }
    Ext.applyIf(config, {
        url: modRemont.config.connector_url,
        fields: this.getFields(config),
        columns: this.getColumns(config),
        tbar: this.getTopBar(config),
        sm: new Ext.grid.CheckboxSelectionModel(),
        baseParams: {
            action: 'mgr/problem/getlist'
        },
        listeners: {
            rowDblClick: function (grid, rowIndex, e) {
                var row = grid.store.getAt(rowIndex);
                this.updateProblem(grid, e, row);
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
    modRemont.grid.Problems.superclass.constructor.call(this, config);
  
    // Clear selection on grid refresh
    this.store.on('load', function () {
        if (this._getSelectedIds().length) {
            this.getSelectionModel().clearSelections();
        }
    }, this);
  };
  Ext.extend(modRemont.grid.Problems, MODx.grid.Grid, {
    windows: {},
  
    getMenu: function (grid, rowIndex) {
        var ids = this._getSelectedIds();
  
        var row = grid.getStore().getAt(rowIndex);
        var menu = modRemont.utils.getMenu(row.data['actions'], this, ids);
  
        this.addContextMenuItem(menu);
    },
  
    createProblem: function (btn, e) {
        var w = MODx.load({
            xtype: 'modremont-problem-window-create',
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
  
    updateProblem: function (btn, e, row) {
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
                action: 'mgr/problem/get',
                id: id
            },
            listeners: {
                success: {
                    fn: function (r) {
                        var w = MODx.load({
                            xtype: 'modremont-problem-window-update',
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
  
    removeProblem: function () {
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
                action: 'mgr/problem/remove',
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
  
    disableProblem: function () {
        var ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        MODx.Ajax.request({
            url: this.config.url,
            params: {
                action: 'mgr/problem/disable',
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
    duplicateProblem: function (btn,e) {
        var r = this.menu.record;
        
        var w = MODx.load({
            id: Ext.id(),
            xtype: 'modermont-window-copy-problem',
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
    enableProblem: function () {
        var ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        MODx.Ajax.request({
            url: this.config.url,
            params: {
                action: 'mgr/problem/enable',
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
        return ['id', 'pagetitle', 'uri',  'description', 'image', 'categories_names','category_name' , 'active', 'actions'];
    },
  
    getColumns: function () {
        return [{
            header: _('modremont_problem_id'),
            dataIndex: 'id',
            sortable: true,
            width: 70
        }, {
            header: _('modremont_problem_image'),
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
            header: _('modremont_problem_pagetitle'),
            dataIndex: 'pagetitle',
            sortable: true,
            width: 150,
        }, {
            header: _('modremont_problem_uri'),
            dataIndex: 'uri',
            sortable: true,
            width: 150,
        }, {
            header: _('modremont_problem_description'),
            dataIndex: 'description',
            sortable: false,
            width: 250,
        }, {
            header: _('modremont_problem_categories'),
            dataIndex: 'categories_names',
            sortable: false,
            width: 150,
        }, {
            header: _('modremont_problem_active'),
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
            text: '<i class="icon icon-plus"></i> ' + _('modremont_problem_create'),
            handler: this.createProblem,
            scope: this
        }, {
            text: '<i class="icon icon-cogs"></i> ',
            menu: [{
                text: '<i class="icon icon-plus"></i> ' + _('modremont_problem_create'),
                cls: 'modremont-cogs',
                handler: this.createProblem,
                scope: this
            }, {
                text: '<i class="icon icon-trash-o red"></i> ' + _('modremont_problem_remove'),
                cls: 'modremont-cogs',
                handler: this.removeProblem,
                scope: this
            }, {
                text: '<i class="icon icon-toggle-on green"></i> ' + _('modremont_problem_enable'),
                cls: 'modremont-cogs',
                handler: this.enableProblem,
                scope: this
            }, {
                text: '<i class="icon icon-toggle-off red"></i> ' + _('modremont_problem_disable'),
                cls: 'modremont-cogs',
                handler: this.disableProblem,
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
        },{
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
        this.getStore().baseParams.query = '';
        this.getBottomToolbar().changePage(1);
    },
  });
  Ext.reg('modremont-grid-problems', modRemont.grid.Problems);
  