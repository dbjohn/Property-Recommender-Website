class HTTPartyTest
	require 'httparty'
	
	def initialize 
	 
	 #response = HTTParty.get('http://192.168.1.21:8080/opentripplanner-api-webapp/ws/transit/agencyIds', :headers => {'Accept' => 'text/xml'})
	 
	 #puts response.body
	 
	 
	 #this works...
	 #response = HTTParty.post('http://192.168.1.21:8080/opentripplanner-api-webapp/ws/transit/agencyIds', :body => '<xml>', :headers => {'Accept' => #'text/xml'})
	 
	 #GET or Post?????
	 #this works:
	 #response = HTTParty.get('http://192.168.1.21:8080/opentripplanner-api-webapp/ws/plan', :query => {:fromPlace => '53.3228,-6.2656', :toPlace => #'53.3376,-6.2658', :intermediatePlaces => '', :intermediatePlacesOrdered => '', :date => '12/28/2012', :time => '7:55am', :routerId => '', #:arriveBy =>'false', :wheelchair => 'false', :maxWalkDistance => '800', :walkSpeed => '1.3'}, :headers => {'Accept' => 'text/xml'})
	 
	 #try json
	 response = HTTParty.get('http://4k3j.localtunnel.com:8080/opentripplanner-api-webapp/ws/plan', :query => {:fromPlace => '53.3228,-6.2656', :toPlace => '53.3376,-6.2658', :intermediatePlaces => '', :intermediatePlacesOrdered => '', :date => '12/28/2012', :time => '7:55am', :routerId => '', :arriveBy =>'false', :wheelchair => 'false', :maxWalkDistance => '800', :walkSpeed => '1.3'}, :headers => {'Accept' => 'application/json'})
	 
	 
	 puts response.body
	 #pp HTTParty.get('http://192.168.1.21:8080/opentripplanner-api-webapp/ws/transit/agencyIdswhoismyrep.php', :query => {:zip => 46544})
	 end
end

HTTPartyTest.new

