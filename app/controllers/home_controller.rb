class HomeController < ApplicationController
  def index
	
  end
  
  def results
	
	@property = Property.where("id = ?", 1)
	
  end
  
end
