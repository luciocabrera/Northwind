sap.ui.define([
    "sap/ui/demo/wt/controller/BaseVisualisationTableController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter"
], function(BaseVisualisationTableController, Filter, FilterOperator, Sorter) {
    "use strict";
    return BaseVisualisationTableController.extend("sap.ui.demo.wt.invoice.InvoiceOverviewContent", {
        onInit: function() {
            this.sTableID = "invoicesTable";
            this.aValidSortFields = [
                { key: "OrderID", text: "Order ID" },
                { key: "CustomerName", text: "Customer Name" },
                { key: "Salesperson", text: "Sales person" },
                { key: "ProductID", text: "Product ID" },
                { key: "Product Name", text: "Product Name" },
                { key: "Unit Price", text: "Unit Price" },
                { key: "Quantity", text: "Quantity" },
                { key: "Discount", text: "Discount" },
                { key: "ExtendedPrice", text: "Extended Price" }
            ];
            this.aValidFilterFields = [
                { key: "CustomerName", text: "Customer Name" },
                { key: "Salesperson", text: "Sales person" },
                { key: "ProductName", text: "ProductName" }
            ];
            this.sRouteToMatch = "invoicesOverview";
            this.sNavToDetail = "invoice";
            this.sBindingContext = "northwindRemote";
            this.onInitOwnPage(this.sTableID, this.aValidSortFields, this.sRouteToMatch, this.aValidFilterFields, this.sNavToDetail, this.sBindingContext);
        }
    });
});