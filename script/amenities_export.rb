directory = "/media/sf_Main/property_site/other_files/Amenities/"

 ActiveRecord::Base.connection.execute("copy (select osm_id::text||'_supermarket' as label, round(cast(ST_Y(ST_Transform(way,4326)) as numeric), 5) as lat, round(cast(ST_X(ST_Transform(way,4326)) as numeric), 5) as long, 0 as input from dublin_osm_point where shop like '%supermarket%') to '#{directory}supermarkets.csv' DELIMITER ',' CSV;") 
 
 
  ActiveRecord::Base.connection.execute("copy (select osm_id::text||'_convenience_shop' as label, round(cast(ST_Y(ST_Transform(way,4326)) as numeric), 5) as lat, round(cast(ST_X(ST_Transform(way,4326)) as numeric), 5) as long, 0 as input from dublin_osm_point where shop like 'convenience') to '#{directory}convenience_shops.csv' DELIMITER ',' CSV;")
 
 ActiveRecord::Base.connection.execute("copy (select osm_id::text||'_bank' as label, round(cast(ST_Y(ST_Transform(way,4326)) as numeric), 5) as lat, round(cast(ST_X(ST_Transform(way,4326)) as numeric), 5) as long, 0 as input from dublin_osm_point where amenity like 'bank') to '#{directory}banks.csv' DELIMITER ',' CSV;")
 
 ActiveRecord::Base.connection.execute("copy (select osm_id::text||'_restaurant' as label, round(cast(ST_Y(ST_Transform(way,4326)) as numeric), 5) as lat, round(cast(ST_X(ST_Transform(way,4326)) as numeric), 5) as long, 0 as input from dublin_osm_point where amenity like 'restaurant') to '#{directory}restaurants.csv' DELIMITER ',' CSV;")
 
 ActiveRecord::Base.connection.execute("copy (select osm_id::text||'_library' as label, round(cast(ST_Y(ST_Transform(way,4326)) as numeric), 5) as lat, round(cast(ST_X(ST_Transform(way,4326)) as numeric), 5) as long, 0 as input from dublin_osm_point where amenity like 'library') to '#{directory}libraries.csv' DELIMITER ',' CSV;")
 
 
 #Credit to Brian Candler for this simple suggestion here http://www.ruby-forum.com/topic/169194
 system("cat #{directory}*.csv > #{directory}combined_file.csv")