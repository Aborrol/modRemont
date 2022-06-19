modRemont.combo.ComboBoxDefault = function (config) {
    config = config || {};

    Ext.applyIf(config, {
        assertValue : function(){
            var val = this.getRawValue(),
                rec;
            if(this.valueField && Ext.isDefined(this.value)){
                rec = this.findRecord(this.valueField, this.value);
            }
            if(!rec && this.forceSelection){
                if(val.length > 0 && val != this.emptyText){
                    this.el.dom.value = Ext.value(this.lastSelectionText, '');
                    this.applyEmptyText();
                }else{
                    this.clearValue();
                }
            }else{
                if(rec && this.valueField){
                    if (this.value == val){
                        return;
                    }
                    val = rec.get(this.valueField || this.displayField);
                }
                this.setValue(val);
            }
        },

    });
    modRemont.combo.ComboBoxDefault.superclass.constructor.call(this, config);
};
Ext.extend(modRemont.combo.ComboBoxDefault, MODx.combo.ComboBox);
modRemont.combo.Search = function (config) {
    config = config || {};
    Ext.applyIf(config, {
        xtype: 'twintrigger',
        ctCls: 'x-field-search',
        allowBlank: true,
        msgTarget: 'under',
        emptyText: _('search'),
        name: 'query',
        triggerAction: 'all',
        clearBtnCls: 'x-field-search-clear',
        searchBtnCls: 'x-field-search-go',
        onTrigger1Click: this._triggerSearch,
        onTrigger2Click: this._triggerClear,
    });
    modRemont.combo.Search.superclass.constructor.call(this, config);
    this.on('render', function () {
        this.getEl().addKeyListener(Ext.EventObject.ENTER, function () {
            this._triggerSearch();
        }, this);
    });
    this.addEvents('clear', 'search');
};
Ext.extend(modRemont.combo.Search, Ext.form.TwinTriggerField, {

    initComponent: function () {
        Ext.form.TwinTriggerField.superclass.initComponent.call(this);
        this.triggerConfig = {
            tag: 'span',
            cls: 'x-field-search-btns',
            cn: [
                {tag: 'div', cls: 'x-form-trigger ' + this.searchBtnCls},
                {tag: 'div', cls: 'x-form-trigger ' + this.clearBtnCls}
            ]
        };
    },

    _triggerSearch: function () {
        this.fireEvent('search', this);
    },

    _triggerClear: function () {
        this.fireEvent('clear', this);
    },

});
modRemont.combo.Category = function (config) {
    config = config || {};

    Ext.applyIf(config, {
        name: 'category_id',
        fieldLabel: _('categories_' + config.name || 'category'),
        hiddenName: 'category_id',
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
            action: 'mgr/category/getlist',
            combo: true,
            id: config.value,
        }
    });
    modRemont.combo.Category.superclass.constructor.call(this, config);
    this.on('expand', function () {
        if (!!this.pageTb) {
            this.pageTb.show();
        }
    });
};
Ext.extend(modRemont.combo.Category, MODx.combo.ComboBox);
modRemont.combo.Problem = function (config) {
    config = config || {};

    Ext.applyIf(config, {
        name: 'problem_id',
        fieldLabel: _('problems_' + config.name || 'problem'),
        hiddenName: 'problem_id',
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
            action: 'mgr/problem/getlist',
            combo: true,
            id: config.value,
        }
    });
    modRemont.combo.Problem.superclass.constructor.call(this, config);
    this.on('expand', function () {
        if (!!this.pageTb) {
            this.pageTb.show();
        }
    });
};
Ext.extend(modRemont.combo.Problem, MODx.combo.ComboBox);


modRemont.combo.DateTime = function (config) {
    config = config || {};
    Ext.applyIf(config, {
        timePosition: 'right',
        allowBlank: true,
        hiddenFormat: 'Y-m-d H:i:s',
        dateFormat: MODx.config['manager_date_format'],
        timeFormat: MODx.config['manager_time_format'],
        dateWidth: 120,
        timeWidth: 120,
    });
    modRemont.combo.DateTime.superclass.constructor.call(this, config);
};
Ext.extend(modRemont.combo.DateTime, Ext.ux.form.DateTime);


