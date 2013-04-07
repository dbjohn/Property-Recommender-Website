require_dependency 'amenity_calc'

#puts AmenityCalc.amenity_score_calc()
#override default
# puts AmenityCalc.amenity_score_calc(a={"d"=>12,"e"=>5457})

#use constants?
amenity_types = ["supermarket", "convenience_shop", "restaurant", "library", "bank"] 
transport_modes = ["CAR", "TRANSIT,WALK", "WALK"]

properties = Property.all
#TODO: Need to update to add the weights?
AmenityCalc.amenity_score_calc(properties, amenity_types, transport_modes)
#we save these default amenity scores permanently with the properties.
properties.each {|p| p.save}

