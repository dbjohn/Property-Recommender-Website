#the webscraping process involves running the following 3 scripts in this order:
#1. rails runner script/Webscrape/download_daft_pages.rb
#2. rails runner script/Webscrape/scrape_search_pages.rb
#3. rails runner script/Webscrape/scrape_property_pages.rb

#This script downloads the search results pages for lettings in Dublin City. The search pages are stored in the search_pages directory
#On each search result page there is a link to about 10 property pages. Each of these pages is downloaded and put in the properties direcotory.
#each search page is given a unique filename based on an incrementing index. 
#each property page is given a unique file name based on its unique daft id.
#Script must be run from webscrape folder.
#The script will first delete any old property page and search page files from the output directories: search_pages/*.html and properties/*.html

#the advantage of saving these to files is that it makes re-running the process easier. Such as in case of a mistake in parsing the pages, saves bandwidth/network costs

require 'nokogiri'
require 'open-uri'

#save it to a file to reduce network traffic when retesting
daft_url = "http://www.daft.ie" 
next_link ="/searchrental.daft?s[cc_id]=ct1&search=1"
 
webscrape_dir ="/media/sf_Main/Webscrape_data"
 
index = 1
limit = 50 #limit is used to specific how many search pages to process. If no limit is desired, just use -1 or 0 or a ruby maximum integer constant.


def get_daft_id(link)
	md = /.*id=(\d+)/.match(link)
	daft_id = md[1]
end

def save_property_file(dir, doc, id)	
	
	# puts filename
			
	File.open(File.join(dir, "properties/#{id}.html"), "w") {|f| f.write(doc)}
 end
 
 def save_search_file(dir, doc, index)				
	File.open(File.join(dir, "search_pages/#{index}.html"), "w") {|f| f.write(doc)}
 end

 #delete the previous files

properties_output_directory = File.join(webscrape_dir,"properties/*.html")

Dir.glob(properties_output_directory) do |file| 
	File.delete(file)
end

search_output_directory = File.join(webscrape_dir,"search_pages/*.html")

Dir.glob(search_output_directory) do |file| 
	File.delete(file)
end

 
loop do
	search_page = Nokogiri::HTML(open(daft_url + next_link)) 
	 	
	save_search_file(webscrape_dir, search_page,index)
	
	property_links = search_page.css('.box h2 a')
	
	property_links.each_with_index do |l, index| 	
			
		property_page = Nokogiri::HTML(open(daft_url + l['href']))
		daft_id = get_daft_id(l['href'])
		save_property_file(webscrape_dir, property_page, daft_id)	
	end			
		
	next_link = search_page.css('.paging li').last.children[0]
	#break if it is not a link, which means it is the last page
	break if next_link.name != "a" or index == limit
	
	next_link = next_link['href']
	index += 1	
end

 
 