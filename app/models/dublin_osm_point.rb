class DublinOsmPoint < ActiveRecord::Base
  
  set_table_name 'dublin_osm_point'
  set_primary_key 'osm_id'
  
  
   has_many :properties_amenities
  has_many :properties, :through => :properties_amenities
end
