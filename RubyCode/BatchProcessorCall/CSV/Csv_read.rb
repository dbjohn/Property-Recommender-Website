require 'csv'

def read_csv
	lines =[]
	i =0
	File.open("./out.csv") do |file|
		file.each do |line|
			#lines [i] = line.chomp.split(/*\,*/)		
			lines [i] = CSV.parse(line)
			p lines[i]
			i +=1		
		end
	end		
	return lines
end