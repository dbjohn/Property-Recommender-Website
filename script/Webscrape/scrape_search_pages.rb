
#This script opens each of the downloaded daft search pages and iterates over each property item on the result page.
#It creates a property record for each result found (generally 10 properties per search result page).
#The daft id, available/move-in date and short property description is taken from these search pages and stored with the property.

require 'nokogiri'
require 'open-uri'

# doc = Nokogiri::HTML(open('http://www.daft.ie/searchrental.daft?id=1312141'))

# Do funky things with it using Nokogiri::XML::Node methods...

####
# Search for nodes by css
# doc.css('h3.r a').each do |link|
# puts link.content
# end

####
# Search for nodes by xpath
# doc.xpath('//h3/a').each do |link|
# puts link.content
# end

####
# Or mix and match.
# doc.search('h3.r a.l', '//h3/a').each do |link|
# puts link.content
# end

#save it to a file to reduce network traffic when retesting
# doc = Nokogiri::HTML(open('http://www.daft.ie/searchrental.daft?id=1324883'))
# File.open("example3.html", "w") {|f| f.write(doc)}

#advice from here for this simple technique for reading a file into string in one go
#http://stackoverflow.com/questions/130948/ruby-convert-file-to-string
# file = File.open("example.html", "rb") 
# doc = file.read

# puts file_string
# address = doc.css('title').first.content
# address = doc.css('#address_box h2').first.content
# puts address

# doc = Nokogiri::HTML(open('./search_results_page/Daft.ie   Search Results.htm'))
 
 #NEED to parse the price - weekly? month? set to float
 # price = doc.css('#smi-summary-items div').first.content
 # puts price
 
# summary_set = doc.css('#smi-summary-items span.header_text') 
# puts property_type = summary_set[0].content
# puts no_of_bedrooms = summary_set[1].content
# puts no_of_bathrooms = summary_set[2].content

# summary_set = doc.css('#smi-summary-items span.header_text') 


 # script = doc.css('script').first.text
 # puts script

# link = start link
# startLoop 
 # # doc = Nokogiri::HTML(open('./search_results_page/Daft.ie   Search Results.htm')) 
 # doc = Nokogiri::HTML(open(link)) 
     
 # #"http://www.daft.ie/searchrental.daft?search=1&s[cc_id]=ct1&s[search_type]=rental&s[refreshmap]=1&offset=0&limit=10&search_type=rental&offset=10
 
 # property_links = doc.css('.box h2 a')
 # # property_links.each_with_index do |l, index| 
	# # #puts index
	# # puts l['href']
	# doc = open link
	# process_property(doc)
# # end	
# link = doc.css('.paging li a').last['href']
# #loop
# end
 # puts script1
 
 # puts script1.to_s.index("latitude")
 # puts script1.to_s.index("longitude")
 
 # a regular expression to get the latitude and longitude from the string. Grouping is used for the digits so that the values can 
 # be retrieved from the match data object afterwards using array [] notation.
  
 # md = /"latitude":"(\d+\.\d+)","longitude":"(-\d+\.\d+)"/.match(script1.to_s)
 
 # puts "lat is #{md[1]} long is #{md[2]} "
 
# delete all properties and recreate.
search_file_directory = "/media/sf_Main/Webscrape_data/search_pages"


#just get property description and id
#update attributes...

def get_daft_id(link)
	md = /.*id=(\d+)/.match(link['href'])
	daft_id = md[1]
end

def get_description_area(box)
	description_area = box.css('.text-block p')
end

def get_description(description_area)
	#Using a regular expression to skip past a dash "-" which seems to have CRLF and white space around it. We just want the main text
		#m enables multiline mode
		# md = /-(.+)/m.match(p.children.last.text)
		md = /-(.+)/m.match(description_area.last.text)
		description = md[1].strip
		 # puts "~~~~~~~~~~~~~~~~~~~"
		# puts description
end

def get_availability(description_area)
	description_area.css('span.availability').text		
end

def get_move_in_date(availability)
	if(availability == "Available Now") then
		move_in_date = Time.now.strftime("%F")
	else		
		md = /(\d+).+\s(.+)/.match(availability)			
		#The time constructor doesn't take the full month name as an argument so we can use
		#Date::monthnames to get the month number from the month name
		#this tip is from user michael_teter at http://www.ruby-forum.com/topic/152629
		move_in_date = Time.new(Time.now.year.to_s,Date::MONTHNAMES.index(md[2]),md[1]).strftime("%F") 			
	end
	# puts move_in_date
end


#Delete all properties in the database first
Property.delete_all()

array =[]
i=0

 Dir.glob(File.join(search_file_directory, "*")) do |search_file| 							
	# puts "hello"
	# puts search_file
	search_page = Nokogiri::HTML(open(search_file)) 
	
	# property_links = search_page.css('.box h2 a')
	#take the first ten because it appears that some boxes aren't properties but embedded advertisements
	property_boxes = search_page.css('.box').take(10)
	
	property_boxes.each do |box| 						
	
		# puts "----------------------------------------------"
		link = box.css('h2 a').first
		# puts link
		# puts property_links.first.class.name
		# puts link.first.class.name
		# md = /.*id=(\d+)/.match(l['href'])
		# id = md[1]
		# puts id
		daft_id = get_daft_id(link)
	 
	    # puts daft_id
		
		array <<daft_id
		i +=1
		
		
		description_area = get_description_area(box)
		
		

		#gets the availability		
		availability = get_availability(description_area)
		
		
		move_in_date = get_move_in_date(availability)
		
		
		description = get_description(description_area)
		
		
		full_description = availability + " - " + description
		# puts full_description
		
		#the daft search pages seem to contain some duplicates. So by using find_or_create_by_daft_id
		# we check first if the property has already been created, if it is then skip it, if is not then it is created.
		Property.find_or_create_by_daft_id( daft_id, :move_in_date => move_in_date, :description => full_description)
		# prop = Property.new(:daft_id => daft_id, :move_in_date => move_in_date, :description => full_description)
		
		# puts prop.to_yaml
		
	end
end
# p array
# puts array.length
# puts i
 

 
 # you can get the address in tag with id address_box
 # check that it contains dublin after last comma
 # how to organise addresses...names
 