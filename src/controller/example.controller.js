sap.ui.define([
	"sap/ui/core/mvc/Controller"
	
], function (Controller){
	"use strict";
	
	return Controller.extend("sap.ui.demo.wt.controller.example", {
		
		onInit: function(){
			
			this.test();
		},
		
		test: function(){
		    var body;    
		    var conn;    
		    $.response.status = $.net.http.OK;    
		    
		    try {
		        conn = $.db.getConnection("sap.hana.sqlcon::AdminConn");
		        var pStmt = conn.prepareStatement("select * from Products");        
		        var rs = pStmt.executeQuery();       
		        if (rs.next()) {            
		        	body = rs.getNString(1);        
		        }
		        rs.close();        
		        pStmt.close();    
		    } catch (e) 
		    {        
		    	body = "Error: exception caught";        
		    	$.response.status = $.net.http.BAD_REQUEST;    
		    }    
		    if (conn) {        
		    	conn.close();    
		    }    
		    $.response.setBody( body ); 
		}

		
	});

});
/*function readStock(input) {
     var stock = input.stock;        
     var dest = $.net.http.readDestination("yahoo", "yahoo");    
     var client = new $.net.http.Client();    
     var req = new $.web.WebRequest($.net.http.GET, "/d/quotes.csv?f=a&s=" + stock);    
     client.request(req, dest);    
     var response = client.getResponse();    
     var stockValue;   
     if(response.body)        
    	 stockValue = parseInt(response.body.asString(), 10);    
     var sql = "INSERT INTO stock_values VALUES (NOW(), ?)";   
     var conn = $.db.getConnection();    
     var pstmt = conn.prepareStatement(sql);    
     pstmt.setDouble(1, stockValue);    
     pstmt.execute();    
     conn.commit();    
     conn.close(); 
 }

function test() {
}
test();*/