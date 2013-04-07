class CommuteCalc
	require 'csv'
	require 'socket'
	require_dependency 'scoring'	 
		
		#keep the connection persistent...between requests
	  def self.request_routing_calculation(transport_modes)
			#Make sure you have the ip address for the windows OS. cmd - ipconfig
			#we might consider getting the server socket on OTP to listen on the same ipaddress as this. so that it can use localhost. 
			#The VM seems to be running at 192.168.56.101 every time
			#On my computer this often ran on ip address...
			#hostname = 'localhost'
			#hostname = '192.168.1.100'
			hostname = '192.168.56.1'
			#hostname = '192.168.56.101'
			
			port = 55557
			socket = TCPSocket.open(hostname, port)				
			
			transport_modes_string = transport_modes.join(",")
			socket.puts(transport_modes_string)
			
			socket.recv(1024)
			
	end	 	 
 
	
	 def self.calc_commute_score(properties)
		line =[]
		
		# Rails.logger.debug "Properties inside commute calc: #{properties.to_yaml}"
		
		
		
		 File.open(Rails.root.join( "other_files/commute/results/o1_0_out.csv"),"r" ) do |file|																			
			
			line = CSV.parse(file.gets) #read in the first line which is just the csv headers
			
			properties.each do |property|
							
				# Rails.logger.debug property.id
				#This loop do is necessary. Because the exported properties may contain more properties than in the filtered properties array
				#so we skip over properties that are not in the filter properties array.				
				 loop do
					 
					 #two level if statements are needed to handle the case when a property result has not be written to the otp results file, which can happen.

					 #if the line id is greater than or equal to the property id then we will break out of the loop and go to the next property. 
					 #but first go to the next level if statments
					 if line[0][0].to_i >= property.id		

						if line[0][0].to_i == property.id #if the line id is equal to the property id then we have found the result for this property
							#Convert line id element to int first then compare to property id.
							
							 property.commute_time_to = convert_seconds_to_minutes( line[0][4] )														
							 property.commute_time_from = convert_seconds_to_minutes( line[0][5] )
							 property.commute_score = Scoring.travel_score_calc( property.commute_time_to, property.commute_time_from)						 						
						elsif line[0][0].to_i > property.id #in case the property is not in the output results file, it is given a commute score of zero. The property id would be less than the next highest property id present in the file, because the file and properties array are sorted by id.
							property.commute_score = 0
						end
						
						break
					 end
					 line = CSV.parse(file.gets)
				 end
				 
				 
				 #NEED to put in check for zero or negative times?
				 # Rails.logger.debug "Property in loop: #{property.inspect}"
				 # Rails.logger.debug "Property in loop: #{property.commute_score.inspect}"
			 end	
		end
		
	end
			
	def self.convert_seconds_to_minutes (seconds)
	#This method is used because in many ways, minutes are more intuitive and easier to work with in this context for transport travel times
		return seconds.to_f/60.0			
	end
	
end
	
	 

	