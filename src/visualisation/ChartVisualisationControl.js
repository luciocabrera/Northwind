sap.ui.define([
    "sap/ui/core/Control",
   // "sap/ui/thirdparty/c3"
    "sap/ui/demo/wt/js/c3"
], function(
    Control,
    c3
) {
    var control = Control.extend("sap.ui.demo.wt.visualisation.ChartVisualisationControl", {
    	
  
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
                chartType: {
                    type: "string",
                    defaultValue: "pie"
                }
            }
        },

        renderer: function(oRm, oControl) {
            //var layout = oControl.createChart();
            oRm.write("<div ");
            oRm.writeControlData(oControl);
            oRm.writeClasses();
            oRm.addStyle('width', oControl.getWidth());
            oRm.addStyle('height', oControl.getHeight());
            oRm.writeStyles();
            oRm.write(" >");
            oRm.write("</div>");
        },

        _createPieChart: function() {
            c3.generate({
                bindto: "#" + this.getId(),
                data: {
                    columns: [
                        ['data1', 30],
                        ['data2', 120]
                    ],
                    type: 'pie'
                }
            });
        },

        updateChart: function(channel, event, data) {
            debugger;


        },

        _createLineChart: function() {
       
        
        	d3.selectAll("p")
        	  .data([4, 8, 15, 16, 23, 42])
        	    .style("font-size", function(d) { return d + "px"; });
        	
            d3.selectAll("p")
            .data([4, 8, 15, 16, 23, 42])
              .style("font-size", function(d) { return d + "px"; }.bind(this));
        	  
        	  
      //  d3.rebind( "#" + this.getId())	  
  
        	  
      	
          c3.generate({
                bindto: "#" + this.getId(),
                data: {
                    columns: [
                        ['data1', 30, 200, 100, 400, 150, 250],
                        ['data2', 50, 20, 10, 40, 15, 25]
                    ]
                }
            });
            },

        _createXYChart: function() {
            d3.generate({
                bindto: "#" + this.getId(),
                data: {
                    x: 'x',
                    columns: [
                        ['x', 30, 50, 100, 230, 300, 310],
                        ['data1', 30, 200, 100, 400, 150, 250],
                        ['data2', 130, 300, 200, 300, 250, 450]
                    ]
                }
            });
        },

        _createCombinationChart: function() {
            d3.generate({
                bindto: "#" + this.getId(),
                data: {
                    columns: [
                        ['data1', 30, 20, 50, 40, 60, 50],
                        ['data2', 200, 130, 90, 240, 130, 220],
                        ['data3', 300, 200, 160, 400, 250, 250],
                        ['data4', 200, 130, 90, 240, 130, 220],
                        ['data5', 130, 120, 150, 140, 160, 150],
                        ['data6', 90, 70, 20, 50, 60, 120],
                    ],
                    type: 'bar',
                    types: {
                        data3: 'spline',
                        data4: 'line',
                        data6: 'area',
                    },
                    groups: [
                        ['data1', 'data2']
                    ]
                }
            })
        },


        _createBarChart: function() {
            d3.generate({
                bindto: "#" + this.getId(),
                data: {
                    columns: [
                        ['data1', 30, 200, 100, 400, 150, 250],
                        ['data2', 130, 100, 140, 200, 150, 50]
                    ],
                    type: 'bar'
                },
                bar: {
                    width: {
                        ratio: 0.5 // this makes bar width 50% of length between ticks
                    }
                    // or
                    //width: 100 // this makes bar width 100px
                }
            })
        },
        onAfterRendering: function(arguments) {
            var eventBus = sap.ui.getCore().getEventBus();
            eventBus.subscribe("ChartVisualization", "updateChart", this.updateChart, this);

            if (Control.prototype.onAfterRendering) {
                Control.prototype.onAfterRendering.apply(this, arguments);
            }

            var chartType = this.getChartType();
            switch (chartType) {
                case 'pie':
                    this._createPieChart();
                    break;
                case 'line':
                    this._createLineChart();
                    break;
                case 'xy':
                    this._createXYChart();
                    break;
                case 'combi':
                    this._createCombinationChart();
                    break;
                case 'bar':
                    this._createBarChart();
                    break;
            }




        }
    });
    return control;
});