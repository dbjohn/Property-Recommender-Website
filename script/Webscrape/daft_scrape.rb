#John see Tips 
#http://ruby.bastardsbook.com/chapters/html-parsing/
# we can safely assume that all places are being let because that is what we searched for
# keep an eye on disk usage.

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

doc = Nokogiri::HTML(open('./example.html'))


 # address = doc.css('#address_box h2').first.content
 # address_fields = address.split(',')
 

  # if address_fields.length <= 4 then
 
		 # #we don't know how many fields there are but there must be 4 or less.
		 # #the last 2 address fields, generally postal district (e.g. Dublin 4) and area (e.g. Ranelagh) are the most important for searching.
		 # # Most addresses seem to have a minimum of 2 fields so a4 and a3 will nearly always be populated. The other two might be nil, in which case we will ignore later.
		 # a4, a3, a2, a1 = address_fields.reverse
		 # puts a4 unless a4 == nil
		 # puts a3 unless a3 == nil
		 # puts a2 unless a2 == nil
		 # puts a1 unless a1 == nil 
	# else
	# #skip
# end
 
 
 #NEED to parse the price - weekly? month? set to float
 # price = doc.css('#smi-summary-items div').first.content
 # puts price
 
# summary_set = doc.css('#smi-summary-items span.header_text') 
# puts property_type = summary_set[0].content
# puts no_of_bedrooms = summary_set[1].content
# puts no_of_bathrooms = summary_set[2].content
#just let them be nil, if they are not provided. E.g. studio apartments don't provide bedroom or bathroom numbers, so just let this field be nil for them.

#present?

 
 
 # script1 = doc.css('body #container #content script')[1]
 # puts script1
 
 # puts script1.to_s.index("latitude")
 # puts script1.to_s.index("longitude")
 
 # a regular expression to get the latitude and longitude from the string. Grouping is used for the digits so that the values can 
 # be retrieved from the match data object afterwards using array [] notation.
  
 # md = /"latitude":"(\d+\.\d+)","longitude":"(-\d+\.\d+)"/.match(script1.to_s)
 
 # puts "lat is #{md[1]} long is #{md[2]} "
 
 
 
 
 
 
 #you could use the paragraph summary from the search pages.
 
 #could use this strategy to check whether it exists before creating 
# property = Property.where(:daft_id => id).first_or_create()
 # property.update_attributes(.......)
 