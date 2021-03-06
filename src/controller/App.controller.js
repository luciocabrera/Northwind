sap.ui.define([
    "sap/ui/demo/wt/controller/BaseController"
], function(BaseController) {
    "use strict";

    return BaseController.extend("sap.ui.demo.wt.controller.App", {

        onOpenDialog: function(Controller) {
            this.getOwnerComponent().openDialog();
        }
    });
});