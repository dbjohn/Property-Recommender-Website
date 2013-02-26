class HomeController < ApplicationController
  #require_relative './test_ruby.rb'
  #require_relative './commute_calc.rb'
  #require_dependency './commute_calc.rb'
 require_dependency 'commute_calc'
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
		@properties = Property.where(sql_string, params).order('price asc')
		#@properties = Property.where("price >= :min_price AND price <= :max_price", :min_price => params[:min_price],  :max_price => params[:max_price]).order('price asc')
		#ps = Property.where("price >= 1000 AND price <= 999999")
				
		#Scoring.match_score_calc @properties 
				
		
		#Write commute destination coordinates to file for router to read
		#this is not thread safe at the moment
		 # File.open(Rails.root.join( "other_files/commute/otp_origin/Origin.csv"), 'w') do |file| 							
				 # file.puts("label,lat,lon,input")
				 # file.puts("o1,#{params[:commute_destination]},0")			
		 # end
		
		
		
		# CommuteCalc.request_routing_calculation
		# CommuteCalc.calc_commute_score @properties
		
		# Scoring.total_score_calc @properties
		
		# @properties.sort!.reverse!	#sort in place for descending order 
		#@properties.sort!	#sort in place for descending order 
		
		#PUT IN SEPARATE METHOD
		# amenity_ids = []
		 # amenity = PropertiesAmenity.where(:property_id => properties.map { |prop| prop.id}).each { |item| amenity_coord << item.dublin_osm_point_id}
		# .each
	end
	
	def process_form
		
		#return sql_string
	end
  
end

