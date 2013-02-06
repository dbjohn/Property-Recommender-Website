class HomeController < ApplicationController
  #require_relative './test_ruby.rb'
  require_relative './commute_calc.rb'
  

  def index
	
  end
  
  def results
	
		@properties = Property.where("price >= :min_price AND price <= :max_price", :min_price => params[:min_price],  :max_price => params[:max_price])
		#@durations =[]
		
		puts @properties[1].address
		puts @properties[1].commute_time_from 
		# 3.times do |x|
			# @properties[x].commute_score = 3
		# end
		
		Commute_Calc.calc_commute_score
		#Commute_Calc.calc_commute_score(@properties)
		#request_routing_calculation
		
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
