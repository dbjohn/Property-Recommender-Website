#This class integrates all main parts of the application and responsible for handling
#user requests. The important method here is "results" which contains further details.


class HomeController < ApplicationController  
	#business logic files are in the lib folder
	#as per advice found in a number of places, the method require_dependency is used
	#config.watchable_dirs['lib'] = [:rb] is added to config/environments/development.rb
	#https://rails.lighthouseapp.com/projects/8994/tickets/5218-rails-3-rc-does-not-autoload-from-lib
	#http://stackoverflow.com/questions/4018757/rails3-not-reloading-code-in-lib-while-in-development-mode
	#http://stackoverflow.com/questions/1457241/how-are-require-require-dependency-and-constants-reloading-related-in-rails
	require_dependency 'commute_calc'
	require_dependency 'amenity_calc'
	require_dependency 'scoring'  
 
	def index

	end
  
	#When the form is submitted, the results method is called. It will query the properties 
	#table based on user preferences submitted. It will make external method calls to calculate 
	#the match score, commute score and amenity score and total for each filtered property.
	#Finally it will sort the properties array by total score and and take the top 10 results. 
	def results		
			
		#Before querying the properties table. It will build up an SQL string for a query to filter 
		#the properties table. It will only filter on conditions which the user explicitly specifies 
		#a preference.		
		#We don't know which condition will be inserted into the array first or how many because it 
		#depends on what the user chooses. Only the ones that are choosen are added to the array and 
		#so then Array.join is used to join the elements with "AND" to form a valid sql query string.
		#In addition if params[attribute] isn't present (for whatever reason), i.e. it's blank, then don't include that condition.				
		sql_array = []
		sql_array << "price >= :min_price" unless params[:min_price].blank? || params[:min_price] == "No Min"
		sql_array << "price <= :max_price" unless params[:max_price].blank? || params[:max_price] == "No Max"
		sql_array << "number_of_bedrooms >= :min_no_of_bedrooms" unless params[:min_no_of_bedrooms].blank? || params[:min_no_of_bedrooms] == "No Min"
		sql_array << "number_of_bedrooms <= :max_no_of_bedrooms" unless params[:max_no_of_bedrooms].blank? || params[:max_no_of_bedrooms] == "No Max"
		sql_array << "property_type = :property_type" unless params[:property_type].blank? || params[:property_type] == "Any Type"
		sql_array << "move_in_date >= :move_in" unless params[:move_in_date].blank? 		# the default date will be used if not user supplied
		sql_array << "lease_type = :lease_type" unless params[:lease_type].blank? || params[:lease_type] == "Any Type"
		sql_array << "parking = :parking" unless params[:parking].blank? || params[:parking] == "neutral"
		sql_array << "washing_machine = :washing_machine" unless params[:washing_machine].blank? || params[:washing_machine] == "neutral"
		sql_array << "dryer = :dryer" unless params[:dryer].blank? || params[:dryer] == "neutral"
		sql_array << "dishwasher = :dishwasher" unless params[:dishwasher].blank? || params[:dishwasher] == "neutral"		
		sql_array << "internet = :internet" unless params[:internet].blank? || params[:internet] == "neutral"
		sql_array << "microwave = :microwave" unless params[:microwave].blank? || params[:microwave] == "neutral"
		
		sql_string = sql_array.join(" AND ")
				
		#The sql string is used to query the properties table and the results are ordered to place the 
		# most inexpensive properties near the begining but preferring those with "richer" features and facilities.		
		#we have to pass params here rather than embed in the string for security reasons		
		@properties = Property.where(sql_string, params).order('price asc, number_of_bedrooms desc, washing_machine desc, dryer desc, internet desc, parking desc, microwave desc, move_in_date asc')		
		Scoring.match_score_calc @properties		#the match score is calculated for all on this sorted array of properties
					
		#Write commute destination coordinates to file in OTP format required for routing software to read.
		#It is acknowledged that this is not thread safe at the moment. In that each request uses this same file so the application can 
		#only give a accurate result to one request at a time. Making the file name using a unique number for each request would be one approach 
		#to address this. OTP would need to know the name of the file, which could be passed over a socket.		
		  File.open(Rails.root.join( "other_files/commute/otp_origin/Origin.csv"), 'w') do |file| 							
				  file.puts("label,lat,lon,input")
				  file.puts("o1,#{params[:commute_destination]},0")			
		  end

		
		@transport_modes = params.slice(:transit, :car, :walk).values #get the selected transport modes submitted and put into array
		
		@amenity_types = params.slice(:supermarket, :convenience_shop, :restaurant, :library,:bank).values	#get the selected amenity types submitted and put into array
		#even if default amenity weighting is used, the results view iterates over each amenity type
				
		#A hash for the transport modes, for converting from the strict syntax required by opentripplanner into a more readable format in the view.
		@transport_mode_words_hash = {'CAR' => 'Car', 'TRANSIT,WALK' => 'Public transport and walking', 'WALK' => 'Walking'}
		
		CommuteCalc.request_routing_calculation(@transport_modes) #call method to signal to OTP to calculate the commute times to properties passing in the preferred transport mode.

		#once OTP has calculated commute times, we pass a properties array, sorted by id, so that the results file can be merged with the properties
		CommuteCalc.calc_commute_score @properties.sort {|x,y| x.id <=> y.id} 
		
		# if not using default amenity weighting then recalculate the amenity scores for the properties.
		#passing in the filtered properties, transport modes, custom amenity weighting and amenity types submitted
		if(!params[:amenity_weighting_default]) then
			@amenity_weights = params.slice(:supermarket_weight_value, :convenience_shop_weight_value, :restaurant_weight_value, :library_weight_value, :bank_weight_value) 	#get the set amenity weightings submitted and assign a hash
			AmenityCalc.amenity_score_calc(@properties, @amenity_types, @transport_modes, @amenity_weights) 
		end
		
		#calculate the total score for the filtered properties
		Scoring.total_score_calc @properties
				
		@properties.sort!	#sort in place for descending order by total score
		
		#the top 10 properties will be taken. slice! is used to remove all from the 11th element to the end. 
		#it will modify the array in place
		@properties.slice!(10..-1)
		
	end		
end