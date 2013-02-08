module CommuteCalc
	require 'csv'
	require 'socket'
	#require_relative './scoring.rb'
	require_dependency 'scoring'
	
	 #look for a way to keep tcp connection persistent
		 
		  def self.request_routing_calculation	 
				#hostname = 'localhost'
				hostname = '192.168.1.100'
				port = 55555
				socket = TCPSocket.open(hostname, port)				
				#socket = TCPSocket.new(hostname, port)				

				socket.puts('Go')
				
				socket.recv(1024)
				
		end	 	 
	 
		
		 def self.calc_commute_score(properties)
					line =[]
					i =0
					j=0
														
							 File.open(Rails.root.join( "RubyCode/BatchProcessorCall/CSV/out_0_o1.csv") ) do |file|																			
								puts "hello"
							 
			
												 #@properties.each_with_index do |property, index|
												 properties.each do |property|
												
															 loop do
																 line = CSV.parse(file.gets)
																 break if line[0][0].to_i == property.id		# Convert line id element to int first then compare to property id.
															 end
															
															 property.commute_time_to = convert_seconds_to_minutes(line[0][4])														
															 property.commute_time_from = convert_seconds_to_minutes(line[0][5])
															 property.commute_score = Scoring.score_calc property.commute_time_to, property.commute_time_from														
												 end	
							end
			
		end
				
		def self.convert_seconds_to_minutes (seconds)
			return seconds.to_f/60.0			
		end

end
	
	 

	