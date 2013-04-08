#This class contains one method, amenity_score_calc, for calculating the amenity score for property.

class AmenityCalc

	# Method amenity_score_calc will iterate over each property, amenity and transport mode to extract 
	# the best scores from each amenity type and each transport type for each property. It adds this score to an accumulating
	# total before assigning the total to the amenity score attribute of the property object.
	# Scores are between 0 and 100. Each transport mode is treated equal in this implementation.
	# the weights argument is a hash for the amenity type's percentage weight of importance. All values of the elements 
	# of weights should add up to 100.		
	# weights argument equals the default amenity weights constant in initializers for its default value
	# Because this method only gets the top score, it may not be most complete. It would be future modification to get the top 3 best scores instead.	
	
	def self.amenity_score_calc(properties, amenity_types, transport_modes, weights=DEFAULT_AMENITY_WEIGHTS)
			transport_weight = 1.0/transport_modes.length	
			
			properties.each do |p| 				
				total = 0							
				amenity_types.each do |a|
						transport_modes.each do |t|
																
							score = PropertiesAmenity.where(:property_id => p.id, :amenity_type => a, :transport_mode => t).
								order("amenity_score desc").pluck(:amenity_score).first							
							
							# The concatenation of _weight_value string is a bit untidy/inconsistent but it is required because the html names of the 
							# amenity weighting table data elements were given this suffix. So it needs to be able to calculate the weight values
							# when submitted from the search form by resizing the table.
							total += score * (weights[a + "_weight_value"].to_f/100.0) * transport_weight if score
							
						end
				end						
				
				# These values are saved temporarily for each request with assign_attributes.
				# because in case the user has submitted custom amenity weightings, then we don't want to overwrite the amenity score
				# that is stored in property table. Therefore this assignment is temporary when this method is called from the 
				# home_controller for a request. When called for amenity score pre-processing, then the property attributes should be saved to DB.
				p.assign_attributes(:amenity_score => total)				
				
			end								
	end
	
end