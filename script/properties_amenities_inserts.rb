# ActiveRecord::Base.establish_connection "development"
# # ActiveRecord::Base.establish_connection(
# # :adapter => "postgresql",
# # :encoding => "unicode",
# # :database => "dublin_osm",
# # :pool => "5",
# # :username => "postgres",
# # :password => "lapp"
# # )
# puts ActiveRecord::Base.connection.select_one(
# "SELECT * FROM dublin_osm_point LIMIT 1")

# p ActiveRecord::Base.connection.select_rows(
# "select osm_id, name, ST_AsText(ST_Transform(way,4326)),amenity from dublin_osm_point where amenity like 'atm'")

# puts "hello"


p_id = Property.first.id
amenity_id = DublinOsmPoint.first.id
  
PropertiesAmenity.new(:property_id => p_id, :dublin_osm_point_id => amenity_id , :amenity_type => "test", :to_travel_time => 121.4, :from_travel_time => 132.5, :amenity_score => 67.3 ).save