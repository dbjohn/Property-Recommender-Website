module AmenityCalc

		#default weights in place.
		 def self.amenity_score_calc(properties, amenity_types, transport_modes, weights={"supermarket"=>0.3, "convenience_shop" => 0.2, "restaurant"=>0.1, "library" => 0.1, "bank"=>0.1 })															
				transport_weight = 1.0/transport_modes.length
				properties.each do |p| 				
						total = 0							
						amenity_types.each do |a|
								transport_modes.each do |t|
										
										score = PropertiesAmenity.where(:property_id => p.id, :amenity_type => a, :transport_mode => t).order("amenity_score desc").pluck(:amenity_score).first
																				
										total += score * weights[a] * transport_weight																															
										
								end
						end
						Property.update(p.id, :amenity_score => total)				
				end								
		end
	
end