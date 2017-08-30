sap.ui.define([
	"sap/ui/demo/wt/controller/BaseController"
	], function(BaseController) {
	"use strict";
	return BaseController.extend("sap.ui.demo.wt.controller.BaseVisualisationDetailController___", {

        /******************************************************************************************************
         ******************************************************************************************************* 
         * Initializes internal variables 
         * functions:  onInitOwnPage , _onRouteMatched
         ****************************************************************************************************** 
         ******************************************************************************************************/		
		onInitOwnPage: function(sRouteToMatch, sModel, sRouteToMaintenance, aFields, aErrorList, sViewToMaintenance, sViewToDelete, sRouteToList) {
			this._sRouteToMatch = sRouteToMatch;
			this._sModel = sModel;
			this._sRouteToMaintenance = sRouteToMaintenance;
			this.sRouteToList = sRouteToList;
			this.aFields= aFields;
			this.aErrorList = aErrorList;
			this.sViewToMaintenance =sViewToMaintenance;
			this.sViewToDelete =sViewToDelete;
			var oRouter = this.getRouter(this);
			oRouter.getRoute(this._sRouteToMatch).attachPatternMatched(this._onObjectMatched, this)
			
			this.initFieldsArray();
		},
		_onObjectMatched: function(oEvent) {
			this.getView().bindElement({
				path: "/" + oEvent.getParameter("arguments").detailPath,
				model: this._sModel 
			});
		},

        /******************************************************************************************************
         ******************************************************************************************************* 
         * Applies General Functions
         * functions:  onNavToMaintenance, onNavToSupplier, _onNavToGeneral
         ****************************************************************************************************** 
         ******************************************************************************************************/		
		onNavToMaintenance: function(oEvent){
			var oRouter = this.getRouter(this);
			var oItem = oEvent.getSource();
			oRouter.navTo(this._sRouteToMaintenance, {
				detailPath: oItem.getBindingContext(this._sModel).getPath().substr(1)
			});
		},
		onNavToSupplier: function(oEvent){
			var oContainer = oEvent.getSource();
			var oCurrentObject = oContainer.getBindingContext(this._sModel).getObject();
			var supplierID = oCurrentObject.SupplierID;
			this._onNavToGeneral(oEvent, "supplier", "Suppliers", supplierID);
		},
		onNavToSupplierProducts: function(oEvent){
			var oContainer = oEvent.getSource();
			var sCurrentDetailPath = oContainer.getBindingContext(this._sModel).getPath().substr(1);
			var sIdDetailPath = sCurrentDetailPath.substring(sCurrentDetailPath.lastIndexOf("(")+1,sCurrentDetailPath.lastIndexOf(")"));
			this._onNavToGeneral(oEvent, "supplierProducts", "Suppliers", sIdDetailPath);
		},
		_onNavToGeneral: function(oEvent, sRouteToNav, sPrefixDetailPath, sID){
			var oRouter = this.getRouter(this);
			var sNewDetailPath = sPrefixDetailPath + "(" + sID + ")";
			oRouter.navTo(sRouteToNav, {
				detailPath: sNewDetailPath
			});
		}
	});
});