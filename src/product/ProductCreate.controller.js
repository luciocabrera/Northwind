/******************************************************************************************************
 ******************************************************************************************************* 
 * Creation Date:			08/17/2017
 * Last Modification Date:	08/22/2017
 * Author:					Lucio Cabrera
 * Last Modification:		Lucio Cabrera 
 * Objects dependencies: 	ProductBase - BaseVisualisationMaintenanceController - BaseVisualisationDetailController - BaseController - Controller
 * Objects that depend on:	ProductCreate.view.xml 
 ****************************************************************************************************** 
 ******************************************************************************************************/
sap.ui.define([
	"sap/ui/demo/wt/product/ProductBase"
], function(ProductBase) {
	"use strict";
	return ProductBase.extend("sap.ui.demo.wt.product.ProductCreate", {
	
		onInit : function() {
			//Routes in the manifest
			this.sRouteToMatch = "productCreate";
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
			this.sViewToMaintenance ="/at_productsInsert";
			this.sViewToDelete ="/Products";
			this.sViewToCreate ="/at_productsInsert";
			//Triggers the events needs to control the UI
			this.onInitOwnPage(this.sRouteToMatch, this.sModel, this.sRouteToMaintenance, this.aFields, this.aErrorList,  this.sViewToMaintenance, this.sViewToDelete,  this.sRouteToList, this.sViewToCreate) ;
			this.onInitProductVariables("Create");
			this.initCombos();
		}
	});
});