// I tried to reset the values of the amenity weighting table but there did not seem to be a way to set it programmatically,
// then I tried to remove the table and recreate it when the user chooses to use default settings but that didn't work because
// the colResizable plugin does some functionality on the document loading which needs to occur in order for the table to be
// initialized properly. So the simplest solution is just to show and hide the amenity weighting table with the checkbox click.

$(function(){

$('#datepicker').datepicker();

//$("#collapseOne").collapse({toggle: false});
 $('#options_advanced').change(function(){$('#advanced_options_area').collapse('show');});
 $('#options_basic').change(function(){$('#advanced_options_area').collapse('hide');});
 //set it to basic by default
 $('#options_basic').prop('checked',true);

 //Remove the padding when the collapsed area is hidden.
 //some inspiration from this question http://stackoverflow.com/questions/9137073/change-css-padding-while-collapse
  $('#advanced_options_area').on('hide', function(){
  $('#advanced_options_area').css('padding','0');}).on('show', function(){
  $('#advanced_options_area').css('padding','2%');})

    
});

function setUpAmenityWeighting(default_amenity_weights){
	//An object with the proper amenity names is used in the view as it is more presentable and better english. translate from html input ids to proper names.
	var amenity_names_obj = {'supermarket_weight' : 'Supermarket', 'convenience_shop_weight' : 'Convenience Shop', 'restaurant_weight' : 'Restaurant', 'library_weight' : 'Library', 'bank_weight' : 'Bank'}	
	
	function reInitialiseTable(){
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
			onResize:onSampleResized
		});  

	};
	var onSampleResized = function(e){
		var columns = $(e.currentTarget).find("th");
		// var msg = "columns widths: ";
		
		var ranges = {}, total = 0, i, s ="", w, width;
		for(i = 0; i<columns.length; i++){				
			w =  columns.eq(i).width() -10 - (i==0?1:0);
			// ranges.push(w);
			total+=w;
			// console.log(columns[i]);
			//make ranges a hash
			ranges[columns.eq(i).attr("id")] = w;
			console.log(columns.eq(i).attr("id"));
		}		 
		
		var tableDataFields = $("#range td"), index=0;
		
		for(amenity in ranges){ 
			ranges[amenity] = Math.round(100*ranges[amenity]/total);				
			
			s+=" "+ amenity_names_obj[amenity] + ": " + ranges[amenity] + "%,";			
			console.log(ranges[amenity]);
			$("#" + amenity + "_value").val(ranges[amenity]);
			tableDataFields.eq(index).text(ranges[amenity] + "%");
			index++;
		}		
		
		s=s.slice(0,-1);
		// columns.each(function(){ msg += $(this).width() + "px; "; })
		$("#text").html(s);
		
		//uncheck the default checkbox if the user changes values
		var $default_checbox = $('#amenity_weighting_default');
		if($default_checbox.is(':checked')){				
				$default_checbox.trigger('click').attr('checked',false);
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
			
			reInitialiseTable();					
			
			 $('#amenity_weighting_default').attr('checked',true);
			
		}
	
	}).trigger('click').attr('checked',true);;//turn on default amenity_weighting on page load
	
	

	$('h6:contains(Amenities) ~ [type="checkbox"]').not('#amenity_weighting_default').change(function(){
		
		if($(this).is(':checked')){	
			
			console.log("checked");
			
			//check if there is a better way to create new html elements with jquery
			//toTitleCase???
			var tableRows = $("#range tr");
			
			tableRows.eq(0).append($('<th>').attr("id", $(this).attr("id") + "_weight").text(amenity_names_obj[$(this).attr("id")+"_weight"]));
			tableRows.eq(1).append($('<td>')); //we can just append the table data, and it will be given the right text value later in onSampleResized
			
			//there are too many problems with setting the width to zero. For example, it ends up increasing the total width, when you've unselected a number of columns and then reselected them.
			// for(amenity in default_amenity_weights){ 																						
				// amenity_weight = $("#" + amenity + "_weight");
				// if(amenity_weight.css("width") > 0 || ($(this).attr("id") == amenity)){
					// amenity_weight.css("width",total*(default_amenity_weights[amenity]/100) + "px");
				// }
			// }	
			for(amenity in default_amenity_weights){
				$("#" + amenity + "_weight").css("width",total*(default_amenity_weights[amenity]/100) + "px");
			}	

			reInitialiseTable();
		}
		else{
			console.log("not checked");
			$("#" + $(this).attr("id") + "_weight").remove();
			$("#range tr td").eq(0).remove();
			$("#" + $(this).attr("id") + "_weight_value").val("0");
			//and it wasn't as good as removing it
			//$("#"+ $(this).attr("id") + "_weight").css("width","0px");
			//$("#"+ $(this).attr("id") + "_weight").css("width","10px");
			//$("#library_weight").css("width","0px");
			//$("#library_weight").remove();
			reInitialiseTable();			
		}
	});
};


			
