
class ParseXML
	require 'nokogiri'
	
	def initialize 
	 
	 @doc = Nokogiri::XML(File.open("test.xml"))

	 durations = @doc.xpath("//duration")
	 puts durations[0].content.to_s
	 
	 #convert to number.
	 #puts durations[0].content.to_s.to_i + 7
	 
	end
end

ParseXML.new

