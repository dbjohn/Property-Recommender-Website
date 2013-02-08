class HomeController < ApplicationController
  #require_relative './test_ruby.rb'
  #require_relative './commute_calc.rb'
  #require_dependency './commute_calc.rb'
 require_dependency 'commute_calc'

  

  def index
	
  end
  
  def results
	
		@properties = Property.where("price >= :min_price AND price <= :max_price", :min_price => params[:min_price],  :max_price => params[:max_price])
		#Property.where("price >= 1000 AND price <= 999999")
		#@durations =[]
		
		# puts @properties[1].address
		# puts @properties[1].commute_time_from 
		# 3.times do |x|
			# @properties[x].commute_score = 3
		# end
		
		
		#request_routing_calculation
		CommuteCalc.request_routing_calculation
		CommuteCalc.calc_commute_score @properties
		
		
		 @properties.sort!.reverse!	#sort in descending order and mutate object array
		#CommuteCalc::calc_commute_score
		#calc_commute_score
		
=begin	
	@properties.each_with_index do |property, i|	
		@durations[i] = CommuteCalc.calc_commute_time(property)
		
=end		
	end
	
=begin
comment:


	i = 0
	@durations[i] = TestClass.testMethod
	end
=end
  
  
end

