sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/MessageBox"
], function(Controller, History, MessageBox) {
    "use strict";
    return Controller.extend("sap.ui.demo.wt.controller.BaseController", {
    	
    	
        getRouter: function() {
            return sap.ui.core.UIComponent.getRouterFor(this);
        },
        
        onNavBack: function(oEvent) {
        	
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();
            
            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                this.getRouter().navTo("appHome", {}, true /*no history*/ );
            }
        },
        
        onNavToCustomersList: function(oEvent) {
            this.getRouter().navTo("customersOverview");
        },
        
        onNavToSuppliersList: function(oEvent) {
            this.getRouter().navTo("suppliersMainOverview");
        },
 
        onNavToProductsList: function(oEvent) {
            this.getRouter().navTo("productsOverview");
        },

        onNavToInvoicesList: function(oEvent) {
            this.getRouter().navTo("invoicesList");
        },
        onNavToList: function(sRouteToList) {
    		var oView = this.getView();
			var oModel = oView.getModel(this.sModel);
			try{
				oModel.submitChanges();
				oModel.refresh(true);
				oView.setModel(oModel);				
			}
			catch(e){
				debugger;
			}

            this.getRouter().navTo(sRouteToList);
        },

        onNavToInvoicesOverview: function(oEvent) {
            this.getRouter().navTo("invoicesOverview");
        },
	    
        showMessageBox: function(sTitle, Icon, htmlDetails, sMessage, aActions, oDefaultAction) {
	    	
	    	var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
	    	
			sap.m.MessageBox.show(sMessage, {
				icon: Icon,
				title: sTitle,
				actions: aActions,
				id: "messageBoxId",
				defaultAction: oDefaultAction,
				details: htmlDetails,
				styleClass: bCompact ? "sapUiSizeCompact" : "",
				contentWidth: "150px"
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
		},
		
		onNavHighChart: function(){
			this.getRouter().navTo("highChart");
		},
		onNavHighChart2: function(){
			this.getRouter().navTo("highChart2");
		}
    });
});