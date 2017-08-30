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
                        data: []
                    }]
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

        _getData: function(sPath) {
            var aValuesChart = [];
            var oView = this.getView();
            var oModel = oView.getModel("northwindRemote");
            oModel.read("/" + sPath, {
                success: function(oData, response) {
                    oData.results.forEach(function(condition) {
                        var d = new Date(parseInt(condition.Year), parseInt(condition.Month) - 1, parseInt(condition.Day), parseInt(condition.Hour), parseInt(condition.Minutes), parseInt(condition.Seconds), 0);
                        //aValuesChart.push(  { sCategory: d, sSerie:  parseFloat(condition.AvgTemp) });
                        var sss = [Date.UTC(parseInt(condition.Year), parseInt(condition.Month) - 1, parseInt(condition.Day), parseInt(condition.Hour), parseInt(condition.Minutes), parseInt(condition.Seconds)), parseFloat(condition.AvgTemp)];

                        aValuesChart.push(sss);
                    });
                    this._onPopulateChart(aValuesChart, sPath);
                }.bind(this),
                error: function(error) {
                    console.log(error);
                }
            });
        },

        _onPopulateChart: function(aValuesChart, sPath) {
            var aCategories = [];
            var aSeries = [];
            var oResourceBundle = this.oView.getModel("i18n").getResourceBundle();
            var sTitle = oResourceBundle.getText(("Visualisations.Charts.Title." + sPath));
            var sSubTitle = oResourceBundle.getText(("Visualisations.Charts.SubTitle"));
            var syAxisTitle = oResourceBundle.getText(("Visualisations.Charts.yAxis.Title"));
            var sSeriesName = oResourceBundle.getText(("Visualisations.Charts.SeriesName.Title." + sPath));
            var sxAxisTitle = oResourceBundle.getText(("Visualisations.Charts.xAxis.Title." + sPath));
            //			aValuesChart.forEach(function(condition) {
            // 	    		aCategories.push(condition.sCategory);
            // 	    		aSeries.push(condition.sSerie);
            //			});

            debugger;

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