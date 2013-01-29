begin
	require './random_property_generator.rb'
	
	no_of_records = 100
	min_long = -10.0
	max_long = -100.0
	min_lat = 10.0
	max_lat = 100.0	

	#array_long = generate_random_array(min_long, max_long, no_of_records)
	array_long = generate_random_array(max_long, min_long, no_of_records)
	puts "Hi there"
	p array_long
			
end	

