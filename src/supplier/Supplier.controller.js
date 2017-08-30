sap.ui.define([
    "sap/ui/demo/wt/supplier/SupplierBase"
], function(SupplierBase) {
    "use strict";
    return SupplierBase.extend("sap.ui.demo.wt.supplier.Supplier", {

    	onInit: function() {
    		//Routes in the manifest
    		this.sRouteToMatch = "supplier";
            this.sRouteToMaintenance = "supplierMaintenance";
            this.sRouteToList="suppliersMainOverview";
            //Model in the manifest
			this.sModel = "northwindRemote";
			//Arrays used with different purposes
			//aFields contains all the fields in the page
			//aErrorList contains the error list in case of any error when the app write in the database
			this.aFields = [];
			this.aErrorList = [];
			//Entity sets in the Odata Service
			this.sViewToMaintenance ="/Suppliers";
			this.sViewToDelete ="/Suppliers";
			//Triggers the events needs to control the UI
			this.onInitOwnPage(this.sRouteToMatch, this.sModel, this.sRouteToMaintenance, this.aFields, this.aErrorList,  this.sViewToMaintenance, this.sViewToDelete, this.sRouteToList) ;
			this.onInitProductVariables("");
        },
        _onObjectMatched: function(oEvent) {
        	SupplierBase.prototype._onObjectMatched.call(this, oEvent);
        	
        	var supplierPage = this.byId("supplierPage");
        	var pageContent = supplierPage.getContent();
        	
        	if (pageContent.length === 1) {
        		return;
        	}
        	supplierPage.removeAllContent();
        	supplierPage.addContent(pageContent[0]);
        },
		initFieldsArray: function(){
			
			//Assigns the fields's array to handle the validations and messages
		     this.aFields = [
		    	{ key: "SupplierID", value: "", length: 0, type:"integer", isMandatory:false,  typeObject:"Text", isKey:true , itemsListPath:"", idObject:"idSupplierID", isUpdatable:true},
		        { key: "CompanyName", value: "", length: 40, type:"string", isMandatory:true,  typeObject:"Text", isKey:false , itemsListPath:"", idObject:"idSupplierCompanyName", isUpdatable:true },
		        { key: "ContactName", value: "", length: 30, type:"string", isMandatory:true,  typeObject:"Text", isKey:false , itemsListPath:"", idObject:"idSupplierContactName", isUpdatable:true },
		        { key: "ContactTitle", value: "", length: 30, type:"string", isMandatory:true,  typeObject:"Text", isKey:false , itemsListPath:"", idObject:"idSupplierContactTitle", isUpdatable:true },
		        { key: "Address", value: "", length: 60, type:"string", isMandatory:true,  typeObject:"Text", isKey:false , itemsListPath:"", idObject:"idSupplierAddress", isUpdatable:true },
		        { key: "City", value: "", length: 15, type:"string", isMandatory:true,  typeObject:"Text", isKey:false , itemsListPath:"", idObject:"idSupplierCity", isUpdatable:true },
		        { key: "Region", value: "", length: 15, type:"string", isMandatory:true,  typeObject:"Text", isKey:false , itemsListPath:"", idObject:"idSupplierRegion", isUpdatable:true },
		        { key: "PostalCode", value: "", length: 10, type:"string", isMandatory:true,  typeObject:"Text", isKey:false , itemsListPath:"", idObject:"idSupplierpPostalCode", isUpdatable:true },
		        { key: "Country", value: "", length: 15, type:"string", isMandatory:true,  typeObject:"Text", isKey:false , itemsListPath:"", idObject:"idSupplierpCountry", isUpdatable:true },
		        { key: "Phone", value: "", length: 15, type:"string", isMandatory:true,  typeObject:"Text", isKey:false , itemsListPath:"", idObject:"idSupplierpPhone", isUpdatable:true },
		        { key: "Fax", value: "", length: 15, type:"string", isMandatory:true,  typeObject:"Text", isKey:false , itemsListPath:"", idObject:"idSupplierpFax", isUpdatable:true },
		        { key: "HomePage", value: "", length: 15, type:"string", isMandatory:true,  typeObject:"Text", isKey:false , itemsListPath:"", idObject:"idSupplierpHomePage", isUpdatable:true },
		        
		    ];
		}	
    });
});