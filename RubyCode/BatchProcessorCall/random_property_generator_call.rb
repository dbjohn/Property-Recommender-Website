#for long and lat accuracy. 5 decimal place is good. 4th is probably acceptable too.
# so aim for coords like: 127.34243

begin	
	require './random_property_generator.rb'

	no_of_records = 10000
	min_long = -122.6510	
	max_long = -122.5000
	min_lat = 45.4921
	max_lat = 45.5470	

	array_long = generate_random_array(min_long, max_long, no_of_records)
#	puts "array long"
#	p array_long
	array_long = array_long.shuffle
	
	array_lat = generate_random_array(min_lat, max_lat, no_of_records)
	array_lat = array_lat.shuffle
	
	#open and delete all content(empty block)
	File.open('./temp.csv', 'w'){}
			
	f = File.open('./temp.csv', 'a')
	f.puts("label,lat,lon,input")
	
	no_of_records.times do |index|				
		f.puts("d#{index},#{array_lat[index]},#{array_long[index]},0")
	end
	
	#file = File.open("./temp.csv", "w")
	#file.write(coordinates_array) 	
	
	rescue IOError => e	
		puts e.message
		puts e.backtrace
	ensure
		f.close unless f == nil			
end	

