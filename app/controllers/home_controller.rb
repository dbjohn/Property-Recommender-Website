class HomeController < ApplicationController
  require '.\test_ruby.rb'

  def index
	
  end
  
  def results
	
	@properties = Property.where("price >= :min_price AND price <= :max_price", :min_price => params[:min_price],  :max_price => params[:max_price])
	@durations =[]
	
	#@properties.each_with_index do |property, i|	
	#	@durations[i] = CommuteCalc.calc_commute_time(property)
	
=begin
comment:

=end
	i = 0
	@durations[i] = TestClass.testMethod
	

  end
  
end
