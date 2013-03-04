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

 doc = Nokogiri::HTML(open('./example.html'))
 
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
 
 script1 = doc.css('body #container #content script')[1]
 # puts script1
 
 puts script1.to_s.index("latitude")
 puts script1.to_s.index("longitude")