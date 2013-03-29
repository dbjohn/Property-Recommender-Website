class Scoring

		def self.travel_score_calc(to, from)	
			#average = ((to.to_f + from.to_f) / 2.0)
			if(to < 0 or from < 0)		#need this check, for bad data for -1, and bug with OTP filters.
					return 0				
			else
					average = (to.to_f + from.to_f) / 2.0
					return distance_decay_function(average)						
			
			end
		end

		def self.distance_decay_function(num)
			if(num >= 0 and num <= 120)
				return (-5/6.0)*(num) + 100
			else
				return 0
			end
		end
		
		
		def self.match_score_calc(properties)
			no_of_properties = properties.length 
			properties.each_with_index do |property, index|
					#should be to_i
					property.match_score = ((no_of_properties - index)/no_of_properties.to_f)*100.0
					# Rails.logger.debug "Property #{index} match score, in match score: #{property.match_score}"
			end
		end
		
		def self.total_score_calc(properties)
				properties.each_with_index do |property, index|
						Rails.logger.debug "Property #{index} before total score calc: #{property.to_yaml}"
						Rails.logger.debug "Property #{index} match score, total score calc: #{property.match_score}"
						Rails.logger.debug "Property #{index} commute score, total score calc: #{property.commute_score}"
						Rails.logger.debug "Property #{index} amenity score, total score calc: #{property.amenity_score}"
						property.total_score = (property.match_score + property.commute_score + property.amenity_score)/3.0
				end
		end
	
end