modRemont.combo.Options = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        xtype: 'superboxselect',
        name: 'categories',
        fieldLabel: config['name'] || 'categories',
        hiddenName: config['name'] || 'categories',
        originalName: config['name'] || 'categories',
        displayField: 'pagetitle',
        valueField: 'id',
        store: new Ext.data.JsonStore({
            url: modRemont.config['connector_url'],
            baseParams: {
                action: 'mgr/category/getlist',
                combo: true,
                id: config.value
            },
            root: 'results',
            totalProperty: 'total',
            autoLoad: true,
            autoSave: false,
            fields: ['id', 'pagetitle'],
        }),
        minChars: 2,
        editable: true,
        resizable: true,
        typeAhead: false,
        allowBlank: true,
        forceFormValue: false,
        allowAddNewData: true,
        addNewDataOnBlur: true,
        forceSameValueQuery: true,
        triggerAction: 'all',
        pageSize: 15,
        anchor: '100%',
        extraItemCls: 'x-tag',
        clearBtnCls: 'x-form-trigger',
        expandBtnCls: 'x-form-trigger',
        listEmptyText: '<div style="padding: 7px;">No results...</div>',
        tpl: new Ext.XTemplate('\
            <tpl for="."><div class="x-combo-list-item">\
                <span>\
                    {pagetitle}\
                </span>\
            </div></tpl>',
            {compiled: true}
        ),
    });
    ['name', 'hiddenName', 'originalName'].forEach(function (name) {
        config[name] += '[]';
    });
    modRemont.combo.Options.superclass.constructor.call(this,config);

    this.on('newitem', function (combo, val) {
        combo.addItem({id: val, pagetitle: val});
    }, this);
};
Ext.extend(modRemont.combo.Options, Ext.ux.form.SuperBoxSelect, {
    initValue: function () {
        let sbs = this;
        window.setTimeout(function () {
            if (Ext.isObject(sbs.value) || Ext.isArray(sbs.value)) {
                sbs.setValueEx(sbs.value);
                sbs.originalValue = sbs.getValue();
            } else {
                Ext.ux.form.SuperBoxSelect.superclass.initValue.call(sbs);
            }
            if (sbs.mode === 'remote') {
                sbs.setOriginal = true;
            }
        }, 700);
    },
});

modRemont.combo.Defects = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        xtype: 'superboxselect',
        name: 'defects',
        fieldLabel: config['name'] || 'defects',
        hiddenName: config['name'] || 'defects',
        originalName: config['name'] || 'defects',
        displayField: 'pagetitle',
        valueField: 'id',
        store: new Ext.data.JsonStore({
            url: modRemont.config['connector_url'],
            baseParams: {
                action: 'mgr/defect/getlist',
                combo: true,
                id: config.value
            },
            root: 'results',
            totalProperty: 'total',
            autoLoad: true,
            autoSave: false,
            fields: ['id', 'pagetitle'],
        }),
        minChars: 2,
        editable: true,
        resizable: true,
        typeAhead: false,
        allowBlank: true,
        forceFormValue: false,
        allowAddNewData: true,
        addNewDataOnBlur: true,
        forceSameValueQuery: true,
        triggerAction: 'all',
        pageSize: 15,
        anchor: '100%',
        extraItemCls: 'x-tag',
        clearBtnCls: 'x-form-trigger',
        expandBtnCls: 'x-form-trigger',
        listEmptyText: '<div style="padding: 7px;">No results...</div>',
        tpl: new Ext.XTemplate('\
            <tpl for="."><div class="x-combo-list-item">\
                <span>\
                    {pagetitle}\
                </span>\
            </div></tpl>',
            {compiled: true}
        ),
    });
    ['name', 'hiddenName', 'originalName'].forEach(function (name) {
        config[name] += '[]';
    });
    modRemont.combo.Defects.superclass.constructor.call(this,config);

    this.on('newitem', function (combo, val) {
        combo.addItem({id: val, pagetitle: val});
    }, this);
};
Ext.extend(modRemont.combo.Defects, Ext.ux.form.SuperBoxSelect, {
    initValue: function () {
        let sbs = this;
        window.setTimeout(function () {
            if (Ext.isObject(sbs.value) || Ext.isArray(sbs.value)) {
                sbs.setValueEx(sbs.value);
                sbs.originalValue = sbs.getValue();
            } else {
                Ext.ux.form.SuperBoxSelect.superclass.initValue.call(sbs);
            }
            if (sbs.mode === 'remote') {
                sbs.setOriginal = true;
            }
        }, 700);
    },
});


modRemont.combo.Types = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        store: new Ext.data.ArrayStore({
            id: 0
            ,fields: ['type','name']
            ,data: [
                ['category','Категория']
                ,['model','Модель']
                ,['problem','Проблемы']
                ,['service','Услуга']
                ,['modelservice','Услуга модели']
            ]
        })
        ,mode: 'local'
        ,displayField: 'name'
        ,valueField: 'type'
    });
    modRemont.combo.Types.superclass.constructor.call(this,config);
};
Ext.extend(modRemont.combo.Types,MODx.combo.ComboBox);
Ext.reg('modremont-combo-types',modRemont.combo.Types);

