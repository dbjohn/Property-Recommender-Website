directory = "/media/sf_Main/property_site/other_files/properties/"

#export properties in ascending order of id
ActiveRecord::Base.connection.execute("copy (select id as label, latitude as lat, longitude as long, 0 as input from properties order by id asc) to '#{directory}all_properties.csv' CSV HEADER;")
 