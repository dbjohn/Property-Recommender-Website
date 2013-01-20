class HTTPartyTest
	require 'httparty'
	
	def initialize 
	 
	 #response = HTTParty.get('http://192.168.1.21:8080/opentripplanner-api-webapp/ws/transit/agencyIds', :headers => {'Accept' => 'text/xml'})
	 
	 #puts response.body
	 
	 
	 #this works...
	 #response = HTTParty.post('http://192.168.1.21:8080/opentripplanner-api-webapp/ws/transit/agencyIds', :body => '<xml>', :headers => {'Accept' => #'text/xml'})
	 
	 #GET or Post?????
	 #this works:
	 #i=0
	 #puts i
	 
	 #500.times do
		# response = HTTParty.get('http://192.168.1.21:8080/opentripplanner-api-webapp/ws/plan', :query => {:fromPlace => '53.3228,-6.2656', :toPlace => #'53.3376,-6.2658', :intermediatePlaces => '', :intermediatePlacesOrdered => '', :date => '12/28/2012', :time => '7:55am', :routerId => '', :arriveBy =>'false', :wheelchair => 'false', :maxWalkDistance => '800', :walkSpeed => '1.3', :batch => true}, :headers => {'Accept' => 'text/xml'})
		# puts i
		 #i = i +1
	 #end
	 #500 takes about 30 seconds
	 
	 #try json
	 #response = HTTParty.get('http://192.168.1.21:8080/opentripplanner-api-webapp/ws/plan', :query => {:fromPlace => '53.3228,-6.2656', :toPlace => '53.3376,-6.2658', :intermediatePlaces => '', :intermediatePlacesOrdered => '', :date => '12/28/2012', :time => '7:55am', :routerId => '', :arriveBy =>'false', :wheelchair => 'false', :maxWalkDistance => '800', :walkSpeed => '1.3'}, :headers => {'Accept' => 'application/json'})	 	
	 
	 
	 
	 #pp HTTParty.get('http://192.168.1.21:8080/opentripplanner-api-webapp/ws/transit/agencyIdswhoismyrep.php', :query => {:zip => 46544})
	 
	 
	 #GET /opentripplanner-api-webapp/ws/tile/12/1976/1329.png?layers=traveltime&styles=mask&batch=true&mode=TRANSIT%2CWALK&maxWalkDistance=2000&time=2012-06-06T08%3A00%3A00&fromPlace=53.32943774917152%2C-6.274909973144531&toPlace=53.46672595%2C-6.23824854999998 HTTP/1.1Host: 192.168.1.21:8080User-Agent: Mozilla/5.0 (Windows NT 6.0; rv:17.0) Gecko/20100101 Firefox/17.0Accept: image/png,image/*;q=0.8,*/*;q=0.5Accept-Language: en-US,en;q=0.5Accept-Encoding: gzip, deflateConnection: keep-aliveReferer: http://192.168.1.21:8080/opentripplanner-analyst-client/index.html
	 
	 
	 #response = HTTParty.get('http://192.168.1.21:8080/opentripplanner-api-webapp/ws/plan', :query => {:fromPlace => '53.3228,-6.2656', :toPlace => '53.3376,-6.2658', :intermediatePlaces => '', :intermediatePlacesOrdered => '', :date => '12/28/2012', :time => '7:55am', :routerId => '', :arriveBy =>'false', :wheelchair => 'false', :maxWalkDistance => '800', :walkSpeed => '1.3'}, :headers => {'Accept' => 'application/json'})
	 
	 
	 #puts response.body
	 
	 ##------------------------------------##------------------------------------
	 
	 # with portland
	 #direct one to one itinerary
	 #response = HTTParty.get('http://localhost:8080/opentripplanner-api-webapp/ws/plan', :query => {:fromPlace => '45.5553,-122.6008', :toPlace => '45.5165,-122.6348', :intermediatePlaces => '', :intermediatePlacesOrdered => '', :date => '1/16/2013', :time => '11:00am', :routerId => '', :arriveBy =>'false', :wheelchair => 'false', :maxWalkDistance => '800', :walkSpeed => '1.3', :batch => true}, :headers => {'Accept' => 'text/xml'})
	 #from between northeast killingsworth st and northeast fremont st
	 #to south of north east stark street
	 #puts response.body	 
	  
	 # with portland
	 #direct one to NONE itinerary
	 response = HTTParty.get('http://localhost:8080/opentripplanner-api-webapp/ws/plan', :query => {:fromPlace => '45.5553,-122.6008', :toPlace => '45.5165,-122.6348', :intermediatePlaces => '', :intermediatePlacesOrdered => '', :date => '1/16/2013', :time => '11:00am', :routerId => '', :arriveBy =>'false', :wheelchair => 'false', :maxWalkDistance => '800', :walkSpeed => '1.3', :batch => 'true'}, :headers => {'Accept' => 'text/xml'})
	 #from between northeast killingsworth st and northeast fremont st
	 #to south of north east stark street
	 puts response.body
	 
	 #------------------
	 
	 #analyst?
	 	
	 #response = HTTParty.get('http://localhost:8080/opentripplanner-api-webapp/ws/wms', :query => {:layers=>'traveltime', :batch=>'true', :mode=>'transit%2cwalk', :maxwalkdistance=>'2000', :time=>'2013-1-1t08%3a00%3a00', :fromplace=>'45.5553%2c-122.6008', :toplace=>'44.5553%2c-123.6008'},:headers => {'Accept' => 'text/xml'})
	 
	 #puts response.body
	 
	 end
end

HTTPartyTest.new

