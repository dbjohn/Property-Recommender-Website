require_dependency 'amenity_calc'

#puts AmenityCalc.amenity_score_calc()
#override default
# puts AmenityCalc.amenity_score_calc(a={"d"=>12,"e"=>5457})

amenity_types = ["supermarket", "convenience_shop", "restaurant", "library", "bank"] 
transport_modes = ["CAR", "TRANSIT,WALK", "WALK"]

#TODO: Need to update to add the weights?
AmenityCalc.amenity_score_calc(Property.all, amenity_types, transport_modes)
