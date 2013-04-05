#John see Tips 
#http://ruby.bastardsbook.com/chapters/html-parsing/
# we can safely assume that all places are being let because that is what we searched for
# keep an eye on disk usage.

require 'nokogiri'
require 'open-uri'


properties_directory = "/media/sf_Main/Webscrape_data/properties"
 
def get_property_type(summary_set)
	property_type = summary_set[0].content
	
end

def get_no_of_bedrooms(summary_set)	
 	md = /(\d+).+/.match(summary_set[1].content)
	no_of_bedrooms = md[1]
end 

def get_no_of_bathrooms(summary_set)
	md = /(\d+).+/.match(summary_set[2].content)
	no_of_bathrooms = md[1]	 
end

def get_summary_set(doc)
	summary_set = doc.css('#smi-summary-items span.header_text') 
end
 
def get_addresses(doc) 
	address = doc.css('#address_box h2').first.content
	address_fields = address.split(',') 
	
 
		 # #we don't know how many address fields there are but we will store 4 or less.
		 # #the last 2 address fields, generally postal district (e.g. Dublin 4) and area (e.g. Ranelagh) are the most important for searching.
		 # Most addresses seem to have a minimum of 2 fields so a4 and a3 will nearly always be populated. The other two might be nil, in which case we will ignore later when outputing the address in the results page.
		 # To restate it, if the address_fields array has more than 4 fields, then only the 4 most important are taken.
		  a4, a3, a2, a1 = address_fields.reverse
		 # puts a4 unless a4 == nil
		 # puts a3 unless a3 == nil
		 # puts a2 unless a2 == nil
		 # puts a1 unless a1 == nil 
	# else
	# #skip
		return [a1,a2,a3,a4].map {|a| a.strip unless a==nil}
	
	
	#remove any leading or trailing whitespace before returning the array
	
end
 
 
 # a regular expression to get the latitude and longitude from the string. Grouping is used for the digits so that the values can 
 # be retrieved from the match data object afterwards using array [] notation.
 def get_lat_long(doc) 
	script1 = doc.css('body #container #content script')[1]
	lat_lon = /"latitude":"(\d+\.\d+)","longitude":"(-\d+\.\d+)"/.match(script1.to_s)
	# puts "lat is #{lat_lon[1]} long is #{lat_lon[2]} "
 end
 
 
 def get_lease(doc)
	lease = doc.css('#smi-tab-overview .description_block div').children[2].text.strip
 end
 
 def get_facilities(doc)
	facilities_hash = {"Parking"=>false, "Central Heating"=>false, "House Alarm"=>false, "Cable Television"=>false, 
	"Washing Machine"=>false, "Dryer"=>false, "Dishwasher"=>false, "Microwave"=>false, "Internet"=>false}
 
	facilities = doc.css('#facilities li').map {|f| f.text.strip}
	facilities.each {|f| facilities_hash[f] = true}
	return facilities_hash
 end
 
 def get_price(doc)
   
  price = doc.css('#smi-summary-items div').first.content
  
  md = /(\d+\S*)+\s*(.*)/.match(price)
  amount = md[1].delete(',').to_i #remove commas
  
  #most amounts are monthly, although some are weekly, so we convert those to monthly.
  if(md[2] == "Weekly")	
	monthly_price = amount * 4  #not completely a accurate monthly amount but will suffice for now
  else
	monthly_price = amount
  end
  
end
 # summary_set = get_summary_set(doc)
 # puts property_type = get_property_type(summary_set)
 # puts no_of_bedrooms = get_no_of_bedrooms(summary_set)
 # puts no_of_bathrooms = get_no_of_bathrooms(summary_set)
 # puts get_addresses(doc)
  
 # puts get_lease(doc)
 
 # p get_facilities(doc)
 
 
 #need to add more facilities!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!just check again
 
 
 Dir.glob(File.join(properties_directory, "*")) do |file_path| 							
	
	property_file = File.new(file_path)
	daft_id =  File.basename(property_file, '.*')	#'.* removes any file extension at the end of file.
	property_html = Nokogiri::HTML(open(property_file))
		# puts doc.class.name
		# puts doc.inspect
	puts "--------------------------------"	
	puts daft_id
		
	# puts get_lease(property_html)
	property = Property.where(:daft_id => daft_id).first
	# property = Property.new
	
	#It may have been better to write this assignment of values to the property's attributes 
	#using update_attributes method. In any case, it works as is, and not worth the rewrite yet.
	latlon = get_lat_long(property_html)
	# p property
	
	property.latitude = latlon[1]
	property.longitude = latlon[2]
	
	
	addresses = get_addresses(property_html)
	
	property.address_line1 = addresses[0]
	property.address_line2 = addresses[1]
	property.address_line3 = addresses[2]
	property.address_line4 = addresses[3]
	
	property.price = get_price(property_html)
	
	summary_set = get_summary_set(property_html)
	#if this data is not provided, we just store the result as nil. E.g. studio apartments don't provide bedroom or bathroom numbers, so just let this field be nil for them. There is nothing else we can do.
	property.number_of_bedrooms = get_no_of_bedrooms(summary_set) unless summary_set.length < 2
	property.number_of_bathrooms = get_no_of_bathrooms(summary_set) unless summary_set.length < 2
	property.property_type = get_property_type(summary_set)	
	property.lease_type = get_lease(property_html)
	
	facilities = get_facilities(property_html)
	property.parking = facilities["Parking"]
	property.washing_machine = facilities["Washing Machine"]	
	property.dryer = facilities["Dryer"]	
	property.microwave = facilities["Microwave"]	
	property.central_heating = facilities["Central Heating"]	
	property.house_alarm = facilities["House Alarm"]	
	property.cable_television = facilities["Cable Television"]	
	property.dishwasher = facilities["Dishwasher"]	
	property.internet = facilities["Internet"]	
	property.save
	# p property
		
	
 end