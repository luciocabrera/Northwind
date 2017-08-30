sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel"
], function(UIComponent, JSONModel) {
    "use strict";
    return UIComponent.extend("sap.ui.demo.wt.Component", {

        metadata: {
            manifest: "json"
        },

        init: function() {

            UIComponent.prototype.init.apply(this, arguments);
            var oModel = new JSONModel();
            oModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
            this.setModel(oModel);
            this.getRouter().initialize();

        }
    });
});