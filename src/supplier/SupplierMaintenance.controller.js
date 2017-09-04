/******************************************************************************************************
 ******************************************************************************************************* 
 * Creation Date:			08/23/2017
 * Last Modification Date:	08/23/2017
 * Author:					Lucio Cabrera
 * Last Modification:		Lucio Cabrera 
 * Objects dependencies: 	SupplierBase - BaseVisualisationMaintenanceController -  BaseController - Controller
 * Objects that depend on:	ProductMaintenance.view.xml 
 ****************************************************************************************************** 
 ******************************************************************************************************/
sap.ui.define([
	"sap/ui/demo/wt/supplier/SupplierBase"
], function(SupplierBase) {
	"use strict";
	return SupplierBase.extend("sap.ui.demo.wt.supplier.SupplierMaintenance", {
	
		onInit : function() {
			//Routes in the manifest
			this.sRouteToMatch = "supplierMaintenance";
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
			this.sViewToCreate ="/suppliersInsert";
			//Triggers the events needs to control the UI
			this.onInitOwnPage(this.sRouteToMatch, this.sModel, this.sRouteToMaintenance, this.aFields, this.aErrorList,  this.sViewToMaintenance, this.sViewToDelete, this.sRouteToList, this.sViewToCreate) ;
			this.onInitProductVariables("Edit");
			this.initCombos();
		}
	});
});