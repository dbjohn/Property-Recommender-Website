class Property
	attr_accessor :name, :location, :commute_score
	
	def initialize(name, coordinates, score)
		@name =name
		@location = coordinates
		@commute_score = score
	end
	
	def <=> (property_2)
		if commute_score < property_2.commute_score
			return -1
		elsif commute_score > property_2.commute_score
			return 1
		else
			return 0
		end
	end
end