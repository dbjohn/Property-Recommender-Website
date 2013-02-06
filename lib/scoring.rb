def score_calc(to, from)	
	#average = ((to.to_f + from.to_f) / 2.0)
	average = (to.to_f + from.to_f) / 2.0
	return distance_decay_formula(average)	
end

def distance_decay_formula(num)
    if(num >= 0 and num <= 120)
		return (-5/6.0)*(num) + 100
	else
		return 0
	end
end
