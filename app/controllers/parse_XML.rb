class ParseXML
	require 'nokogiri'
		
	def self.get_duration (response_arg)
		@doc = Nokogiri::XML(response_arg)

		 durations = @doc.xpath("//duration")
		 return durations[0].content
		 
		 #convert to number.
		 #puts durations[0].content.to_s.to_i + 7
	end
end


