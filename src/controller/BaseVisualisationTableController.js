sap.ui.define([
    "sap/ui/demo/wt/controller/BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter"
], function(BaseController, Filter, FilterOperator, Sorter) {
    "use strict";
    return BaseController.extend("sap.ui.demo.wt.controller.BaseVisualisationTableController", {

        /******************************************************************************************************
         ******************************************************************************************************* 
         * Initializes internal variables and popup window to order
         * functions:  onInitOwnPage , _onRouteMatched, _initTableItems,  _initViewSettingsDialog, _getKeyInPath
         ****************************************************************************************************** 
         ******************************************************************************************************/
        onInitOwnPage: function(sTableID, aValidSortFields, sRouteToMatch, aValidFilterFields, sNavToDetail, sBindingContext, aEntity, sRouteToCreate) {
            this._oRouter = this.getRouter();
            this._oRouter.getRoute(this.sRouteToMatch).attachMatched(this._onRouteMatched, this);
            this._oTable = this.getView().byId(sTableID);
            this._oVSD = null;
            this._sSortField = null;
            this._bSortDescending = false;
            this._oRouterArgs = null;
            this._sSearchQuery = null;
            this.sRouteToCreate = sRouteToCreate;
            this._initViewSettingsDialog(this.sTableID + "Vsd");
        },
        _onRouteMatched: function(oEvent) {
            this._oRouterArgs = oEvent.getParameter("arguments");
            this._oRouterArgs.query = this._oRouterArgs["?query"] || {};
            this._initTableItems();
            var oModel = this.getView().getModel();
            oModel.refresh;
            this.getView().setModel(oModel);
        },
        //In case of a Detail Table depending of a master page, we build the Path and binding the Items to the table
        _initTableItems: function(){
            if (!this._oRouterArgs || !this._oRouterArgs.detailPath) {
                return;
            }
			var sIdDetailPath = this._getKeyInPath(this._oRouterArgs.detailPath);				
			var nCount = 0;
			var sPathComplement = "";
			this.aEntity.forEach(function(condition) {
                if (nCount === 0) {
                	sPathComplement = condition.text + "(" +  sIdDetailPath + ")";
                } else {
                	sPathComplement = sPathComplement + "/" + condition.text;
                }
                nCount = nCount + 1;
            });			
			var sPath = this.sBindingContext + ">/" + sPathComplement;
            var bindingInfo = this._oTable.getBindingInfo("items");
            bindingInfo.path = sPath;
            this._oTable.bindItems(bindingInfo);
        },
        //Initializes  the Dialog window to order and filter the table
        _initViewSettingsDialog: function(sNameVsd) {
            this._oVSD = new sap.m.ViewSettingsDialog(sNameVsd, {
                confirm: function(oEvent) {
                    var oSortItem = oEvent.getParameter("sortItem");
                    this._applySorter(oSortItem.getKey(), oEvent.getParameter("sortDescending"));
                }.bind(this)
            });
            var nCount = 0;
            this.aValidSortFields.forEach(function(condition) {
                if (nCount === 0) {
                    this._oVSD.addSortItem(new sap.m.ViewSettingsItem({
                        key: condition.key,
                        text: condition.text,
                        selected: true //select by default the first item in the list
                    }));
                } else {
                    this._oVSD.addSortItem(new sap.m.ViewSettingsItem({
                        key: condition.key,
                        text: condition.text,
                        selected: false
                    }));
                }
                nCount = nCount + 1;
            }.bind(this));
        },
        //Gets the key value inside a string, this value is between ()
        _getKeyInPath: function(sPath){
        	var key = 0;
          	///var key = sPath.substring(sPath.lastIndexOf("(")+1,sPath.lastIndexOf(")"));
          	var key = /^(\w+)\(([^\)]+)\)/.exec(sPath)
           	return key[2];
        },

        /******************************************************************************************************
         ******************************************************************************************************* 
         * Applies sorting on our table control.
         * functions:  onSortButtonPressed , _applySorter, _syncViewSettingsDialogSorter
         ****************************************************************************************************** 
         ******************************************************************************************************/
        onSortButtonPressed: function(oEvent) {
            this._oVSD.open();
        },
        /**
         * @param {string} sSortField	  the name of the field used for sorting
         * @param {string} sortDescending  true or false as a string or boolean value to specify a descending sorting
         * @private
         */
        _applySorter: function(sSortField, sortDescending) {
            var bSortDescending, oBinding, oSorter;
            this.aValidSortFields.forEach(function(condition) {
                // only continue if we have a valid sort field
                if (sSortField === condition.key) {
                    // convert the sort order to a boolean value
                    if (typeof sortDescending === "string") {
                        bSortDescending = sortDescending === "true";
                    } else if (typeof sortDescending === "boolean") {
                        bSortDescending = sortDescending;
                    } else {
                        bSortDescending = false;
                    }
                    // sort only if the sorter has changed
                    if (this._sSortField && this._sSortField === sSortField && this._bSortDescending === bSortDescending) {
                        return;
                    }
                    this._sSortField = sSortField;
                    this._bSortDescending = bSortDescending;
                    oSorter = new Sorter(sSortField, bSortDescending);
                    // sync with View Settings Dialog
                    this._syncViewSettingsDialogSorter(sSortField, bSortDescending);
                    oBinding = this._oTable.getBinding("items");
                    oBinding.sort(oSorter);
                }
            }.bind(this));
        },
        _syncViewSettingsDialogSorter: function(sSortField, bSortDescending) {
            // Note: no input validation is implemented here 
            this._oVSD.setSelectedSortItem(sSortField);
            this._oVSD.setSortDescending(bSortDescending);
        },

        /******************************************************************************************************
         ******************************************************************************************************* 
         * Applies searching on our table control.
         * functions:  onSearchTable , _applySearchFilter
         ****************************************************************************************************** 
         ******************************************************************************************************/
        onSearchTable: function(oEvent) {
            var sQuery = oEvent.getSource().getValue();
            this._applySearchFilter(oEvent.getSource().getValue());
        },
        _applySearchFilter: function(sSearchQuery) {
            var aFilters, oFilter, oBinding, sID;
            sID = this.sTableID + "SearchField";
            // first check if we already have this search value
            if (this._sSearchQuery === sSearchQuery) {
                return;
            }
            this._sSearchQuery = sSearchQuery;
            this.byId(sID).setValue(sSearchQuery);
            // add filters for search
            aFilters = [];
            if (sSearchQuery && sSearchQuery.length > 0) {
                this.aValidFilterFields.forEach(function(condition) {
                    aFilters.push(new Filter(condition.key, FilterOperator.Contains, sSearchQuery));
                }.bind(this));
                oFilter = new Filter({ filters: aFilters, and: false });
            } else {
                oFilter = null;
            }
            // update list binding
            oBinding = this._oTable.getBinding("items");
            oBinding.filter(oFilter, "Application");
        },

        /******************************************************************************************************
         ******************************************************************************************************* 
         * Applies General Functions
         * functions:  onItemPress
         ****************************************************************************************************** 
         ******************************************************************************************************/
        onItemPress: function(oEvent) {
            var oItem = oEvent.getParameter("listItem")
            var oRouter = this.getRouter(this);
            var bindingContext = oItem.getBindingContext(this.sBindingContext);
            var contextData = {            		
                detailPath: bindingContext.getPath().substr(1)
            };
            oRouter.navTo(this.sNavToDetail, contextData);
        }
    });
});