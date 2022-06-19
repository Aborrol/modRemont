modRemont.window.ModelServiceBatch = function (config) {
  config = config || {};

  Ext.applyIf(config, {
      title: _('modremont_modelservices_batch'),
      width: 960,
      baseParams: {
      },
      modal: true,
      model_id: config.model_id,
      category_id: config.category_id,
  });
  modRemont.window.ModelServiceBatch.superclass.constructor.call(this, config);
};
Ext.extend(modRemont.window.ModelServiceBatch, modRemont.window.Default, {

  getFields: function (config) {
      return [
          {xtype: 'hidden', name: 'id'},
          {xtype: 'textfield', name: 'model_id'},
          {xtype: 'textfield', name: 'category_id'},
          
        {
            xtype: 'modremont-grid-model-service-batch',
            fieldLabel: _('modremont_services'),
            name: 'services',
            model_id: config.model_id,
            category_id: config.category_id,
        },
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
Ext.reg('modremont_modelservices_batch', modRemont.window.ModelServiceBatch);
