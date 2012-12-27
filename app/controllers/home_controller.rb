class HomeController < ApplicationController
  def index
	
  end
  
  def results
	
	@property = Property.where("price = ?", params[:price]).first
	
  end
  
end
