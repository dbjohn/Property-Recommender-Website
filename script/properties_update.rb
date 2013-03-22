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