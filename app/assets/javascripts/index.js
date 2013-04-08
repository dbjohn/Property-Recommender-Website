// This file will:
// 1. The JQuery document loaded function is called for all view files when the document is loaded. However it is only specific
//	  for index.html.haml. For that page it will initialise the date picker and setup the advanced options area.
// 2. The function setUpAmenityWeighting will handle setting up the customisable amenity weighting
//	  table and checkboxes and associated event handlers.

$(function(){

	$('#datepicker').datepicker();	//initialise datapicker on form

	// when the advanced options radio is changed, then show/hide the area.
	$('#options_advanced').change(function(){$('#advanced_options_area').collapse('show');});
	$('#options_basic').change(function(){$('#advanced_options_area').collapse('hide');});
	
	$('#options_basic').prop('checked',true); //set it to basic by default

	//Remove the padding when the collapsed area is hidden. Add it again when it is shown. Otherwise it does not look tidy.
	//some inspiration taken from this question and answer online http://stackoverflow.com/questions/9137073/change-css-padding-while-collapse
	$('#advanced_options_area').on('hide', function(){
		$('#advanced_options_area').css('padding','0');}).on('show', function(){
			$('#advanced_options_area').css('padding','2%');
	})

});


// setUpAmenityWeighting sets up the amenity weighting on the form on index.html.haml
// This means initialising the html table to be a "colResizable" table, adding event handlers to the default weighting checkbox
// and amenity checkboxes. Each time a column is resized a hidden input field is updated with the width of the column as a percentage of the total table width.

// Some of the code in this function is based on using and studying samples provided at website for the colResizable plugin: quocity.com/colresizable/
// None of the samples provided exactly the functionality required. Therefore code from the samples have been modified for this use case.

