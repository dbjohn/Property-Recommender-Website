require 'csv'
require './Csv_read'
require './property'

def generate_rand_properties_array
	array_properties = []
	3.times do |index|
		lon = rand(0..1000)		
		lat = rand(0..1000)		
		score = rand(0..1000)		
		random_string = (0...8).map{65.+(rand(26)).chr}.join #credit to Kent Fredric for coming up with this random string generator here: http://stackoverflow.com/questions/88311/how-best-to-generate-a-random-string-in-ruby
		array_properties  << Property.new(random_string, [lon,lat], score)
	end	
	return array_properties
end

# read_csv

puts "hello"
properties_array = generate_rand_properties_array

	lines =[]
	i =0
	j=0
	
#File.open("./out.csv") do |file|
File.open("C:/Users/John/Google_Drive/Folders_from_Skydrive/DIT/Year_4/Final_year_project/Property_site/source_code/Main/property_site/RubyCode/BatchProcessorCall/CSV/out.csv") do |file|
	file.each do |line|			
			if i != 0
				lines [i] = CSV.parse(line)
			    properties_array[j].commute_score = lines[i][0][4]
				j	+=1
			end
			i +=1					
		end	
end

p properties_array


