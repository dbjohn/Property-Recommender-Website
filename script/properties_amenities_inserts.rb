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
require 'csv'
require_dependency 'scoring'

def convert_seconds_to_minutes (seconds)
		return seconds.to_f/60.0			
end
	
#	puts Scoring.travel_score_calc( 100, 100)																					
begin	
	Dir.glob(Rails.root.join("RubyCode/BatchProcessorCall/CSV/OTP_files/Amenities/*out.csv")) do |dir_file| 							
		File.open(dir_file, 'r') do |file| 							
					 filename=  File.basename(file)
					 # puts filename
					 # puts filename.index('_')
					 property_id= filename.slice(0..(filename.index('_'))).to_i
					 # puts property_id
					 
					 # line = CSV.parse(file.gets)
							# puts line
						
						
						
						amenities_array = [ ]
						
						csv_array=CSV.read(file) #read in all lines into an array
						#drop the field labels on the first row and iterate over the rest
						csv_array.drop(1).each do |line|
								
								
								amenity = DublinOsmPoint.find(line[0].slice(0..line[0].index('_')))       #use slice index -1 to get end of string
								amenity.to_travel_time = convert_seconds_to_minutes( line[4].to_f)
								amenity.from_travel_time =  convert_seconds_to_minutes( line[5].to_f)
															
								amenity.travel_score = Scoring.travel_score_calc( amenity.to_travel_time, amenity.from_travel_time)																					
								# puts ("travel score: " + amenity.travel_score.to_s)
								amenities_array << amenity
								
						end
						
						amenities_array.sort!
						
						# puts "0---------------------------------------------------------------------------"
						# p amenities_array[0].to_travel_time
						# p amenities_array[0].from_travel_time
						# p amenities_array[0].travel_score
						# p amenities_array[0]
						# puts "---------------------------------------------------------------------------"
						# puts "1---------------------------------------------------------------------------"
						# p amenities_array[1].to_travel_time
						# p amenities_array[1].from_travel_time
						# p amenities_array[1].travel_score
						# p amenities_array[1]
						# puts "---------------------------------------------------------------------------"
						
						PropertiesAmenity.new(:property_id => property_id, :dublin_osm_point_id => amenities_array[0].id, :amenity_type => "test", :to_travel_time => amenities_array[0].to_travel_time, :from_travel_time => amenities_array[0].from_travel_time, :amenity_score => amenities_array[0].travel_score).save
		
			 end
	end
	
	#inspect results with PropertiesAmenity.all.each {|ele| p ele}
	#PropertiesAmenity.delete_all

end

