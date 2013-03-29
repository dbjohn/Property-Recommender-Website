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
# File.open("example.html", "w") {|f| f.write(doc)}

#advice from here for this simple technique for reading a file into string in one go
#http://stackoverflow.com/questions/130948/ruby-convert-file-to-string
# file = File.open("example.html", "rb") 
# doc = file.read

# puts file_string
# address = doc.css('title').first.content
# address = doc.css('#address_box h2').first.content
# puts address

doc = Nokogiri::HTML(open('./search_results_page/Daft.ie   Search Results.htm'))
 
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

link = start link
startLoop 
 # doc = Nokogiri::HTML(open('./search_results_page/Daft.ie   Search Results.htm')) 
 doc = Nokogiri::HTML(open(link)) 
     
 #"http://www.daft.ie/searchrental.daft?search=1&s[cc_id]=ct1&s[search_type]=rental&s[refreshmap]=1&offset=0&limit=10&search_type=rental&offset=10
 
 property_links = doc.css('.box h2 a')
 # property_links.each_with_index do |l, index| 
	# #puts index
	# puts l['href']
	doc = open link
	process_property(doc)
# end	
link = doc.css('.paging li a').last['href']
#loop
end
 # puts script1
 
 # puts script1.to_s.index("latitude")
 # puts script1.to_s.index("longitude")
 
 # a regular expression to get the latitude and longitude from the string. Grouping is used for the digits so that the values can 
 # be retrieved from the match data object afterwards using array [] notation.
  
 # md = /"latitude":"(\d+\.\d+)","longitude":"(-\d+\.\d+)"/.match(script1.to_s)
 
 # puts "lat is #{md[1]} long is #{md[2]} "
 
 
 
 # you can get the address in tag with id address_box
 # check that it contains dublin after last comma
 # how to organise addresses...names
 