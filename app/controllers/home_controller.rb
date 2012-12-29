class HomeController < ApplicationController
  def index
	
  end
  
  def results
	
	@properties = Property.where("price >= :min_price AND price <= :max_price", :min_price => params[:min_price],  :max_price => params[:max_price])
	@durations =['cat']
	
	#@properties.each_with_index do |property, i|	
	#	@durations[i] = CommuteCalc.calc_commute_time(property)
  end
  
end
