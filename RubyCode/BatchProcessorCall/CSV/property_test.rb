require './property'
require 'benchmark'

# temp = Property.new("name", [2,3], 34)

# puts temp.name
# p temp.location
# puts temp.commute_score
# temp.commute_score = 44
# puts temp.commute_score

array_properties = []

100000.times do |index|
	lon = rand(0..1000)		
	lat = rand(0..1000)		
	score = rand(0..1000)		
	random_string = (0...8).map{65.+(rand(26)).chr}.join #credit to Kent Fredric for coming up with this random string generator here: http://stackoverflow.com/questions/88311/how-best-to-generate-a-random-string-in-ruby
	array_properties  << Property.new(random_string, [lon,lat], score)
end	

#p array_properties.sort


Benchmark.bm do |x|
	 x.report {array_properties.sort}
 end