=begin
talk

can use
response.to_hash, to get in hash.


=end
#class Dublin_bus
begin
	gem "savon", "=1.2.0"
	require "savon" 
			
	#def initialize	
=begin
	    client = Savon.client("http://www.thomas-bayer.com/axis2/services/BLZService?wsdl")
		response = client.request :get_bank, :body => { :blz => "70070010" }
=end		
	

		client = Savon.client("http://rtpi.dublinbus.biznetservers.com/DublinBusRTPIService.asmx?WSDL")
		response = client.request :get_stop_data_by_route, :body => {:route => "16"}


	
=begin	
not working properly
	client = Savon.client("http://rtpi.dublinbus.biznetservers.com/DublinBusRTPIService.asmx?WSDL")
	response = client.request :get_stop_data_by_route do
		soap.version = 2
		soap.body = {:route => "16"}
	end
=end

	 file = File.open("./temp", "w")
  file.write(response.hash) 
rescue IOError => e
  #some error occur, dir not writable etc.

	
=begin
	pieces...
	response = client.request :get_user do
	soap.version = 2
	
	
	response = client.request(:get_stop_data_by_route, :route) do
		soap.version = 2
		soap.body = {:route => "16"}
	end
end
	
=end
		rescue Savon::SOAP::Fault => fault
		log fault.to_s
		ensure
		file.close unless file == nil
end	
#	 end
#end

#Dublin_bus.new
