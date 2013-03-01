module CommuteCalc
	require 'csv'
	require 'socket'
	#require_relative './scoring.rb'
	require_dependency 'scoring'
	
	 #look for a way to keep tcp connection persistent
		 
		  def self.request_routing_calculation(transit_modes)
				#Make sure you have the ip address for the windows OS. cmd - ipconfig
				#we might consider getting the server socket on OTP to listen on the same ipaddress as this. so that it can use localhost. The VM seems to be running at 192.168.56.101 every time
				#hostname = 'localhost'
				hostname = '192.168.1.100'
				#hostname = '192.168.56.1'
				#hostname = '192.168.56.101'
				port = 55557
				socket = TCPSocket.open(hostname, port)				
				#socket = TCPSocket.new(hostname, port)				

				socket.puts(transit_modes)
				
				socket.recv(1024)
				
		end	 	 
	 
		
		 def self.calc_commute_score(properties)
					line =[]
					
														Rails.logger.debug "Properties inside commute calc: #{properties.to_yaml}"
														##check this file name
							 File.open(Rails.root.join( "other_files/commute/results/o1_0_out.csv"),"r" ) do |file|																			
												 #@properties.each_with_index do |property, index|
												 properties.each do |property|
												
															 loop do
																 line = CSV.parse(file.gets)
																 break if line[0][0].to_i == property.id		# Convert line id element to int first then compare to property id.
															 end
															
															
															
															 property.commute_time_to = convert_seconds_to_minutes( line[0][4] )														
															 property.commute_time_from = convert_seconds_to_minutes( line[0][5] )
															 property.commute_score = Scoring.travel_score_calc( property.commute_time_to, property.commute_time_from)
															 #NEED to put in check for zero or negative times
															 Rails.logger.debug "Property in loop: #{property.inspect}"
															 Rails.logger.debug "Property in loop: #{property.commute_score.inspect}"
												 end	
							end
			
		end
				
		def self.convert_seconds_to_minutes (seconds)
			return seconds.to_f/60.0			
		end
		
		def self.test ( temp)
			temp.commute_score = 124
		end

end
	
	 

	