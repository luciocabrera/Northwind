/******************************************************************************************************
 ******************************************************************************************************* 
 * Creation Date:			07/28/2017
 * Last Modification Date:	08/22/2017
 * Author:					Lucio Cabrera
 * Last Modification:		Lucio Cabrera 
 * Objects dependencies: 	ProductBase - BaseVisualisationMaintenanceController - BaseVisualisationDetailController - BaseController - Controller
 * Objects that depend on:	Product.view.xml 
 ****************************************************************************************************** 
 ******************************************************************************************************/
sap.ui.define([
    "sap/ui/demo/wt/product/ProductBase"
], function(ProductBase) {
    "use strict";
    return ProductBase.extend("sap.ui.demo.wt.product.Product", {

    	onInit : function() {
    		//Routes in the manifest
    		this.sRouteToMatch = "product";
            this.sRouteToMaintenance = "productMaintenance";
            this.sRouteToList="productsOverview";
            //Model in the manifest
			this.sModel = "northwindRemote";
			//Arrays used with different purposes
			//aFields contains all the fields in the page
			//aErrorList contains the error list in case of any error when the app write in the database
			this.aFields = [];
			this.aErrorList = [];
			//Entity sets in the Odata Service
			this.sViewToMaintenance ="/at_products";
			this.sViewToDelete ="/Products";
			//Triggers the events needs to control the UI
			this.onInitOwnPage(this.sRouteToMatch, this.sModel, this.sRouteToMaintenance, this.aFields, this.aErrorList,  this.sViewToMaintenance, this.sViewToDelete, this.sRouteToList) ;
			this.onInitProductVariables("");
        },

        initFieldsArray: function(){
			
			//Assigns the fields's array to handle the validations and messages
		     this.aFields = [
		    	{ key: "ProductID", value: "", length: 0, type:"integer", isMandatory:false,  typeObject:"Text", isKey:true , itemsListPath:"", idObject:"idProductID", isUpdatable:true},
		        { key: "ProductName", value: "", length: 40, type:"string", isMandatory:true,  typeObject:"Text", isKey:false , itemsListPath:"", idObject:"idProductName", isUpdatable:true },
		        { key: "CategoryID", value: "", length: 0, type:"integer", isMandatory:true,  typeObject:"Text", isKey:false , itemsListPath:">/at_categories_list", idObject:"idProductCategory", isUpdatable:true },
		        { key: "SupplierID", value: "", length: 0, type:"integer", isMandatory:true,  typeObject:"Text", isKey:false , itemsListPath:">/at_suppliers_list", idObject:"idProductSupplierID", isUpdatable:true },
		        { key: "QuantityPerUnit", value: "", length: 20, type:"string", isMandatory:false,  typeObject:"Text", isKey:false , itemsListPath:"", idObject:"idProductQuantityPerUnit", isUpdatable:true },
		        { key: "UnitPrice", value: "", length: 0, type:"decimal", isMandatory:false,  typeObject:"Text", isKey:false , itemsListPath:"", idObject:"idProductUnitPrice", isUpdatable:true },
		        { key: "UnitsInStock", value: "", length: 0, type:"integer", isMandatory:true,  typeObject:"Text", isKey:false , itemsListPath:"", idObject:"idProductUnitsInStock", isUpdatable:true },
		        { key: "UnitsOnOrder", value: "", length: 0, type:"integer", isMandatory:false,  typeObject:"Text", isKey:false , itemsListPath:"", idObject:"idProductUnitsOnOrder", isUpdatable:true },
		        { key: "ReorderLevel", value: "", length: 0, type:"integer", isMandatory:false,  typeObject:"Text", isKey:false , itemsListPath:"", idObject:"idProductReorderLevel", isUpdatable:true },
		        { key: "Discontinued", value: "", length: 0, type:"boolean", isMandatory:false,  typeObject:"CheckBox", isKey:false , itemsListPath:"", idObject:"idCheckBoxProductDiscontinued", isUpdatable:true }
		    ];
		},		        
    
    });
});