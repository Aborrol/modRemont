// Подключаем первым способом
Ext.override(MODx.panel.Resource, {
    modRemontOriginals: {
        getFields: MODx.panel.Resource.prototype.getFields,
    },

    getFields: function (config) {
        var fields = this.modRemontOriginals.getFields.call(this, config);
        fields.filter(function (row) {
            if (row.id === 'modx-resource-tabs') {
                // Пушим таб в массив с другими табами
                row.items.push({
                    id: 'modremont-resource-tab',
                    title: _('modremont_models'),
                    layout: 'anchor',
                    items: [{
                        xtype: "modremont-grid-models",
                        width: "95%",
                        style: {
                            margin: '20px'
                        }
                    }],
                });
            }
        });

        return fields;
    },
});

// Подключаем вторым способом, если первым не получилось
Ext.ComponentMgr.onAvailable('modx-resource-tabs', function () {
    var tabs = this;
    tabs.on('beforerender', function () {
        // Проверяем, удался ли первый способ
        var is = tabs.items.items.filter(function (row) {
            return (row.id === 'modremont-resource-tab' || row.id === 'modremont-grid-models');
        });

        // Первый способ не удался
        if (is.length === 0) {
            // Добавляем таб нативными средствами
            tabs.add({
                id: 'modremont-resource-tab',
                title: _('modremont_models'),
                layout: 'anchor',
                items: [{
                    xtype: "modremont-grid-models",
                    width: "95%",
                }],
            });
        }
    });
});