// modRemont.combo.MultipleCategory = function(config) {
//     config = config || {};
//     Ext.applyIf(config,{
//         xtype:'superboxselect'
//         ,allowBlank: true
//         ,msgTarget: 'under'
//         ,allowAddNewData: true
//         ,addNewDataOnBlur : true
//         ,resizable: true
//         ,name: config.name || 'category_id'
//         ,anchor:'100%'
//         ,minChars: 2
//         ,store:new Ext.data.JsonStore({
//             // id: (config.name || 'category_id') + '-store'
//             root:'results'
//             ,autoLoad: true
//             ,autoSave: false
//             ,totalProperty:'total'
//             ,fields: ['id', 'pagetitle']
//             ,url: modRemont.config['connector_url']
//             ,baseParams: {
//                 action: 'mgr/category/getlist'
//                 ,key: config.name
//             }
//         })
//         ,mode: 'remote'
//         ,displayField: 'pagetitle'
//         ,valueField: 'id'
//         ,value:'{$values}'
//         ,triggerAction: 'all'
//         ,extraItemCls: 'x-tag'
//         ,expandBtnCls: 'x-form-trigger'
//         ,clearBtnCls: 'x-form-trigger',
//         forceFormValue: false
//         ,listeners: {
//             // newitem: function(bs,v, f) {bs.addItem({tag: v});},s
//         }
//     });
//     config.name += '[]';
//     modRemont.combo.MultipleCategory.superclass.constructor.call(this,config);
// };
// Ext.extend(modRemont.combo.MultipleCategory,Ext.ux.form.SuperBoxSelect);
// Ext.reg('modremont-combo-multiplecategories',modRemont.combo.MultipleCategory);

// Ext.extend(modRemont.combo.MultipleCategory, Ext.ux.form.SuperBoxSelect);
Ext.reg('modremont-combo-combobox-default', modRemont.combo.ComboBoxDefault);
Ext.reg('modremont-combo-dates',modRemont.combo.DateTime);
Ext.reg('modremont-combo-category', modRemont.combo.Category);
Ext.reg('modremont-combo-problem', modRemont.combo.Problem);
Ext.reg('modremont-combo-search', modRemont.combo.Search);
Ext.reg('modremont-field-search', modRemont.combo.Search);
// Ext.reg('modremont-combo-product', modRemont.combo.Product);
Ext.reg('modremont-combo-options', modRemont.combo.Options);
Ext.reg('modremont-combo-defects', modRemont.combo.Defects);
// Ext.reg('modremont-combo-multiplecategories', modRemont.combo.MultipleCategory);


// modRemont.combo.ModelServices = function (config) {
//     config = config || {};
//     Ext.applyIf(config, {
//         id: 'modremont-combo-modelservices',
//         fieldLabel: _('ms2_product_name'),
//         fields: ['id', 'pagetitle', 'defects','defect_names'],
//         valueField: 'id',
//         displayField: 'pagetitle',
//         name: 'modelservice',
//         hiddenName: 'modelservice',
//         allowBlank: false,
//         url: modRemont.config['connector_url'],
//         baseParams: {
//             action: 'mgr/service/getlist',
//             combo: true,
//             id: config.value
//         },
//         tpl: new Ext.XTemplate('\
//             <tpl for=".">\
//                 <div class="x-combo-list-item minishop2-product-list-item" ext:qtip="{pagetitle}">\
//                     <tpl if="defects">\
//                         <span class="defects">\
//                             <tpl for="defects">\
//                                 <nobr><small>{pagetitle} / </small></nobr>\
//                             </tpl>\
//                         </span><br/>\
//                     </tpl>\
//                     <span><small>({id})</small> <b>{pagetitle}</b></span>\
//                 </div>\
//             </tpl>', {compiled: true}
//         ),
//         pageSize: 5,
//         emptyText: _('yes'),
//         editable: true,
//     });
//     modRemont.combo.ModelServices.superclass.constructor.call(this, config);
// };
// Ext.extend(modRemont.combo.ModelServices, modRemont.combo.ComboBoxDefault);
// Ext.reg('modremont-combo-modelservices', modRemont.combo.ModelServices);


// modRemont.combo.ModelServices = function (config) {
//     config = config || {};

//     Ext.applyIf(config, {
//         name: 'modelservice',
//         fieldLabel: _('problems_' + config.name || 'problem'),
//         hiddenName: 'modelservice',
//         displayField: 'pagetitle',
//         valueField: 'id',
//         anchor: '99%',
//         fields: ['pagetitle', 'id'],
//         pageSize: 20,
//         url: modRemont.config['connector_url'],
//         typeAhead: true,
//         editable: true,
//         allowBlank: true,
//         emptyText: _('no'),
//         minChars: 1,
//         baseParams: {
//             action: 'mgr/service/getlist',
//             combo: true,
//             id: config.value,
//         }
//     });
//     modRemont.combo.ModelServices.superclass.constructor.call(this, config);
//     this.on('expand', function () {
//         if (!!this.pageTb) {
//             this.pageTb.show();
//         }
//     });
// };
// Ext.extend(modRemont.combo.ModelServices, MODx.combo.ComboBox);
// Ext.reg('modremont-combo-modelservices', modRemont.combo.ModelServices);