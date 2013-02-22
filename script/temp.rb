a= DublinOsmPoint.find_by_sql("select cast(ST_Y(ST_Transform(way,4326)) as numeric) as lat, cast(ST_X(ST_Transform(way,4326)) as numeric) as long from dublin_osm_point where osm_id = 1138502634").first

puts a.lat