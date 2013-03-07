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

});
			
			
