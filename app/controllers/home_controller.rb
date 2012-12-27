class HomeController < ApplicationController
  def index
	
  end
  
  def results
	
	@property = Property.where("price >= :min_price AND price <= :max_price", :min_price => params[:min_price],  :max_price => params[:max_price]).first
	
  end
  
end
