#This is to update the properties data after new columns were added.


#credit to Kent Fredric for this random string generator
#http://stackoverflow.com/questions/88311/how-best-to-generate-a-random-string-in-ruby
def randomString
	(0...8).map{(65+rand(26)).chr}.join
end


#credit to Mladen Jablanović for this random date generator
# http://stackoverflow.com/questions/4894198/how-to-generate-a-random-date-in-ruby
def time_rand from = 0.0, to = Time.now
  Time.at(from + rand * (to.to_f - from.to_f))
end

# 5.times do
	# #puts "hi"
	# puts time_rand( Time.local(2013, 1, 1), Time.local(2015, 1, 1)).strftime("%F")
# end

property_types=[ "Apartment", "House", "Studio Apartment", "Flat"]
lease_types =["No Lease", "3 Month Lease", "6 Month Lease", "9 Month Lease", "1 Year Lease", "2 Year Lease", "3 Year Lease"]

#puts Property.all
Property.all.each do |prop|
	#puts p.name
	prop.address_line1 = randomString()
	prop.address_line2 = randomString()
	prop.address_line3 = randomString()
	prop.town_or_city = randomString()
	prop.county = randomString()
	prop.address_line1 = randomString()
	prop.number_of_bedrooms = rand(1..6)
	prop.property_type = property_types[rand(0..(property_types.length-1))]
	prop.move_in_date = time_rand(Time.local(2013, 1, 1), Time.local(2015, 1, 1)).strftime("%F")
	prop.lease_type = lease_types[rand(0..(lease_types.length-1))]
	#credit to tokland for this way of picking a random boolean
	#http://stackoverflow.com/questions/8012746/best-way-of-returning-a-random-boolean-value
	prop.parking = [true, false].sample
	prop.washing_machine = [true, false].sample
	prop.dryer = [true, false].sample
	prop.microwave = [true, false].sample
	prop.dishwasher = [true, false].sample
	prop.internet = [true, false].sample	
	prop.save
end

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


# p_id = Property.first.id
  
# amenity_id = DublinOsmPoint.first.id
# PropertiesAmenity.new(:property_id => p_id, :dublin_osm_point_id => amenity_id , :amenity_type => "test", :to_travel_time => 121.4, :from_travel_time => 132.5, :amenity_score => 67.3 ).save
# require 'csv'
# require_dependency 'scoring'

# def convert_seconds_to_minutes (seconds)
		# return seconds.to_f/60.0			
# end
	
# #	puts Scoring.travel_score_calc( 100, 100)																					
# begin	
	# Dir.glob(Rails.root.join("other_files/Amenities/output_results/*out.csv")) do |dir_file| 							
		# File.open(dir_file, 'r') do |file| 							
					 # filename=  File.basename(file)
					 # # puts filename
					 # # puts filename.index('_')
					 
					
					 # property_id= filename.slice(0...(filename.index('_'))).to_i
					 # # puts property_id
					 
					 # # line = CSV.parse(file.gets)
							# # puts line

						# amenities_array = [ ]
						
						# #credit to user Travis for pointing out this way of creating a hash with a default format.
						# #http://stackoverflow.com/questions/9234038/append-a-value-in-a-hash-object-in-ruby-using-an-already-existing-key					
						# amenities_hash = Hash.new { |hash, key| hash[key] = [] }
						# #in this case, an array is used. This allows us to loop through the lines and they will be allocated to the correct array in the hash depending on their label (amenity type).

						
						# csv_array=CSV.read(file) #read in all lines into an array
						# #drop the field labels on the first row and iterate over the rest
						
						# csv_array.drop(1).each do |line|
					
						
								 # amenity = DublinOsmPoint.find(line[0].slice(0...(line[0].index('_'))))       #use slice index -1 to get end of string 
								 # amenity.to_travel_time = convert_seconds_to_minutes( line[4].to_f)
								 # amenity.from_travel_time =  convert_seconds_to_minutes( line[5].to_f)
															
								 # amenity.travel_score = Scoring.travel_score_calc( amenity.to_travel_time, amenity.from_travel_time)																					
								 # # puts ("travel score: " + amenity.travel_score.to_s)
								# amenity.amenity_type = line[0].slice((line[0].index('_')+1)..-1)
								# amenities_hash[amenity.amenity_type] << amenity
						# end
						
						# #amenities_array.sort!
						
						# #All amenities of a certain type are in a group which is first sorted. Then set the value of the property for each amenity type to the top amenity instance of that group.
						# amenities_hash.each_value do |amenity_group|
								# amenity_group.sort!
								# PropertiesAmenity.new(:property_id => property_id, :dublin_osm_point_id => amenity_group[0].id, :amenity_type => amenity_group[0].amenity_type, :to_travel_time => amenity_group[0].to_travel_time, :from_travel_time => amenity_group[0].from_travel_time, :amenity_score => amenity_group[0].travel_score).save						
						# end
						
						
						
						# # puts "0---------------------------------------------------------------------------"
						# # p amenities_array[0].to_travel_time
						# # p amenities_array[0].from_travel_time
						# # p amenities_array[0].travel_score
						# # p amenities_array[0]
						# # puts "---------------------------------------------------------------------------"
						# # puts "1---------------------------------------------------------------------------"
						# # p amenities_array[1].to_travel_time
						# # p amenities_array[1].from_travel_time
						# # p amenities_array[1].travel_score
						# # p amenities_array[1]
						# # puts "---------------------------------------------------------------------------"
						
						# #PropertiesAmenity.new(:property_id => property_id, :dublin_osm_point_id => amenities_array[0].id, :amenity_type => "test", :to_travel_time => amenities_array[0].to_travel_time, :from_travel_time => amenities_array[0].from_travel_time, :amenity_score => amenities_array[0].travel_score).save
		
			 # end
	# end
	
	# #inspect results with PropertiesAmenity.all.each {|ele| p ele}
	# #PropertiesAmenity.delete_all

# end

