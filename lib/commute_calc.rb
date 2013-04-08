
#This class is responsible for handling the calculation of commute times, scores and managing 
#the connection to the routing software.
#There are 3 methods in the class request_routing_calculation, calc_commute_score, convert_seconds_to_minutes

class CommuteCalc
	require 'csv'
	require 'socket'
	require_dependency 'scoring'	 
		
    # Method request_routing_calculation will open a connection to OTP which should be already listening on the ipaddress and port number.
	#it takes a transport modes (array) argument, which is sent to the socket for OTP to use when calculating commute time.
	#It then waits on the socket for a response before returning.
	def self.request_routing_calculation(transport_modes)
			
			
		# note that the rails application was running on a linux VM. And OTP was running on the native Windows OS host. 
		# Therefore ipaddress localhost couldn't be used.
		# On my computer, the windows host often ran on on one of the 3 following ip addresses:
		#hostname = '192.168.1.100'
		hostname = '192.168.56.1'
		#hostname = '192.168.56.101'
					
		port = 55557 #randomly chosen port number
		socket = TCPSocket.open(hostname, port)				
		
		transport_modes_string = transport_modes.join(",")	#join array into a single string separated by commas
		socket.puts(transport_modes_string)
		
		socket.recv(1024)	#wait for any response from OTP before continuing.
			
	end	 	 
 

	# calc_commute_score accepts an array of properties (sorted by id) and assigns the commute "to" and "from" times to properties and
	# calculates the commute score for each property by reading the "to" and "from" travel times from the OTP results file 
	def self.calc_commute_score(properties)
		
		line =[] #line will contain lines of the file
				
		#Basic logic: open file, for each property, find the line in the file that is for the property
		#(this is made more efficient by the fact that properties and the file are sorted by the property id - so is like a merge join operation)
		# if the line exists assign the to and from times to the property and calculate the commute score.
		#if no line is in the file for that property (because OTP rejected it) then give the property very high commute times and commute score of zero
		#
		
		File.open(Rails.root.join( "other_files/commute/results/o1_0_out.csv"),"r" ) do |file|																			
			
			line = CSV.parse(file.gets) #read in the first line which is just the csv headers
			
			properties.each do |property|
							
				# Rails.logger.debug property.id
				#This loop do is necessary. Because the exported properties may contain more properties than in the filtered properties array
				#so we skip over properties that are not in the filter properties array.				
				loop do
					 					 
					 #two level if statements are needed to handle the case when a property result has not be written to the otp results file, 					 

					 #if the cases where the line id is greater than or equal to the property id then we will break out of the loop and go to the next property. 
					 #but first go to the next level if statement
					if line[0][0].to_i >= property.id		
					#Convert line id element to int first then compare to property id.
						if line[0][0].to_i == property.id #if the line id is equal to the property id then we have found the result for this property
							
							
							property.commute_time_to = convert_seconds_to_minutes( line[0][4] )														
							property.commute_time_from = convert_seconds_to_minutes( line[0][5] )
							property.commute_score = Scoring.travel_score_calc( property.commute_time_to, property.commute_time_from)						 						
						elsif line[0][0].to_i > property.id #in case the property is not in the output results file, it is given a commute score of zero. The property id would be less than the next highest property id present in the file, because the file and properties array are sorted by id.
							property.commute_time_to = 9999
							property.commute_time_from = 9999
							property.commute_score = 0
						end
						
						break
					 end
					 # Need to read in the line after the if statement, because if a property does not exist in the file then it is 
					 # found out by checking line id is greater than property id (in the elsif). In this case it has already read in a valid line from the file
					 # which may be needed by another property - so we check the next property. 
					 # Only when the line id does not equal the property id, do we read in the next line from the file.
					 line = CSV.parse(file.gets)
				 end
				 				 				 
			 end	
		end
		
	end
			
	def self.convert_seconds_to_minutes (seconds)
		#this method takes in a seconds argument, converts seconds to minutes and returns the minutes value.
		#It is used because in many ways, minutes are more intuitive and easier to work with in this context for transport travel times.
		return seconds.to_f/60.0			
	end
	
end
