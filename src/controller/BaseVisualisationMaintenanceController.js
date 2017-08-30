/******************************************************************************************************
 ******************************************************************************************************* 
 * Creation Date:			08/07/2017
 * Last Modification Date:	08/24/2017
 * Author:					Lucio Cabrera
 * Last Modification:		Lucio Cabrera 
 * Objects dependencies: 	BaseController - Controller
 * Objects that depend on:	ProductBase, SupplierBase, CustomerBase
 ****************************************************************************************************** 
 ******************************************************************************************************/
sap.ui.define([
	"sap/ui/demo/wt/controller/BaseController",
	"sap/ui/commons/RichTooltip",
	"sap/m/MessageBox"
], function(BaseController, RichTooltip, MessageBox) {
	"use strict";
	return BaseController.extend("sap.ui.demo.wt.product.BaseVisualisationMaintenanceController",{

        /******************************************************************************************************
         ******************************************************************************************************* 
         * Initializes variables needed
         * functions:  onInitOwnPage, setFieldsArray
         *  _onRouteMatched
         ****************************************************************************************************** 
         ******************************************************************************************************/	
		
		onInitOwnPage: function(sRouteToMatch, sModel, sRouteToMaintenance, aFields, aErrorList, sViewToMaintenance, sViewToDelete, sRouteToList, sViewToCreate) {

			this._sRouteToMatch = sRouteToMatch;
			this._sModel = sModel;
			this._sRouteToMaintenance = sRouteToMaintenance;
			this.sRouteToList = sRouteToList;
			this.aFields= aFields;
			this.aErrorList = aErrorList;
			this.sViewToMaintenance = sViewToMaintenance;
			this.sViewToDelete = sViewToDelete;
			this.sViewToCreate = sViewToCreate
			var oRouter = this.getRouter(this);
			oRouter.getRoute(this._sRouteToMatch).attachPatternMatched(this._onObjectMatched, this)
			
		},

		_onObjectMatched: function(oEvent) {

			this.getView().bindElement({
				path: "/" + oEvent.getParameter("arguments").detailPath,
				model: this._sModel 
			});
			
		},

		//Goes through the Fields's array and sets the values 
	    setFieldsArray: function(){
		
			this.aFields.forEach(function(condition) {
				if (condition.idObject != "" ){
					switch (condition.typeObject){
						case "Input":
							condition.value =  this.getView().byId(condition.idObject + this.sSufix).getValue();
							break;
						case "ComboBox":
							condition.value =  this.getView().byId(condition.idObject + this.sSufix).getSelectedKey();
							break;
						case "CheckBox":
							condition.value =  this.getView().byId(condition.idObject + this.sSufix).getSelected();
							break;
						case "TextBox":
						case "Text":
							condition.value =  this.getView().byId(condition.idObject + this.sSufix).getText();
							break;
					}
				}
			}.bind(this));
		
		},
		
        /******************************************************************************************************
         ******************************************************************************************************* 
         * Handles the onLive changes of the fields in the Maintenance pages and handles all linked to the  tooltiptext 
         * functions:  onLiveChangeInteger , onLiveChangeDecimal, onLiveChangeString, 
         *  _setToolTipInput, _onLiveChange
         ****************************************************************************************************** 
         ******************************************************************************************************/
		
		//Sets the variables needed to Validate the Integer values and calls  the function to do it 
		onLiveChangeInteger : function(oEvent) {
			
			var regex = /^[0-9]*$/;
			var sHtmlText =  "Messsages.Validations.Integer.sHtml";
			var sValueStateText =  "Messsages.Validations.Integer.sValueState";
			
			this._onLiveChangeNumeric(oEvent, regex, sHtmlText, sValueStateText);
			
		},
		
		//Validates the String values using the "liveChange" in the Input Box in the xml View
		onLiveChangeString : function(oEvent){
			
			var oContainer = oEvent.getSource();
			var valueField = oEvent.getParameter("value");
			var maxLengthField = oContainer.getProperty("maxLength");
			var isValid = true;
			var sHtml =  "";
			var sValueState =  "";
			var oValueState= sap.ui.core.ValueState.Success;
			
			if(valueField.length > maxLengthField ){
				isValid = false;
			} 
			if(!isValid){
				oValueState= sap.ui.core.ValueState.Error;
				sHtml = this.oView.getModel("i18n").getResourceBundle().getText("Messsages.Validations.String.sHtml");
				sValueState =  this.oView.getModel("i18n").getResourceBundle().getText("Messsages.Validations.String.sValueState");
			}
			this._setToolTipInput(oContainer, sHtml, sValueState, oValueState);

		},
		
		//Sets the variables needed to Validate the URL values and calls  the function to do it 
		onChangeUrlField: function(oEvent){
			
            var regex  =/^(?:((?:https?|ftp):\/\/)|([w|W]{3}\.))(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
			var sHtmlText = "Messsages.Validations.Url.sHtml";
			var sValueStateText =  "Messsages.Validations.Url.sValueState";

			this._onLiveChangeString(oEvent, regex, sHtmlText, sValueStateText);
			
		},
		
		//Sets the variables needed to Validate the Decimal values and calls  the function to do it 
		onLiveChangeDecimal : function(oEvent) {
			
			var regex = /^[0-9.]*$/;
			var sHtmlText = "Messsages.Validations.Decimal.sHtml";
			var sValueStateText =  "Messsages.Validations.Decimal.sValueState";

			this._onLiveChangeNumeric(oEvent, regex, sHtmlText, sValueStateText);

		},

		/*Validates the Decimal and integer values using the "liveChange" in the Input Box in the xml View 
		and calls the function to set the tooltiptext */
		_onLiveChangeNumeric : function(oEvent, regex, sHtmlText, sValueStateText) {
			
			var valueField = oEvent.getParameter("value");
			var valueFieldExtracted = regex.exec(valueField);
			var oContainer = oEvent.getSource();
			var sHtml = "";
			var sValueState =  "";
			var oValueState = sap.ui.core.ValueState.Success;
			var isValid = this._validateNumeric(valueFieldExtracted);
			
			if (!isValid) {
				oValueState= sap.ui.core.ValueState.Error;
				sHtml =  this.oView.getModel("i18n").getResourceBundle().getText(sHtmlText);
				sValueState =  this.oView.getModel("i18n").getResourceBundle().getText(sValueStateText);
			}
			
			this._setToolTipInput(oContainer, sHtml, sValueState, oValueState);
		},

		/*Validates the Strings values using the "Change" in the Input Box in the xml View 
		and calls the function to set the tooltiptext */
		_onLiveChangeString : function(oEvent, regex, sHtmlText, sValueStateText) {
			
			var oContainer = oEvent.getSource();
			var valueField = oEvent.getParameter("value");
			var maxLengthField = oContainer.getProperty("maxLength");
			var sHtml = "";
			var sValueState =  "";
			var isValid = true;
			var oValueState= sap.ui.core.ValueState.Success;

			if (valueField.length>0) {
				isValid = this._validStringRegex(valueField, regex);				
			}
			if(valueField.length > maxLengthField ){
				isValid = false;
			}
			if(!isValid){
				oValueState= sap.ui.core.ValueState.Error;
				sHtml =  this.oView.getModel("i18n").getResourceBundle().getText(sHtmlText);
				sValueState =  this.oView.getModel("i18n").getResourceBundle().getText(sValueStateText);
			}
			this._setToolTipInput(oContainer, sHtml, sValueState, oValueState);
			
		},		
		
		//Sets the ToolTipText in the Input Box 
		_setToolTipInput : function(oContainer, sHtml, sValueState, oValueState) {
			
			oContainer.setValueState(oValueState);
			var oRttTextField = new sap.ui.commons.RichTooltip({
				text : sHtml,
				valueStateText : sValueState
			});
			oContainer.setTooltip(oRttTextField);
		},

        /******************************************************************************************************
         ******************************************************************************************************* 
         * Handles the operations with the model
         * functions:  submitChanges , onDeleteRecord, onSaveRecord, 
         *  _refreshModel
         ****************************************************************************************************** 
         ******************************************************************************************************/
		//Submits the changes to the Data Model
		submitChanges: function(sPath){
	    	
    		var oView = this.getView();
			var oModel = oView.getModel(this.sModel);
			var oObjectToSubmit = this._getObjectToSubmit();
			var keyField = this._getFieldKey();
			if ((keyField === 0) || (keyField === "")){
				sPath = this.sViewToCreate ;				
			}
			oModel.refresh();
		//	oModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
			oModel.createEntry(sPath, { properties: oObjectToSubmit });
			oModel.submitChanges({
				success: function(){
				//	oModel.refresh();
				//	oView.setModel(oModel);
					this.onNavToList(this.sRouteToList);
					this._onSuccessUpdateDialog();
				}.bind(this) , 
				error: function(){this._onErrorUpdateDialog();}.bind(this)
				});	

//			oModel.refresh();
//			oView.setModel(oModel);
//this.onNavToList(this.sRouteToList);			
			return oModel;
			
	    },
	    
		//Handles the deletion action
		onDeleteRecord: function(){
			
			var keyField = this._getFieldKey();
			var sPath = this.sViewToDelete + "(" + keyField + ")";
    		var oView = this.getView();
			var oModel = oView.getModel(this.sModel);
	
			
			try {
						oModel.remove(sPath, {
								success: function(){
								//oModel.updateBindings();
								//oModel.refresh();
								//oView.setModel(oModel);
								this.onNavToList(this.sRouteToList);
								this._onSuccessDeleteDialog();
							}.bind(this),
							function(){
								alert("Delete failed");}
						});	
			}
			catch(e){
				debugger;
			}


		//	this.onNavToList(this.sRouteToList);
		//	oModel.submitChanges();
			//oModel.refresh();
		//	oView.setModel(oModel);

		},

		//Handles the saved action
    	onSaveRecord: function(oEvent) {
    		   
    		var oModel = this.validatePage(oEvent);

    	},

        _refreshModel: function() {
			var oView =  this.getView();
			var oModel =  oView.getModel();
			
			oModel.refresh(true);
			oView.setModel(oModel);

        },

        /******************************************************************************************************
         ******************************************************************************************************* 
         * Handles operations likely messages, getting objects and others
         * functions:  initCombos
         *  _initComboItems, _addErrorToArray, _onSuccessUpdateDialog, _onSuccessDeleteDialog, _onErrorUpdateDialog
         *  _getFieldKey, _getCombos, _getObjectToSubmit
         ****************************************************************************************************** 
         ******************************************************************************************************/	
        //Bindings the Items to the ComboBox
        _initComboItems: function(sPath, oCombo){

        	var bindingInfo = oCombo.getBindingInfo("items");
        	
            bindingInfo.path = sPath;
            bindingInfo.templateShareable =true;
            oCombo.bindItems(bindingInfo);	
            
        },
        
        //Gets an combo's array and calls the function to initiate the items
        initCombos: function(){
        	
        	var aCombos = this._getCombos();
        	
			aCombos.forEach(function(condition) {
					this._initComboItems(condition.sPath , condition.oCombo);
	            }.bind(this));	
			
        },
        //Adds to the error array a new error
        _addErrorToArray: function(sErrorKey, sErrorDesc){
 
        	this.aErrorList.push({ key: sErrorKey, description: sErrorDesc });
       	
        },
        
        //Displays a message box when the update operation success
		_onSuccessUpdateDialog: function() {
 
		    sap.m.MessageBox.success(this.oView.getModel("i18n").getResourceBundle().getText("Messsages.Actions.Update.Product.success"));

		},

        //Displays a message box when the delete operation success
		_onSuccessDeleteDialog: function() {
 
		    sap.m.MessageBox.success("record deleted");

		},		
		
		//Displays a message box when the update operation has an error
	    _onErrorUpdateDialog: function() {
	    	
	    	var sMessage =  this.oView.getModel("i18n").getResourceBundle().getText("Messsages.Actions.Update.Product.failed");
	    	var sTitle =  this.oView.getModel("i18n").getResourceBundle().getText("Messsages.Actions.Update.Product.failed.title");
	    	var Icon = MessageBox.Icon.ERROR;
	    	var htmlDetails = "<ul>";
	    	var aActions = [sap.m.MessageBox.Action.OK];
	    	var oDefaultAction = sap.m.MessageBox.Action.OK;
	    	
	    	this.aErrorList.forEach(function(condition) {
	    		htmlDetails = htmlDetails + "<li>" + condition.description  +  "</li>"
	    	});
	    	htmlDetails = htmlDetails + "</ul>"
	    	this.showMessageBox(sTitle, Icon, htmlDetails, sMessage,  aActions, oDefaultAction);
	    	
	    },
	    
	    //Goes through the Fields's array and gets the value settled as a key 
	    _getFieldKey: function(){
	    	
	    	var key = 0;
	    	
	    	this.aFields.forEach(function(condition) {
	    		if (condition.isKey === true){
					switch (condition.typeObject){
					case "Input":
						key =  this.getView().byId(condition.idObject + this.sSufix).getValue();
						break;
					case "ComboBox":
						key =  this.getView().byId(condition.idObject + this.sSufix).getSelectedKey();
						break;
					case "CheckBox":
						key =  this.getView().byId(condition.idObject + this.sSufix).getSelected();
						break;
					case "Text":
					case "TextBox":
						key =  this.getView().byId(condition.idObject + this.sSufix).getText();
						break;
				}
	    		}
	    	}.bind(this));
	    	return key;
	    	
	    },
	    
	  //Goes through the Fields's array, pushs the combos in a combo's array and returns it
	    _getCombos: function(){
	    	
		    var aCombos = [];
 	    	this.aFields.forEach(function(condition) {
	    		if (condition.typeObject === "ComboBox"){
	    			aCombos.push(  { sPath: (this.sModel + condition.itemsListPath), oCombo: ((this.byId(condition.idObject + this.sSufix))) });
	    		}
	    	}.bind(this));
	    	return aCombos;
	    	
	    },
	    
	  //Goes through the Fields's array and returns an object to be submitted to the database
	    _getObjectToSubmit: function(){
	    	
		    var oToSubmit = {};
			    
 	    	this.aFields.forEach(function(condition) {
 	    		if (condition.isUpdatable = true){
 	 	    		oToSubmit[condition.key] = condition.value ; 	    			
 	    		}
	    	}.bind(this));
	    	return oToSubmit;
	    	
	    },
        
    /******************************************************************************************************
     ******************************************************************************************************* 
     * Handles the General validations
     * functions:  onValidateFields
     *  _validateNumeric, _validUrl
     ****************************************************************************************************** 
     ******************************************************************************************************/	        
     //Returns a boolean that indicate if the value is a valid number
		_validateNumeric: function(valueToEvaluate){
			
			var isValid = false;
			
			if (valueToEvaluate) {
				if ( !$.isNumeric(valueToEvaluate.input) ) {
					isValid = false;
				} else {
					
					isValid = true;
				}
			} else {
				isValid = false;
			}
			
			return isValid;
			
		},
		
      //Goes through the Fields's array and validates the values based in their type
        onValidateFields: function(){
        	
        	var isValid = true;
        	var sErrorDescriptor = this.oView.getModel("i18n").getResourceBundle().getText("Messsages.Validations.ErrorDescriptor");
        	var sErrorDescriptorComplementMissing = this.oView.getModel("i18n").getResourceBundle().getText("Messsages.Validations.ErrorDescriptorComplementMissing");
        	var sErrorDescriptorComplementWrong = this.oView.getModel("i18n").getResourceBundle().getText("Messsages.Validations.ErrorDescriptorComplementWrong");
        	
			this.aFields.forEach(function(condition) {
				if (condition.type != "boolean"){
					if (!condition.value){
						condition.value = "";
					}else{
						condition.value = condition.value.trim();
					}					
				}
				switch (condition.type)
					{
					case "boolean":
						if (condition.value) {
							condition.value = "1";
						}else{
							condition.value = "0";
						}
						break;
					case "string":
							if (condition.value.length > condition.length) {
								isValid = false;
								this._addErrorToArray(condition.key, (sErrorDescriptorComplementWrong +  condition.value + sErrorDescriptor + condition.key));
							}
							break;
						case "integer":
							condition.value = condition.value.replace(/,/g, "");
							if  (condition.value === "" ){
								condition.value=0;
							}
							if (!$.isNumeric(condition.value)) {
								isValid = false;
								this._addErrorToArray(condition.key, (sErrorDescriptorComplementWrong +  condition.value + sErrorDescriptor + condition.key));
							}else{
								condition.value = parseInt(condition.value);
							}
							break;
						case "decimal":
							condition.value = condition.value.replace(/,/g, "");
							if (condition.value === "" ){
								condition.value="0";
							}
							if (!$.isNumeric(condition.value)) {
								isValid = false;
								this._addErrorToArray(condition.key, (sErrorDescriptorComplementWrong +  condition.value + sErrorDescriptor + condition.key));
							}
							break;
							
						case "url":
							
							var isUrlValid = true;
							if (condition.value.length>0){
								isUrlValid = this._validUrl(condition.value);
							}
							if  (isUrlValid === false) {
								isValid = false;
								this._addErrorToArray(condition.key, (sErrorDescriptorComplementWrong +  condition.value + sErrorDescriptor + condition.key));
							}
							break;
					}
				if ((condition.isMandatory === true ) && (condition.value === "" ) && (condition.type === "string")){
					isValid = false;
					this._addErrorToArray(condition.key, (sErrorDescriptorComplementMissing  + sErrorDescriptor + condition.key));
				}
				if ((condition.isMandatory === true ) && (condition.value === 0 ) && ((condition.type === "integer") || (condition.type === "decimal"))){
					isValid = false;
					this._addErrorToArray(condition.key, (sErrorDescriptorComplementMissing  + sErrorDescriptor + condition.key));
				}
			}.bind(this));		
			return isValid;
			
        },
        
        //Validates if it is a valid URL using a regular expression
        _validUrl: function (url) {
           
            var regex  =/^(?:((?:https?|ftp):\/\/)|([w|W]{3}\.))(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
            var isValid = isValid = this._validStringRegex(url, regex);;
            
            return isValid; 
            
        },
        
        _validEmail: function (email) {
        	
        	var myRex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+[^<>()\.,;:\s@\"]{2,})$/;
        	var myRex = /^[^\s@]+@[^\s@]+\./ ;
        	var  isValid = true;
        	
            if (!myRex.test(email)) {
            	isValid = false;
            } 
            return isValid; 
        },
        
        _looksLikeMail: function (str) {
            var lastAtPos = str.lastIndexOf('@');
            var lastDotPos = str.lastIndexOf('.');
            return (lastAtPos < lastDotPos && lastAtPos > 0 && str.indexOf('@@') == -1 && lastDotPos > 2 && (str.length - lastDotPos) > 2);
        },
        
        _validStringRegex: function(str, regex){
        	
        	var  isValid = true;
        	
            if (!regex.test(str)) {
            	isValid = false;
            } 
            return isValid; 
        },        
       
	});
});