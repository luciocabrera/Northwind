sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel){
	"use strict";
	return Controller.extend("sap.ui.demo.wt.highchart.HighChart",{

		onInit: function(){
			var chartConfig = this._getChartConfig();
			this._viewModel = chartConfig;
			this.getView().setModel(this._viewModel, 'view');
	
		},
		
		_getChartConfig: function() {
			var charConfig = new JSONModel({
				chartConfig: {
					chart: {
						type: 'line'
					},
					title: {
						text: ""
					},
					xAxis: {
						categories: []
					},
					series: [{
						data: []
					}]
				}
        	});
			return charConfig;
		},
		
		onAfterRendering: function(){
			this._getData("TemperatureDay");
		},
		
		_updateChartConfig: function(updatedConfig) {
			var oldConfig = this._viewModel.getProperty('/chartConfig');
			var mergedConfig = jQuery.extend({}, oldConfig, updatedConfig);
			this._viewModel.setProperty('/chartConfig', mergedConfig);
			this._viewModel.updateBindings(true);
		},
		
		onClickButton : function (oEvent) {
			var sViewId = this.oView.getId();
			var sControlId = oEvent.getParameters("id");
			var sPath = sControlId.id.replace(sViewId+"--","")
			this._getData(sPath);
		}, 	

		_getData:  function(sPath){
			var aValuesChart = [];
    		var oView = this.getView();
			var oModel = oView.getModel("northwindRemote");
			oModel.read("/" + sPath, {
				success: function (oData, response){
		 	    	oData.results.forEach(function(condition) {
	 	    		aValuesChart.push(  { sCategory: condition.Time, sSerie:  parseFloat(condition.AvgTemp) });
		    	});
					this._onPopulateChart(aValuesChart,sPath);
				}.bind(this),
				error: function(error){
					console.log(error);
				}
		    });
		},

		_onPopulateChart: function(aValuesChart,sPath){
			var aCategories = [];
			var aSeries = [];
			var oResourceBundle = this.oView.getModel("i18n").getResourceBundle();
			var sTitle =  oResourceBundle.getText(("Visualisations.Charts.Title." + sPath));
			var sSubTitle =  oResourceBundle.getText(("Visualisations.Charts.SubTitle"));
			var syAxisTitle =  oResourceBundle.getText(("Visualisations.Charts.yAxis.Title"));
			var sSeriesName =  oResourceBundle.getText(("Visualisations.Charts.SeriesName.Title." + sPath));
			var sxAxisTitle =  oResourceBundle.getText(("Visualisations.Charts.xAxis.Title." + sPath));
			aValuesChart.forEach(function(condition) {
 	    		aCategories.push(condition.sCategory);
 	    		aSeries.push(condition.sSerie);
			});
			this._updateChartConfig({
				chart: {
					zoomType: 'x'
				},
				series: [{
					data: aSeries,
					name:	sSeriesName
				}],
				xAxis: {
					categories: aCategories,
    		        title: {
    		            text: sxAxisTitle
    		        },
    		        type: 'datetime'
				},
				title: { text: sTitle },
    		    yAxis: {
    		        title: {
    		            text: syAxisTitle
    		        }
    		    },
    		    subtitle: { text: sSubTitle}
			});
		}
	});
});