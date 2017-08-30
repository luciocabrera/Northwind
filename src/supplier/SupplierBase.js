/******************************************************************************************************
 ******************************************************************************************************* 
 * Creation Date:			08/23/2017
 * Last Modification Date:	08/23/2017
 * Author:					Lucio Cabrera
 * Last Modification:		Lucio Cabrera 
 * Objects dependencies: 	BaseVisualisationMaintenanceController - BaseVisualisationDetailController - BaseController - Controller
 * Objects that depend on:	SupplierMaintenance - SupplierCreate - Suplier
 ****************************************************************************************************** 
 ******************************************************************************************************/
sap.ui.define([
	"sap/ui/demo/wt/controller/BaseVisualisationMaintenanceController"
], function(BaseVisualisationMaintenanceController) {
	"use strict";
	return BaseVisualisationMaintenanceController.extend("sap.ui.demo.wt.supplier.SupplierBase", {
		
		//Sets the variable suffix to be used to identify the controls by ID
		 onInitProductVariables: function(sSufix){
			this.initFieldsArray();
			this.sSufix = sSufix;
		 },
		
		//Validates the fields in the page and takes the necessary actions after that
		validatePage : function(oEvent) {
		
			this.setFieldsArray();
			var isValid = true;			
		    //Gets the validate record's valid state
		    isValid = this.onValidateFields();
			
		    //Call the update function is the record is a valid one
			if (isValid === true) {
				var oModel = this.submitChanges(this.sViewToMaintenance);
				//this.submitChanges(updateObject,this.sViewToMaintenance);
			}else{
				this._onErrorUpdateDialog();
			}
			return oModel;
		},
		
		initFieldsArray: function(){
			
			//Assigns the fields's array to handle the validations and messages
		     this.aFields = [
		    	{ key: "SupplierID", value: "", length: 0, type:"integer", isMandatory:false,  typeObject:"Input", isKey:true , itemsListPath:"", idObject:"idSupplierID", isUpdatable:true},
		        { key: "CompanyName", value: "", length: 40, type:"string", isMandatory:true,  typeObject:"Input", isKey:false , itemsListPath:"", idObject:"idSupplierCompanyName", isUpdatable:true },
		        { key: "ContactName", value: "", length: 30, type:"string", isMandatory:true,  typeObject:"Input", isKey:false , itemsListPath:"", idObject:"idSupplierContactName", isUpdatable:true },
		        { key: "ContactTitle", value: "", length: 30, type:"string", isMandatory:false,  typeObject:"Input", isKey:false , itemsListPath:"", idObject:"idSupplierContactTitle", isUpdatable:true },
		        { key: "Address", value: "", length: 60, type:"string", isMandatory:false,  typeObject:"Input", isKey:false , itemsListPath:"", idObject:"idSupplierAddress", isUpdatable:true },
		        { key: "City", value: "", length: 15, type:"string", isMandatory:false,  typeObject:"Input", isKey:false , itemsListPath:"", idObject:"idSupplierCity", isUpdatable:true },
		        { key: "Region", value: "", length: 15, type:"string", isMandatory:false,  typeObject:"Input", isKey:false , itemsListPath:"", idObject:"idSupplierRegion", isUpdatable:true },
		        { key: "PostalCode", value: "", length: 10, type:"string", isMandatory:false,  typeObject:"Input", isKey:false , itemsListPath:"", idObject:"idSupplierpPostalCode", isUpdatable:true },
		        { key: "Country", value: "", length: 15, type:"string", isMandatory:false,  typeObject:"Input", isKey:false , itemsListPath:"", idObject:"idSupplierpCountry", isUpdatable:true },
		        { key: "Phone", value: "", length: 15, type:"string", isMandatory:false,  typeObject:"Input", isKey:false , itemsListPath:"", idObject:"idSupplierpPhone", isUpdatable:true },
		        { key: "Fax", value: "", length: 15, type:"string", isMandatory:false,  typeObject:"Input", isKey:false , itemsListPath:"", idObject:"idSupplierpFax", isUpdatable:true },
		        { key: "HomePage", value: "", length: 15, type:"url", isMandatory:false,  typeObject:"Input", isKey:false , itemsListPath:"", idObject:"idSupplierpHomePage", isUpdatable:true },
		        
		    ];
		}	
		
	});
});