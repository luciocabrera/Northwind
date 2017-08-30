sap.ui.define([
    "sap/ui/demo/wt/controller/BaseVisualisationDetailController"
], function(BaseVisualisationDetailController) {
    "use strict";
    return BaseVisualisationDetailController.extend("sap.ui.demo.wt.customer.Customer", {
        onInit: function() {
            var sRouteToMatch = "customer";
            var sModel = "northwindRemote";
            var sRouteToMaintenance = "customerMaintenance";
            this.onInitOwnPage(sRouteToMatch, sModel, sRouteToMaintenance);
        }
    });
});