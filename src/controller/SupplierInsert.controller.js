sap.ui.define([
	 "sap/ui/demo/wt/controller/BaseVisualisationDetailController"
], function(BaseVisualisationDetailController){
	"use strict";
	return BaseVisualisationDetailController.extend("sap.ui.demo.wt.supplier.SupplierInsertController",{
		
		
		onInsert: function(){}
			
	
		/*	conn.prepareStatement(“INSERT INTO \”TABLE1\” values(‘” + id + “‘, ‘” + val1 + “‘)”).execute(); 
			conn.commit(); 
			Use the parameterized statement to protect against SQL Injection – particularly when using values from the request object:
			var st = prepareStatement(“INSERT INTO \”TABLE1\” values(?,?)”);
			st.setString(1,id);
			st.setString(2,val1);
			st.execute();
			conn.commit(); 
		}
		*/
		

	});
	

	
});

