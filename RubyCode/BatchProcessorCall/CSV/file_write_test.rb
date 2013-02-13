	#open and delete all content(empty block)
	File.open('./temp.csv', 'w') do |file| 
			
	##f = File.open('./temp.csv', 'a')
	file.puts("label,lat,lon,input,booka")
	file.puts("blahblahblahblahblah,test")
	
	end
	
	#file = File.open("./temp.csv", "w")