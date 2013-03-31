#Script must be run from webscrape folder.

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
daft_url = "http://www.daft.ie" 
next_link ='/searchrental.daft?s[cc_id]=ct1&search=1'


#write to file example
# doc = Nokogiri::HTML(open('http://www.daft.ie/searchrental.daft?id=1324883'))
# File.open("example3.html", "w") {|f| f.write(doc)}

#advice from here for this simple technique for reading a file into string in one go
#http://stackoverflow.com/questions/130948/ruby-convert-file-to-string
# file = File.open("example.html", "rb") 
# doc = file.read



# summary_set = doc.css('#smi-summary-items span.header_text') 


 # script = doc.css('script').first.text
 # puts script

# link = start link
# startLoop 
 # # doc = Nokogiri::HTML(open('./search_results_page/Daft.ie   Search Results.htm')) 
 # doc = Nokogiri::HTML(open(link)) 
     
 # #"http://www.daft.ie/searchrental.daft?search=1&s[cc_id]=ct1&s[search_type]=rental&s[refreshmap]=1&offset=0&limit=10&search_type=rental&offset=10

 

 
index = 0


def save_file(doc, link, folder, index=0)
	if folder == "properties"
		md = /.*id=(\d+)/.match(link)
		filename = md[1]
		puts filename
	else
		filename = index
	end
	puts "filename: " + "./#{folder}/#{filename}.html"
	File.open("./#{folder}/#{filename}.html", "w") {|f| f.write(doc)}
 end

 
loop do
	search_page = Nokogiri::HTML(open(daft_url + next_link)) 
	 	
	save_file(search_page, next_link, "search_pages",index)
	
	property_links = search_page.css('.box h2 a')
	
	property_links.each_with_index do |l, index| 	
			
		property_page = Nokogiri::HTML(open(daft_url + l['href']))
		save_file(property_page, l['href'],"properties")	
	end			
		
	next_link = search_page.css('.paging li').last.children[0]
	#break if it is not a link, which means it is the last page
	break if next_link.name != "a" or index == 1
	
	next_link = next_link['href']
	index += 1	
end
 # puts script1
 
 
 # puts script1.to_s.index("latitude")
 # puts script1.to_s.index("longitude")
 
 # md = /"latitude":"(\d+\.\d+)","longitude":"(-\d+\.\d+)"/.match(script1.to_s)
 
 # puts "lat is #{md[1]} long is #{md[2]} "
 
 
 
 # you can get the address in tag with id address_box
 # check that it contains dublin after last comma
 # how to organise addresses...names
 
 