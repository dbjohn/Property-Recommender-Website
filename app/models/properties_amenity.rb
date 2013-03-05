class PropertiesAmenity < ActiveRecord::Base
  attr_accessible :property_id, :dublin_osm_point_id, :amenity_score, :amenity_type, :from_travel_time, :to_travel_time, :transport_mode
  
  belongs_to :property
  belongs_to :dublin_osm_point
end