// This function expects a literal Javascript object as an argument, which contains the amenity names as keys and default weights as values.
// the default amenity weights Rails constant is passed as an argument to the function in index.html.haml
function setUpAmenityWeighting(default_amenity_weights){
	//for reference the default amenity weights are set to: DEFAULT_AMENITY_WEIGHTS = {"supermarket_weight_value" : 30, "convenience_shop_weight_value" : 20, "restaurant_weight_value" : 20, "library_weight_value" : 10, "bank_weight_value" : 20 }
	
	//An object with the proper amenity names is used in the view as it is more presentable and better english. Translate from html input ids to proper names.
	var amenity_names_obj = {'supermarket_weight' : 'Supermarket', 'convenience_shop_weight' : 'Convenience Shop', 'restaurant_weight' : 'Restaurant', 'library_weight' : 'Library', 'bank_weight' : 'Bank'}	

	// reInitialiseTable function performs the initialization of the resizable table based on the colResizable plugin.
	//this piece of code was repeated in a number of places, so this function was created.
	function reInitialiseTable(){
		e = {currentTarget: $('#range')};
		onSampleResized(e);				
		//the onSampleResized function called which will set the table data field values when columns are resized

		// it is necessary to disable the table before re-initialization - otherwise it does not work.
		$("#range").colResizable({
		disable: true,
		});
		
		//initialise colResizable table
		$("#range").colResizable({
			liveDrag:true, 
			gripInnerHtml:"<div class='grip'></div>", 
			draggingClass:"dragging", 
			onResize:onSampleResized
		});  

	};
	
	// the function will handle the event of the columns being resized
	// it sets table data fields to the percentage value of the table column widths
	// in addition it will uncheck the default amenity checkbox because the user has customised the weighting.
	var onSampleResized = function(e){
		
		var columns = $(e.currentTarget).find("th");		//get all table headers
		
		var ranges = {}, total = 0, i, w;
		
		// for each column, get the width, add to an accumulating total, 
		// store the width value in a hash whose key is the column id (which is the amenity name)
		
		for(i = 0; i<columns.length; i++){				
			w =  columns.eq(i).width() -10 - (i==0?1:0);	//the additional maths are needed for accuracy - this is from samples provided.

			total+=w;		
			ranges[columns.eq(i).attr("id")] = w; 	//make ranges a hash

		}		 
		
		var tableDataFields = $("#range td"), index=0;
		
		//for each amenity update the hidden input field value with the percentage value
		// and set the table data field of the same column number to show that percentage value.
		for(amenity in ranges){ 
			ranges[amenity] = Math.round(100*ranges[amenity]/total);	//only a rounded percentage whole number will be displayed			
						
			
			$("#" + amenity + "_value").val(ranges[amenity]);
			tableDataFields.eq(index).text(ranges[amenity] + "%");
			index++;
		}		
								
		//uncheck the default checkbox if the user changes values
		var $default_checkbox = $('#amenity_weighting_default');
		if($default_checkbox.is(':checked')){				
				$default_checkbox.trigger('click').attr('checked',false);
		}
	};	
	
	//initialise the table. This will be called once at the start of the page load.
	$("#range").colResizable({
		liveDrag:true, 
		gripInnerHtml:"<div class='grip'></div>", 
		draggingClass:"dragging", 
		onResize:onSampleResized});
	
	//The following code gets the total width of the table by adding up each column width. This is done once after page load.
	// this is needed so that the table width will remain constant when columns can be removed such as when
	// an amenity checkbox is checked.		
	var columns = $('#range').find("th");
	var total = 0, i, w;
	for(i = 0; i<columns.length; i++){
		w = columns.eq(i).width()-10 - (i==0?1:0);
		total+=w;				
	}
	
	// Set up an event handler function to be called when the default amenity checkbox is checked. 
	// This will set the width of each column to the a width based on the default amenity weightings given.
	// the table must be reinitialized after this so that the table displays correctly.
	// the checkbox checked attribute must be set to checked after this, because onSampleResized sets it to false. 
	// This is not ideal but works.
	$('#amenity_weighting_default').change(function() {
	
		if($(this).is(':checked')){					
						
			for(amenity in default_amenity_weights){ 					
				//The default amenity hash has the words _weight_value at the end. Therefore we only want up to the "weight" string and can drop value.
				//There is probably a more efficient way of naming the parts involved, however it got complicated and this just works for now.
				$("#" + amenity.substring(0,amenity.lastIndexOf("_"))).css("width",total*(default_amenity_weights[amenity]/100) + "px");				
			}
			
			reInitialiseTable();					
			
			 $('#amenity_weighting_default').attr('checked',true);			
		}	
	});
	
	$('#amenity_weighting_default').trigger('click').attr('checked',true); //turn on default amenity_weighting on page load
	
	
	// using jquery all the amenity checkboxes are selected and a change event is given a callback function
	// which is responsible for deleting and adding columns back to the amenity weighting table.
	
	// The approach here removes and adds the columns to the table.
	// another approach attempted was to set the column widths to zero and then set them back to greater than zero.	
	// There were too many problems/issues encountered with this approach, even if it might be more efficient.
	// For example, it was found to increase the total table width, when you've unselected a number of columns 
	 //and then reselected them.
	 
	$('h6:contains(Amenities) ~ [type="checkbox"]').not('#amenity_weighting_default').change(function(){
		
		//if the checkbox is checked then add the column back with the name of the source event checkbox.
		if($(this).is(':checked')){	
				
				
			var tableRows = $("#range tr"); //get all table rows
			
			//append a table header to the first row, giving it the standard id and set the text to the human readable name
			tableRows.eq(0).append($('<th>').attr("id", $(this).attr("id") + "_weight").text(amenity_names_obj[$(this).attr("id")+"_weight"]));
			//append a table data column to the second row
			tableRows.eq(1).append($('<td>')); //we can just append the table data, and it will be given the right text value later in onSampleResized
			
			
			//set the widths to default values
			for(amenity in default_amenity_weights){
				$("#" + amenity + "_weight").css("width",total*(default_amenity_weights[amenity]/100) + "px");
			}	

			reInitialiseTable();	// re-create table
		}
		// else it is not checked so remove column with the source event checkbox name
		else{

			$("#" + $(this).attr("id") + "_weight").remove(); //find column header and remove
			
			//find ANY data field and remove. The data fields are not coupled to the header names, and are reset to display the correct value
			//after reInitialiseTable is called		
			$("#range tr td").eq(0).remove();	
			
			$("#" + $(this).attr("id") + "_weight_value").val("0"); //set the hidden input field to zero.
			
			reInitialiseTable();			
		}
	});
};
