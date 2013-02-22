directory = "/media/sf_Main/property_site/other_files/properties/"

 ActiveRecord::Base.connection.execute("copy (select id as label, latitude as lat, longitude as long, 0 as input from properties) to '#{directory}all_properties.csv' CSV HEADER;")