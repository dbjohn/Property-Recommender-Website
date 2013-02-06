class Property < ActiveRecord::Base
  attr_accessor :commute_score
  attr_accessor :commute_time_to
  attr_accessor :commute_time_from  
  attr_accessible :address, :price, :longitude, :latitude, :commute_score, :commute_time_to, :commute_time_from
end

