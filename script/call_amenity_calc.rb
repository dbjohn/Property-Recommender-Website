require_dependency 'amenity_calc'


#puts AmenityCalc.amenity_score_calc()

#override default
# puts AmenityCalc.amenity_score_calc(a={"d"=>12,"e"=>5457})
AmenityCalc.amenity_score_calc()

Property.all.each {|py| p py}