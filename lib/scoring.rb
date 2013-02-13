module Scoring

		def self.commute_score_calc(to, from)	
			#average = ((to.to_f + from.to_f) / 2.0)
			average = (to.to_f + from.to_f) / 2.0
			return distance_decay_formula(average)	
		end

		def self.distance_decay_formula(num)
			if(num >= 0 and num <= 120)
				return (-5/6.0)*(num) + 100
			else
				return 0
			end
		end
		
		
		def self.match_score_calc(properties)
			no_of_properties = properties.length 
			properties.each_with_index do |property, index|
					property.match_score = ((no_of_properties - index)/no_of_properties.to_f)*100.0
			end
		end
		
		def self.total_score_calc(properties)
				properties.each_with_index do |property, index|
						property.total_score =	(property.match_score + property.commute_score)/2.0
				end
		end
	
end