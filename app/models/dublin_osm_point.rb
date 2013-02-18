class DublinOsmPoint < ActiveRecord::Base
  
  attr_accessor :travel_score, :to_travel_time, :from_travel_time, :amenity_type
  attr_accessible :travel_score, :to_travel_time, :from_travel_time, :amenity_type
  
  set_table_name 'dublin_osm_point'
  set_primary_key 'osm_id'
   
   has_many :properties_amenities
   has_many :properties, :through => :properties_amenities
   
   #This comparator enables sorting in descending order.
   	def <=> (point_2)
				if travel_score > point_2.travel_score
					return -1
				elsif travel_score < point_2.travel_score
					return 1
				else
					return 0
				end
		end
end
