require 'csv'
require_dependency 'scoring'
require 'debugger'

def convert_seconds_to_minutes (seconds)
		return seconds.to_f/60.0			
end
	
#	puts Scoring.travel_score_calc( 100, 100)																					
begin	



amenities_path_dir =  Rails.root.join("other_files/Amenities/output_results/")

 #credit here for this tip http://stackoverflow.com/questions/5810782/how-to-get-ruby-dirglob-to-return-basenames-not-absolute-paths
 #change to the directory and retrieve all file/folder names with Dir[*].
 transport_modes = Dir.chdir(amenities_path_dir) {Dir["*"]}   
 transport_modes.each do |mode| 
		Dir.glob(File.join(amenities_path_dir, mode, "*out.csv")) do |dir_file| 							
			File.open(dir_file, 'r') do |file| 												
					filename =  File.basename(file)					 										
					
					property_id = filename.slice(0...(filename.index('_'))).to_i	#would probably be more elegant to use regular expressions.
					amenities_array = [ ]							
					#credit to user Travis for pointing out this way of creating a hash with a default form.
					#http://stackoverflow.com/questions/9234038/append-a-value-in-a-hash-object-in-ruby-using-an-already-existing-key					
					amenities_hash = Hash.new { |hash, key| hash[key] = [] }
					#in this case, an array is used. This allows us to loop through the lines and they will be allocated to the correct array in the hash depending on their label (amenity type).
					#This creates hashes of the following form: {bank => [amenity1, amenity2, amenity3...], supermarket=>[amenity1, amenity2], restaurant=>…etc}
					
					csv_array=CSV.read(file) #read in all lines into an array
					#drop the field labels on the first row and iterate over the rest					
					csv_array.drop(1).each do |line|							
							 amenity = DublinOsmPoint.find(line[0].slice(0...(line[0].index('_'))))       #use slice index -1 to get end of string 
							 amenity.to_travel_time = convert_seconds_to_minutes( line[4].to_f)
							 amenity.from_travel_time =  convert_seconds_to_minutes( line[5].to_f)
														
							 amenity.travel_score = Scoring.travel_score_calc( amenity.to_travel_time, amenity.from_travel_time)																					
							 # puts ("travel score: " + amenity.travel_score.to_s)
							amenity.amenity_type = line[0].slice((line[0].index('_')+1)..-1)
							amenities_hash[amenity.amenity_type] << amenity
					end				
					
					#All amenities of a certain type are in a group which is first sorted. Then set the value of the property for each amenity type to the top amenity instance of that group.
					amenities_hash.each_value do |amenity_group|
							
							amenity_group.sort!							
							#1st
							PropertiesAmenity.create(:property_id => property_id, :dublin_osm_point_id => amenity_group[0].id, :amenity_type => amenity_group[0].amenity_type, 
									:to_travel_time => amenity_group[0].to_travel_time, :from_travel_time => amenity_group[0].from_travel_time,
									:amenity_score => amenity_group[0].travel_score, :transport_mode => mode)
							#2nd		
							PropertiesAmenity.create(:property_id => property_id, :dublin_osm_point_id => amenity_group[1].id, :amenity_type => amenity_group[1].amenity_type, 
									:to_travel_time => amenity_group[1].to_travel_time, :from_travel_time => amenity_group[1].from_travel_time,
									:amenity_score => amenity_group[1].travel_score, :transport_mode => mode)
							#3rd
							PropertiesAmenity.create(:property_id => property_id, :dublin_osm_point_id => amenity_group[2].id, :amenity_type => amenity_group[2].amenity_type, 
									:to_travel_time => amenity_group[2].to_travel_time, :from_travel_time => amenity_group[2].from_travel_time,
									:amenity_score => amenity_group[2].travel_score, :transport_mode => mode)
							#add second and third here...
					end
											
					#PropertiesAmenity.new(:property_id => property_id, :dublin_osm_point_id => amenities_array[0].id, :amenity_type => "test", :to_travel_time => amenities_array[0].to_travel_time, :from_travel_time => amenities_array[0].from_travel_time, :amenity_score => amenities_array[0].travel_score).save	
				 end
		end
	end
	
	#inspect results with PropertiesAmenity.all.each {|ele| p ele}
	#PropertiesAmenity.delete_all

end

