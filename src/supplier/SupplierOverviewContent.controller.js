sap.ui.define([
    "sap/ui/demo/wt/controller/BaseVisualisationTableController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter"
], function(BaseVisualisationTableController, Filter, FilterOperator, Sorter) {
    "use strict";
    return BaseVisualisationTableController.extend("sap.ui.demo.wt.supplier.SupplierOverviewContent", {
        
    	onInit: function() {
            this.sTableID = "suppliersTable";
            this.aValidSortFields = [
                { key: "CompanyName", text: "Company Name" },
                { key: "ContactName", text: "Contact Name" },
                { key: "City", text: "City" },
                { key: "Country", text: "Country" }
            ];
            this.aValidFilterFields = [
                { key: "CompanyName", text: "Company Name" },
                { key: "ContactName", text: "Contact Name" },
                { key: "City", text: "City" },
                { key: "Country", text: "Country" }
                ];
            this.sRouteToMatch = "suppliersMainOverview";
            this.sNavToDetail = "supplier";
            this.sBindingContext = "northwindRemote";
            this.aEntity = [{key: 1, text:"Suppliers"}];
            this.sRouteToCreate="supplierMaintenance";
            this.onInitOwnPage(
            		this.sTableID, 
            		this.aValidSortFields, 
            		this.sRouteToMatch, 
            		this.aValidFilterFields, 
            		this.sNavToDetail, 
            		this.sBindingContext, 
            		this.aEntity,
            		this.sRouteToCreate);
        },
        
		onNewRegister: function(){
			 var oRouter = this.getRouter(this);
			 oRouter.navTo(this.sRouteToCreate, {detailPath:"Suppliers"});
		   }
    });
});