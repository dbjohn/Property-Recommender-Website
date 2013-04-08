

begin
	gem "savon", "=1.2.0"
	require "savon" 
			
	#def initialize	
=begin
	    client = Savon.client("http://www.thomas-bayer.com/axis2/services/BLZService?wsdl")
		response = client.request :get_bank, :body => { :blz => "70070010" }

	

		client = Savon.client("http://rtpi.dublinbus.biznetservers.com/DublinBusRTPIService.asmx?WSDL")
		response = client.request :get_stop_data_by_route, :body => {:route => "16"}

=end				
		
		client = Savon.client("http://rtpi.dublinbus.biznetservers.com/DublinBusRTPIService.asmx?WSDL")
		response = client.request :get_routes_serviced_by_stop_number, :body => {:stop_id => "217"}


	
=begin	
not working properly
	client = Savon.client("http://rtpi.dublinbus.biznetservers.com/DublinBusRTPIService.asmx?WSDL")
	response = client.request :get_stop_data_by_route do
		soap.version = 2
		soap.body = {:route => "16"}
	end
=end
		file = File.open("./temp.xml", "w")
		file.write(response.to_xml) 
		rescue IOError => e
		rescue Savon::SOAP::Fault => fault
		log fault.to_s
		ensure
		file.close unless file == nil
end	
  #some error occur, dir not writable etc.

	


