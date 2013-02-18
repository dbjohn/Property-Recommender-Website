class HomeController < ApplicationController
  #require_relative './test_ruby.rb'
  #require_relative './commute_calc.rb'
  #require_dependency './commute_calc.rb'
 require_dependency 'commute_calc'
 require_dependency 'scoring'

  

  def index
	
  end
  
  def results
	
		@properties = Property.where("price >= :min_price AND price <= :max_price", :min_price => params[:min_price],  :max_price => params[:max_price]).order('price asc')
		#ps = Property.where("price >= 1000 AND price <= 999999")
				
		Scoring.match_score_calc @properties 
				
		
		#Write commute destination coordinates to file for router to read
		#this is not thread safe at the moment
		 # File.open(Rails.root.join( "RubyCode/BatchProcessorCall/CSV/OTP_files/Origins.csv"), 'w') do |file| 							
				 # file.puts("label,lat,lon,input")
				 # file.puts("o1,#{params[:commute_destination]},0")			
		 # end
		
		
		
		# CommuteCalc.request_routing_calculation
		# CommuteCalc.calc_commute_score @properties
		
		# Scoring.total_score_calc @properties
		
		# @properties.sort!.reverse!	#sort in place for descending order 
		#@properties.sort!	#sort in place for descending order 
		
		#PUT IN SEPARATE METHOD
		amenity_ids = []
		 amenity = PropertiesAmenity.where(:property_id => properties.map { |prop| prop.id}).each { |item| amenity_coord << item.dublin_osm_point_id}
		.each
	end
	
  
end

