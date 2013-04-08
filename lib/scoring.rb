# This class contains 4 methods for managing the scoring component of the application:
# travel_score_calc, distance_decay_function, match_score_calc, total_score_calc

class Scoring
		
		#Method travel_score_calc will calculate the travel score given a "to" and "from" travel time
		# it first gets the average of the two score and then calls distance decay function with that average		
		def self.travel_score_calc(to, from)	

			# if the to or from times are less than zero, typically -1 from OTP Batch Analyst, then
			# simply return a score of zero. OTP batch analyst gives -1 as a score for rejected individuals
			if(to < 0 or from < 0)
					return 0				
			else
					average = (to.to_f + from.to_f) / 2.0	#get average
					return distance_decay_function(average)								
			end
		end
		

		# Method distance_decay_function uses a linear function to calculate the travel score given a travel time
		# higher times give lower score, lower times give higher scores
		# if the number supplied is les than zero or greater than 120 mintues then a score of zero is returned.
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
					property.match_score = ((no_of_properties - index)/no_of_properties.to_f)*100.0					
			end
		end
		
		def self.total_score_calc(properties)
				properties.each_with_index do |property, index|						
						#compact: removes nils. Just in case. 
						scores = [property.match_score, property.commute_score, property.amenity_score].compact
						property.total_score = scores.sum/scores.length
				end
		end
	
end