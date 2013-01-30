 #class Commute_Calc
	# require 'httparty'
	# require_relative './parse_XML.rb'
	# def initialize 
	 
	 # response = HTTParty.get('http://192.168.1.21:8080/opentripplanner-api-webapp/ws/transit/agencyIds', :headers => {'Accept' => 'text/xml'})
	 
	 # puts response.body
	 
	 
	 # this works...
	 # response = HTTParty.post('http://192.168.1.21:8080/opentripplanner-api-webapp/ws/transit/agencyIds', :body => '<xml>', :headers => {'Accept' => #'text/xml'})
	 
	 # GET or Post?????
	 # this works:
	 # response = HTTParty.get('http://192.168.1.21:8080/opentripplanner-api-webapp/ws/plan', :query => {:fromPlace => '53.3228,-6.2656', :toPlace => #'53.3376,-6.2658', :intermediatePlaces => '', :intermediatePlacesOrdered => '', :date => '12/28/2012', :time => '7:55am', :routerId => '', #:arriveBy =>'false', :wheelchair => 'false', :maxWalkDistance => '800', :walkSpeed => '1.3'}, :headers => {'Accept' => 'text/xml'})
	 
	 # try json
	 # response = HTTParty.get('http://192.168.1.21:8080/opentripplanner-api-webapp/ws/plan', :query => {:fromPlace => '53.3228,-6.2656', :toPlace => #'53.3376,-6.2658', :intermediatePlaces => '', :intermediatePlacesOrdered => '', :date => '12/28/2012', :time => '7:55am', :routerId => '', :arriveBy #=>'false', :wheelchair => 'false', :maxWalkDistance => '800', :walkSpeed => '1.3'}, :headers => {'Accept' => 'application/json'})
	 
	 
	 # puts response.body
	 # pp HTTParty.get('http://192.168.1.21:8080/opentripplanner-api-webapp/ws/transit/agencyIdswhoismyrep.php', :query => {:zip => 46544})
	 #end
	 
	 # def self.calc_commute_time(property_arg)
		# property_lat = property_arg.latitude.to_s
		# property_long = property_arg.longitude.to_s
		# property_coordinates = property_lat + "," + property_long
		
		# response = HTTParty.get('http://86.46.211.23:8080/opentripplanner-api-webapp/ws/plan', :query => {:fromPlace =>property_coordinates, :toPlace => '53.3376,-6.2658', :intermediatePlaces => '', :intermediatePlacesOrdered => '', :date => '12/28/2012', :time => '7:55am', :routerId => '', :arriveBy =>'false', :wheelchair => 'false', :maxWalkDistance => '800', :walkSpeed => '1.3'}, :headers => {'Accept' => 'application/json'})
	 
		#move this eventually
		# Parse_XML.get_duration(response)
		
	 # end
	 
	 

	 


require 'csv'
require 'socket'

 #look for a way to keep tcp connection persistent
	 
	  def request_routing_calc	 
			#hostname = 'localhost'
			hostname = '192.168.1.100'
			port = 55555
			socket = TCPSocket.open(hostname, port)				
			#socket = TCPSocket.new(hostname, port)				

			socket.puts('Go')
			
			socket.recv(1024)
			
	end	 
 
	 
	 # def open_connection
			# hostname = 'localhost'
			# port = 55555
			# socket = TCPSocket.open(hostname, port)			
	# end	 
 
 # def setuprequest_routing_calc	 
			# hostname = 'localhost'
			# port = 55555
			# socket = TCPSocket.open(hostname, port)

			# socket.puts('Go')

			# puts socket.recv(1024)
	# end	 
 

	 def calc_commute_score
			lines =[]
			i =0
			j=0
	
			#File.open("C:\\Users\\John\\Google_Drive\\Folders_from_Skydrive\\DIT\\Year_4\\Final_year_project\\Property_site\\source_code\\Main\\property_site\\RubyCode\\BatchProcessorCall\\CSV\\out.csv") do |file|
#			File.open("C:/Users/John/Google_Drive/Folders_from_Skydrive/DIT/Year_4/Final_year_project/Property_site/source_code/Main/property_site/RubyCode/BatchProcessorCall/CSV/out.csv") do |file|
			File.open("./RubyCode/BatchProcessorCall/CSV/out.csv") do |file|
				file.each do |line|			
						if i != 0
							lines [i] = CSV.parse(line)
							@properties[j].commute_score = lines[i][0][4]
							j	+=1
						end
						i +=1					
					end	
			end
		
	 end
	 
	