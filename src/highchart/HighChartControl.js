sap.ui.define([
    "sap/ui/core/Control",
    "sap/ui/demo/wt/node_modules/highcharts/highcharts"
], function(Control, highcharts) {
    "use strict";

    var control = Control.extend("sap.ui.demo.wt.highchart.HighChartControl", {
        metadata: {
            properties: {
                width: {
                    type: "sap.ui.core.CSSSize",
                    defaultValue: "100%"
                },
                height: {
                    type: "sap.ui.core.CSSSize",
                    defaultValue: "100%"
                },
                config: {
                    type: "object",
                    defaultValue: {}
                }
            }
        },

        isInitialized: false,

        renderer: function(oRm, oControl) {
            oRm.write('<div id="' + oControl.sId + '"');
            oRm.writeClasses();
            oRm.addStyle('width', oControl.getWidth());
            oRm.addStyle('height', oControl.getHeight());
            oRm.writeStyles();
            oRm.write(" >");
            oRm.write("</div>");
        },

        setConfig: function(config) {
            var timeout = 0;
            if (!this.isInitialized) {
                timeout = 1000;
            }
            setTimeout(function() {
                this.isInitialized = true;
                $("#" + this.sId).highcharts(config);
            }.bind(this), timeout)
        }
    });

    return control;
});