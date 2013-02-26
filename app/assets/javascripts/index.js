$(function(){
$('#datepicker').datepicker();

//$("#collapseOne").collapse({toggle: false});
 $('#options_advanced').change(function(){$('#advanced_options_area').collapse('show');});
 $('#options_simple').change(function(){$('#advanced_options_area').collapse('hide');});
 $('#options_simple').prop('checked',true);
//.collapse('toggle')

//can use a hide method event fired to set all the fields to default values.

//$(".collapse").collapse();

 // $('#male').change(function(){'#demo1'.collapse('show');});
 // $('#female').change(function(){'#demo1'.collapse('hide');});
 
 // $('#male').change(function(){$('#demo1').collapse('show');});
 // $('#female').change(function(){$('#demo1').collapse('hide');});
 
 //$('#mybutton').click(function(){$('#demo').collapse('show');});
});
			
			
