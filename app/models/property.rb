class Property < ActiveRecord::Base
  attr_accessor :commute_score
  attr_accessible :address, :price, :longitude, :latitude, :commute_score
end
