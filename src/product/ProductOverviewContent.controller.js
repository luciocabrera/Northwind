sap.ui.define([
    "sap/ui/demo/wt/controller/BaseVisualisationTableController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter"
], function(BaseVisualisationTableController, Filter, FilterOperator, Sorter) {
    "use strict";
    return BaseVisualisationTableController.extend("sap.ui.demo.wt.product.ProductOverviewContent", {
    	
        onInit: function() {
            this.sTableID = "productsTable";
            this.aValidSortFields = [
                { key: "ProductID", text: "Product ID" },
                { key: "ProductCategoryName", text: "Category Name" },
                { key: "ProductName", text: "Product Name" },
                { key: "QuantityPerUnit", text: "Quantity Per Unit" },
                { key: "UnitPrice", text: "Unit Price" },
                { key: "UnitsInStock", text: "Units In Stock" },
                { key: "UnitsOnOrder", text: "Units On Order" },
                { key: "ReorderLevel", text: "Reorder Level" },
                { key: "Discontinued", text: "Discontinued" }
            ];
            this.aValidFilterFields = [
            	{ key: "ProductCategoryName", text: "Category Name" },
                { key: "ProductName", text: "ProductName" }
            ];
            this.sRouteToMatch = "productsOverview";
            this.sNavToDetail = "product";
            this.sBindingContext = "northwindRemote";
            this.aEntity =[];
            this.sRouteToCreate="productCreate";
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
			 oRouter.navTo(this.sRouteToCreate, {detailPath:"Products"});
		   }
    });
});