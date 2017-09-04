/******************************************************************************************************
 ******************************************************************************************************* 
 * Creation Date:			08/17/2017
 * Last Modification Date:	08/21/2017
 * Author:					Lucio Cabrera
 * Last Modification:		Lucio Cabrera 
 * Objects dependencies: 	BaseVisualisationMaintenanceController - BaseVisualisationDetailController - BaseController - Controller
 * Objects that depend on:	ProductMaintenance - ProductCreate - Product
 ****************************************************************************************************** 
 ******************************************************************************************************/
sap.ui.define([
	"sap/ui/demo/wt/controller/BaseVisualisationMaintenanceController"
], function(BaseVisualisationMaintenanceController) {
	"use strict";
	return BaseVisualisationMaintenanceController.extend("sap.ui.demo.wt.product.ProductBase", {
		
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
		    	{ key: "ProductID", value: "", length: 0, type:"integer", isMandatory:false,  typeObject:"Input", isKey:true , itemsListPath:"", idObject:"idProductID", isUpdatable:true},
		        { key: "ProductName", value: "", length: 40, type:"string", isMandatory:true,  typeObject:"Input", isKey:false , itemsListPath:"", idObject:"idProductName", isUpdatable:true },
		        { key: "CategoryID", value: "", length: 0, type:"integer", isMandatory:true,  typeObject:"ComboBox", isKey:false , itemsListPath:">/at_categories_list", idObject:"idProductCategory", isUpdatable:true },
		        { key: "SupplierID", value: "", length: 0, type:"integer", isMandatory:true,  typeObject:"ComboBox", isKey:false , itemsListPath:">/at_suppliers_list", idObject:"idProductSupplierID", isUpdatable:true },
		        { key: "QuantityPerUnit", value: "", length: 20, type:"string", isMandatory:false,  typeObject:"Input", isKey:false , itemsListPath:"", idObject:"idProductQuantityPerUnit", isUpdatable:true },
		        { key: "UnitPrice", value: "", length: 0, type:"decimal", isMandatory:false,  typeObject:"Input", isKey:false , itemsListPath:"", idObject:"idProductUnitPrice", isUpdatable:true },
		        { key: "UnitsInStock", value: "", length: 0, type:"integer", isMandatory:true,  typeObject:"Input", isKey:false , itemsListPath:"", idObject:"idProductUnitsInStock", isUpdatable:true },
		        { key: "UnitsOnOrder", value: "", length: 0, type:"integer", isMandatory:false,  typeObject:"Input", isKey:false , itemsListPath:"", idObject:"idProductUnitsOnOrder", isUpdatable:true },
		        { key: "ReorderLevel", value: "", length: 0, type:"integer", isMandatory:false,  typeObject:"Input", isKey:false , itemsListPath:"", idObject:"idProductReorderLevel", isUpdatable:true },
		        { key: "Discontinued", value: "", length: 0, type:"boolean", isMandatory:false,  typeObject:"CheckBox", isKey:false , itemsListPath:"", idObject:"idCheckBoxProductDiscontinued", isUpdatable:true }
		    ];
		}	
		
	});
});