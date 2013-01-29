begin

		#for long and lat accuracy. 5 decimal place is good. 4th is probably acceptable too.
		# so aim for coords like: 127.34243	
	
	def generate_random_array(min, max, no_of_elements)		
		total_diff = max - min 		
		prev_number = min 
		acc = 0.0		#accumulating gap - helps achieve even distribution
		divisor = total_diff/no_of_elements
		i = 1
		ret_array = []
	
		no_of_elements.times {
			
			new_num  = rand(prev_number..(prev_number + (divisor + acc)))						
			ret_array << '%.5f' % new_num
			
		#	puts ret_array[i-1]
			
			prev_number = new_num
			acc = (min + (divisor * i)) - new_num
			i += 1		
			}
			
		return ret_array
	end		
			
end	

