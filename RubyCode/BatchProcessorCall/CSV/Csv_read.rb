require 'csv'

# def read_csv
	# lines =[]
	# i =0
	# File.open("./out.csv") do |file|
		# file.each do |line|
			#lines [i] = line.chomp.split(/*\,*/)		
			# lines [i] = CSV.parse(line)
			# p lines[i]
			# i +=1		
		# end
	# end		
	# return lines
# end

def read_csv
	lines =[]
	i =0
	File.open("./out_0_o1.csv", "r") do |file|
		# puts file.gets
		# puts file.gets	
		# puts file.gets
		line = CSV.parse(file.gets)		
		puts line[0][0]
		line = CSV.parse(file.gets)		
		puts line[0][0]
		puts line[0][4]
		puts line[0][5]
		line = CSV.parse(file.gets)		
		puts line[0][0]
		#p CSV.parse(file.gets)		
		# p CSV.parse(file.gets)		
		end	
end

read_csv