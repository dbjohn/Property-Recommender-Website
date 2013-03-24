// I tried to reset the values of the amenity weighting table but there did not seem to be a way to set it programmatically,
// then I tried to remove the table and recreate it when the user chooses to use default settings but that didn't work because
// the colResizable plugin does some functionality on the document loading which needs to occur in order for the table to be
// initialized properly. So the simplest solution is just to show and hide the amenity weighting table with the checkbox click.

$(function(){

$('#datepicker').datepicker();

//$("#collapseOne").collapse({toggle: false});
 $('#options_advanced').change(function(){$('#advanced_options_area').collapse('show');});
 $('#options_simple').change(function(){$('#advanced_options_area').collapse('hide');});
 //set it to simple by default
 $('#options_simple').prop('checked',true);

 //Remove the padding when the collapsed area is hidden.
 //some inspiration from this question http://stackoverflow.com/questions/9137073/change-css-padding-while-collapse
  $('#advanced_options_area').on('hide', function(){
  $('#advanced_options_area').css('padding','0');}).on('show', function(){
  $('#advanced_options_area').css('padding','2%');})
	
	
	//The following colResizable code is based on examples at http://quocity.com/colresizable/#samples
	//this plugin was developed by Alvaro Prieto Lauroba
	//modified to suit the purposes of this project.
    initInputMap();
});

function setUpAmenityWeighting(default_amenity_weights){
	//An object with the proper amenity names is used in the view as it is more presentable and better english. translate from html input ids to proper names.
	var amenity_names_obj = {'supermarket_weight' : 'Supermarket', 'convenience_shop_weight' : 'Convenience Shop', 'restaurant_weight' : 'Restaurant', 'library_weight' : 'Library', 'bank_weight' : 'Bank'}	

		var onSampleResized = function(e){
			var columns = $(e.currentTarget).find("th");
			// var msg = "columns widths: ";
			
			var ranges = {}, total = 0, i, s ="", w;
			for(i = 0; i<columns.length; i++){
				w = columns.eq(i).width()-10 - (i==0?1:0);
				// ranges.push(w);
				total+=w;
				// console.log(columns[i]);
				//make ranges a hash
				ranges[columns.eq(i).attr("id")] = w;
				console.log(columns.eq(i).attr("id"));
			}		 
			
			for(amenity in ranges){ 
				ranges[amenity] = Math.round(100*ranges[amenity]/total);				
				
				s+=" "+ amenity_names_obj[amenity] + ": " + ranges[amenity] + "%,";			
				console.log(ranges[amenity]);
				$("#" + amenity + "_value").val(ranges[amenity]);
			}		
			
			s=s.slice(0,-1);
			// columns.each(function(){ msg += $(this).width() + "px; "; })
			$("#text").html(s);
			
			//uncheck the default checkbox if the user changes values
			var default_checbox = $('#amenity_weighting_default');
			if(default_checbox.is(':checked')){
				default_checbox.attr(check 
			}
		};	
		
			$("#range").colResizable({
				liveDrag:true, 
				gripInnerHtml:"<div class='grip'></div>", 
				draggingClass:"dragging", 
				onResize:onSampleResized});
			
			var columns = $('#range').find("th");
			var total = 0, i, w;
			for(i = 0; i<columns.length; i++){
				w = columns.eq(i).width()-10 - (i==0?1:0);
				// ranges.push(w);
				total+=w;				
			}	
			
			$('#amenity_weighting_default').change(function() {
			
				if($(this).is(':checked')){					
															
					for(amenity in default_amenity_weights){ 																						
						$("#" + amenity + "_weight").css("width",total*(default_amenity_weights[amenity]/100) + "px");
					}
					
					e = {currentTarget: $('#range')};
					onSampleResized(e);					
											
					//need to disable the table before re-initialization.
					$("#range").colResizable({
					   disable: true,
					   });
								   
					$("#range").colResizable({
					   liveDrag:true, 
					   gripInnerHtml:"<div class='grip'></div>", 
					   draggingClass:"dragging", 
					   onResize:onSampleResized});  
					
					
					// $("#slider").hide("slow");
					//change values to default...
																
					// var s="";
					// for(amenity in default_amenity_weights){ 
							
							
							// s+=" "+ amenity_names_obj[amenity + "_weight"] + ": " + default_amenity_weights[amenity] + "%,";			
							
							// $("#" + amenity + "_weight_value").val(default_amenity_weights[amenity]);
						// }
					// s=s.slice(0,-1);
					
					// $("#text").html(s);	


					
				}
				else{
						// $("#slider").show("slow");
						
						//TODO: if user clicks to undefault, then changes some values
						//then clicks to default then back to undefault
						//This should restore the values previously in undefault.
						//could temporarily save them in an variable...
				}
			});
			
			

	
};
			
			
