class HomeController < ApplicationController
  #require_relative './test_ruby.rb'
  #require_relative './commute_calc.rb'
  #require_dependency './commute_calc.rb'
 require_dependency 'commute_calc'
 require_dependency 'amenity_calc'
 require_dependency 'scoring'

  

  def index
	
  end
  
  def results
	
	
		#if type is anytype then don't include it#############################
		#########################################
		
		#make a process form method. When you know how to do it in ruby.
		###########################################
		
		#apply the restrictions on filtering, if any
		#To form a correct query string for this query, the word "AND" needs to separate each condition. We don't know which condition will be inserted into the array first or how many because it depends on what the user chooses. 
		#Only the ones that are choosen are added to the array and so then Array.join is used to join the elements with "AND" to form the sql query string.
		
		#get commuteCalc request running early in the background. Collect later. NOte, not fully implemented yet as it is blocking wait.
		 	
		
		sql_array = []
		sql_array << "price >= :min_price" unless params[:min_price] == "No Min"
		sql_array << "price <= :max_price" unless params[:max_price] == "No Max"
		sql_array << "number_of_bedrooms >= :min_no_of_bedrooms" unless params[:min_no_of_bedrooms] == "No Min"
		sql_array << "number_of_bedrooms <= :max_no_of_bedrooms" unless params[:max_no_of_bedrooms] == "No Max"
		sql_array << "property_type = :property_type" unless params[:property_type] == "Any Type"
		sql_array << "move_in_date >= :move_in" 		# the default date will be used if not user supplied
		sql_array << "lease_type = :lease_type" unless params[:lease_type] == "Any Type"
		sql_array << "parking = :parking" unless params[:parking] == "neutral"
		sql_array << "washing_machine = :washing_machine" unless params[:washing_machine] == "neutral"
		sql_array << "dryer = :dryer" unless params[:dryer] == "neutral"
		sql_array << "dishwasher = :dishwasher" unless params[:dishwasher] == "neutral"		
		sql_array << "internet = :internet" unless params[:internet] == "neutral"
		sql_array << "microwave = :microwave" unless params[:microwave] == "neutral"
		
		sql_string = sql_array.join(" AND ")
		#@temp = params		
		
		###########################################
		#we have to pass params here rather than embed in the string for security reasons
		#need to order by more variables...
		@properties = Property.where(sql_string, params).order('price asc')
		#@properties = Property.where(sql_string, params).
		#@properties = Property.where("price >= :min_price AND price <= :max_price", :min_price => params[:min_price],  :max_price => params[:max_price]).order('price asc')
		
		
		Scoring.match_score_calc @properties
					
		#Write commute destination coordinates to file for router to read
		#this is not thread safe at the moment
		  File.open(Rails.root.join( "other_files/commute/otp_origin/Origin.csv"), 'w') do |file| 							
				  file.puts("label,lat,lon,input")
				  file.puts("o1,#{params[:commute_destination]},0")			
		  end
					
		@transport_modes = params.slice(:transit, :car, :walk, :bicycle).values
		@amenity_types= params.slice(:supermarket, :convenience_shop, :restaurant, :library,:bank).values		
		#A hash with the proper amenity names is used in the view as it is more presentable and better english
		@amenity_names_hash = {'supermarket' => 'Supermarkets', 'convenience_shop' => 'Convenience Shops', 'restaurant' => 'Restaurants', 'library' => 'Libraries', 'bank' => 'Banks'}
		#A hash for the transport modes, for converting from the strict syntax required by opentripplanner to a more readable format in the view.
		@transport_mode_words_hash = {'CAR' => 'Car', 'TRANSIT,WALK' => 'public transport and walking', 'WALK' => 'walking'}
		# CommuteCalc.request_routing_calculation(@transport_modes)
			 
		 #pass a reference to the method of the sorted properties array. It is sorted so that properties align with the results written to file.
		CommuteCalc.calc_commute_score @properties.sort {|x,y| x.id <=> y.id}
				
		AmenityCalc.amenity_score_calc(@properties, @amenity_types, @transport_modes)
		
		Scoring.total_score_calc @properties
				
	    @properties.sort!	#sort in place for descending order 
		
	end
	
	def process_form
		
		#return sql_string
	end
  
end