sap.ui.define([
    "sap/ui/demo/wt/controller/BaseVisualisationDetailController"
], function(BaseVisualisationDetailController) {
    "use strict";
    return BaseVisualisationDetailController.extend("sap.ui.demo.wt.controller.Invoice", {
        onInit: function() {
            var sRouteToMatch = "invoice";
            var sModel = "northwindRemote";
            this.onInitOwnPage(sRouteToMatch, sModel);
        }
    });
});