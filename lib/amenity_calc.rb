class AmenityCalc

		#default weights in place.
		#TODO: ADD reference to weights constant as default value.
		#weights argument equals the default amenity weights constant in initializers for its default value
		 def self.amenity_score_calc(properties, amenity_types, transport_modes, weights=DEFAULT_AMENITY_WEIGHTS)															
				transport_weight = 1.0/transport_modes.length
				
				properties.each do |p| 				
						total = 0							
						amenity_types.each do |a|
								transport_modes.each do |t|
										
									score = PropertiesAmenity.where(:property_id => p.id, :amenity_type => a, :transport_mode => t).order("amenity_score desc").pluck(:amenity_score).first
									#get top three scores?
									
									#the concatenation of _weight value is a bit of a hack but it is required because the html names of the 
									# amenity weighting table data elements were given this suffix.
									total += score * (weights[a + "_weight_value"].to_f/100.0) * transport_weight																															
									
								end
						end						
				
						Property.update(p.id, :amenity_score => total)				
						#does this save - double check
				end								
		end
	
end