function test() {
     var body;    
     var conn;    
     $.response.status = $.net.http.OK;    
     try {sap.ui.demo.wt.controller.Detail
        // conn = $.db.getConnection("sap.hana.xs.testApp1::AdminConn");sap.ui.demo.wt.controller.Detail
    	 conn = $.db.getConnection("sap.ui.demo.wt::AdminConn");

        var pStmt = conn.prepareStatement("select CURRENT_USER from dummy");        
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
 test();