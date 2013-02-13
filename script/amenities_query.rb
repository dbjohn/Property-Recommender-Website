ActiveRecord::Base.establish_connection "other"
# ActiveRecord::Base.establish_connection(
# :adapter => "postgresql",
# :encoding => "unicode",
# :database => "dublin_osm",
# :pool => "5",
# :username => "postgres",
# :password => "lapp"
# )
puts ActiveRecord::Base.connection.select_one(
"SELECT * FROM dublin_osm_point LIMIT 1")

p ActiveRecord::Base.connection.select_rows(
"select osm_id, name, ST_AsText(ST_Transform(way,4326)),amenity from dublin_osm_point where amenity like 'atm'")

puts "hello"


properties = Property.all

ps[1].latitude.to_f
