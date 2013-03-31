
function showModal(modalName,callback){$('#modal_background_'+modalName).css('display','block');$('#modal_container_'+modalName).css('display','block');$('#modal_form_'+modalName).submit(function()
{callback();hideModal(modalName);return false;});$('.close_modal').click(function(){hideModal(modalName);});$('#modal_background_'+modalName).click(function(){hideModal(modalName);});$(document).keyup(function(event){if(event.keyCode==27)
{hideModal(modalName);}});return false;}
function disableModal(buttonId)
{$("#"+buttonId).unbind("click");}
function hideModal(modalName){$('#modal_background_'+modalName).css("display","none");$('#modal_container_'+modalName).css("display","none");}
function setupSelectorModal(modalName,selector)
{$(selector).each(function(){$(this).click(function(e){showModal(modalName,selector);e.stopPropagation();})});}
function setupModal(modalName,buttonId,onShow,callback){var submitCallback=callback;$('#'+buttonId).click(function(){onShow();$(document).keyup(function(event){if(event.keyCode==27)
{hideModal(modalName);}});$('#modal_background_'+modalName).css("display","block");$('#modal_container_'+modalName).css("display","block");return false;});$('#modal_background_'+modalName).click(function(){hideModal(modalName);});$('.close_modal').click(function(){hideModal(modalName);});$(document).keyup(function(e){if(e.keyCode==27){hideModal(modalName);}});$('.cancel_modal').click(function(){hideModal(modalName);});$('#modal_form_'+modalName).submit(function()
{submitCallback();$("#modal_background_"+modalName).css("display","none");$('#modal_container_'+modalName).css("display","none");return false;});}
function setupReportModal(modalName,buttonId,onShow){$('#'+buttonId).click(function(){onShow();$('#modal_background_'+modalName).css("display","block");$('#modal_container_'+modalName).css("display","block");});$('#modal_background_'+modalName).click(function(){hideModal(modalName);$('#email_modal_response').hide();});$('.close_modal').click(function(){hideModal(modalName);$('#email_modal_response').hide();});$('#vendor_cancel').click(function(){hideModal(modalName);$('#email_modal_response').hide();});$('#close_report').click(function(){hideModal(modalName);$('#email_modal_response').hide();});$('#modal_form_'+modalName).submit(function()
{hideModal(modalName);$('#email_modal_response').hide();return false;});}