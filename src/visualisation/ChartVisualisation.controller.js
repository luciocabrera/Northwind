sap.ui.define([
	"sap/ui/demo/wt/controller/BaseController"
],  function(BaseController) {
        "use strict";
        return BaseController.extend("sap.ui.demo.wt.visualisation.ChartVisualisation", {
            onInit: function() {
                var oModel = new sap.ui.model.json.JSONModel({
                    items: [
                        { key: "pie", text: "pie" },
                        { key: "line", text: "line" },
                        { key: "xy", text: "xy" },
                        { key: "combine", text: "combi" },
                        { key: "bar", text: "bar" }
                    ],
                    selectedChartType: "line"
                });
                var oView = this.getView();
                oView.setModel(oModel, "charts");

            },
            onChange: function(oEvent) {
                var oItem, oCtx;

                oItem = oEvent.getSource();
                oCtx = oItem.getBindingContext();

                //sap.ui.getCore().byId("Key").setValue(oEvent.oSource.getSelectedKey());
                //sap.ui.getCore().byId("text").setValue(oEvent.oSource.getSelectedItemId());


                //var path = oEvent.getSource().getSelectedItem().getBindingContext().getPath(); // Fails
                //console.log("Path=" + path)

                // var oModel = sap.ui.getCore().getModel()
                // //var theName = oModel.getProperty(path)
                // console.log("You selected " + theName.lastName)
            }
       });
});