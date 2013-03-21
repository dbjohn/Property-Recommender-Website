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

	//An object with the proper amenity names is used in the view as it is more presentable and better english. translate from html input ids to proper names.
	var amenity_names_obj = {'supermarket_weight' : 'Supermarkets', 'convenience_shop_weight' : 'Convenience Shops', 'restaurant_weight' : 'Restaurants', 'library_weight' : 'Libraries', 'bank_weight' : 'Banks'}	

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
		};	
		
			$("#range").colResizable({
			liveDrag:true, 
			gripInnerHtml:"<div class='grip'></div>", 
			draggingClass:"dragging", 
			onResize:onSampleResized});
			
			$('#amenity_weighting_default').change(function() {
									
										if(this.checked){
											$("#slider").hide("slow");
											//change values to default...
											
											// $(this).prev().slider("disable");
											// totalChecked += $(this).prev().slider("value");
											// freeValue -= 1;
											
										}
										else{
												$("#slider").show("slow");
												// $(this).prev().slider("enable");
												// totalChecked -= $(this).prev().slider("value");
												// freeValue += 1;
										}
									});
									
									$('#amenity_weighting_default').trigger('click');
		
	
});
			
			
