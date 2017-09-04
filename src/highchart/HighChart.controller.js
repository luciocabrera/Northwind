sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
    "use strict";
    return Controller.extend("sap.ui.demo.wt.highchart.HighChart", {

        onInit: function() {
            var chartConfig = this._getChartConfig();
            this._viewModel = chartConfig;
            this.getView().setModel(this._viewModel, 'view');

        },

        _getChartConfig: function() {
            var charConfig = new JSONModel({
                chartConfig: {
                    chart: {
                        zoomType: 'x'
                    },
                    title: {
                        text: ""
                    },
                    xAxis: {
                        categories: []
                    }
                }
            });
            return charConfig;
        },

        onAfterRendering: function() {
            this._getData("Temperature");
        },

        _updateChartConfig: function(updatedConfig) {
            var oldConfig = this._viewModel.getProperty('/chartConfig');
            var mergedConfig = jQuery.extend({}, oldConfig, updatedConfig);
            this._viewModel.setProperty('/chartConfig', mergedConfig);
            this._viewModel.updateBindings(true);
        },

        onClickButton: function(oEvent) {
            var sViewId = this.oView.getId();
            var sControlId = oEvent.getParameters("id");
            var sPath = sControlId.id.replace(sViewId + "--", "")
            sPath = "Temperature";
            this._getData(sPath);
        },

        _getDataxxx: function(sPath) {
            var aValuesChart = [];
            var oView = this.getView();
            var oModel = oView.getModel("northwindRemote");
            oModel.read("/" + sPath, {
                success: function(oData, response) {
                    oData.results.forEach(function(condition) {
                        var dateJavaFormatted = new Date(parseInt(condition.Year), parseInt(condition.Month) - 1, parseInt(condition.Day), parseInt(condition.Hour), parseInt(condition.Minutes), parseInt(condition.Seconds), 0);
                        var oArrayItem = [Date.UTC(parseInt(condition.Year), parseInt(condition.Month) - 1, parseInt(condition.Day), parseInt(condition.Hour), parseInt(condition.Minutes), parseInt(condition.Seconds)), parseFloat(condition.AvgTemp)];
                        aValuesChart.push(oArrayItem);
                    });
                    this._onPopulateChart(aValuesChart, sPath);
                }.bind(this),
                error: function(error) {
                    console.log(error);
                }
            });
        },

        _getData: function() {
            jQuery.ajax('/system-local/public/lcabrera/MyNorthWindOnHANA/services/northwind_.xsjs/get_data_charts', {

                //            jQuery.ajax('/just/apps/smartfarming/services/geospatial-schakel.xsjs/get_data_charts?location_id=' + locationId + '&growing_id=' + growingId + '&measeure_id=' + measureId, {
                xhrFields: {
                    withCredentials: true
                },
                success: function(data) {
                    this._viewModel.setProperty("/Temperatures", data);
                }.bind(this),
                error: function() {
                    console.error("Unable to get the locations.");
                }
            });
        },

        _onPopulateChart: function(aValuesChart, sPath) {
            var oResourceBundle = this.oView.getModel("i18n").getResourceBundle();
            var sTitle = oResourceBundle.getText(("Visualisations.Charts.Title." + sPath));
            var sSubTitle = oResourceBundle.getText(("Visualisations.Charts.SubTitle"));
            var syAxisTitle = oResourceBundle.getText(("Visualisations.Charts.yAxis.Title"));
            var sSeriesName = oResourceBundle.getText(("Visualisations.Charts.SeriesName.Title." + sPath));
            var sxAxisTitle = oResourceBundle.getText(("Visualisations.Charts.xAxis.Title." + sPath));
            this._updateChartConfig({
                chart: {
                    zoomType: 'x',
                    type: 'area'
                },
                xAxis: {
                    type: 'datetime'
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    area: {
                        fillColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                                [0, Highcharts.getOptions().colors[0]],
                                [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                            ]
                        },
                        marker: {
                            radius: 2
                        },
                        lineWidth: 1,
                        states: {
                            hover: {
                                lineWidth: 1
                            }
                        },
                        threshold: null
                    }
                },
                series: [{
                    data: aValuesChart,
                    name: sSeriesName
                }],
                title: { text: sTitle },
                yAxis: {
                    title: {
                        text: syAxisTitle
                    }
                },
                subtitle: { text: sSubTitle }
            });
        }
    });
});