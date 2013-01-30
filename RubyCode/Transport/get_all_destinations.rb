begin
	gem "savon", "=1.2.0"
	require "savon" 			

	def get_all_destinations	
		client = Savon.client("http://rtpi.dublinbus.biznetservers.com/DublinBusRTPIService.asmx?WSDL")
		response = client.request :get_all_destinations

		file = File.open("./get_all_destinations.xml", "w")
		file.write(response.to_xml) 
		
		rescue IOError => e
		rescue Savon::SOAP::Fault => fault
			log fault.to_s
		ensure
			file.close unless file == nil
	end
	

	
end	

