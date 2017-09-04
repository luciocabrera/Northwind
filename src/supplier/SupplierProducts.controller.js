sap.ui.define([
    "sap/ui/demo/wt/controller/BaseVisualisationTableController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter",
    "sap/ui/model/json/JSONModel",
    "sap/ui/table/Table",
    "sap/ui/commons/Label"
], function(BaseVisualisationTableController, Filter, FilterOperator, Sorter, JSONModel, Table, Label) {
    "use strict";
    return BaseVisualisationTableController.extend("sap.ui.demo.wt.supplier.SupplierProducts", {
    	onInit: function() {
            this.sTableID = "supplierProductsTable";
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
            this.sRouteToMatch = "supplierProducts";
            this.sNavToDetail = "product";
            this.sBindingContext = "northwindRemote";
            this.aEntity = [
            	{key: 1, text:"Suppliers"},
            	{key: 2, text: "SuppliersViewProducts"}
            ];
            this.sRouteToCreate="supplierCreate";
            this.onInitOwnPage(
            		this.sTableID, 
            		this.aValidSortFields, 
            		this.sRouteToMatch, 
            		this.aValidFilterFields, 
            		this.sNavToDetail, 
            		this.sBindingContext, 
            		this.aEntity,
            		this.sRouteToCreate);
        }        
    });
});