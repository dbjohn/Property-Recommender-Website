class HomeController < ApplicationController
  #require_relative './test_ruby.rb'
  require_relative './commute_calc.rb'

  def index
	
  end
  
  def results
	
	@properties = Property.where("price >= :min_price AND price <= :max_price", :min_price => params[:min_price],  :max_price => params[:max_price])
	@durations =[]
	
	@properties.each_with_index do |property, i|	
		@durations[i] = CommuteCalc.calc_commute_time(property)
	end
	
=begin
comment:


	i = 0
	@durations[i] = TestClass.testMethod
	
=end
  end
  
end
