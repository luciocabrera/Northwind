sap.ui.define([
    "sap/ui/demo/wt/controller/BaseVisualisationTableController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter"
], function(BaseVisualisationTableController, Filter, FilterOperator, Sorter) {
    "use strict";
    return BaseVisualisationTableController.extend("sap.ui.demo.wt.customer.CustomerOverviewContent", {
        onInit: function() {
            this.sTableID = "customersTable";
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
            this.sRouteToMatch = "customersOverview";
            this.sNavToDetail = "customer";
            this.sBindingContext = "northwindRemote";
            this.onInitOwnPage(this.sTableID, this.aValidSortFields, this.sRouteToMatch, this.aValidFilterFields, this.sNavToDetail, this.sBindingContext);
        }
    });
});