class Property < ActiveRecord::Base
#You need to update these attributes. remove address
  attr_accessor :commute_score, :commute_time_to, :commute_time_from, :match_score, :total_score
  
  attr_accessible :address_line1, :address_line2,:address_line3, :address_line4, :number_of_bedrooms, :number_of_bathrooms, :move_in_date, :description, :property_type, :lease_type, :parking, 
				  :washing_machine, :dryer, :microwave, :dishwasher, :internet, :daft_id, :house_alarm, :central_heating, 
				  :cable_television, :price, :longitude, :latitude, :amenity_score, :commute_score, :commute_time_to, :commute_time_from, :match_score, :total_score
  
  
  has_many :properties_amenities
  has_many :dublin_osm_points, :through => :properties_amenities
  
  #The use case for total_score presents properties in descending order of total score.
  # So the comparator can be defined to enable this which saves reversing the array in the default case (ascending)
  
	def <=> (property_2)
				if total_score > property_2.total_score
					return -1
				elsif total_score < property_2.total_score
					return 1
				else
					return 0
				end
		end
		
	#old comparator for commute_score
		# def <=> (property_2)
				# if commute_score < property_2.commute_score
					# return -1
				# elsif commute_score > property_2.commute_score
					# return 1
				# else
					# return 0
				# end
		# end
end

