module AmenityCalc

		 def self.amenity_score_calc(weights={"supermarket"=>0.3, "convenience_shop" => 0.2, "restaurant"=>0.1, "library" => 0.1, "bank"=>0.1 })															
				Property.all.each do |p| 
							total = 0
							amenities=PropertiesAmenity.where(:property_id => p.id)
							amenities.each do |a|
									total += a.amenity_score * weights[a.amenity_type]
							end
							Property.update(p.id, :amenity_score => total)					
				end								
		end
	
end