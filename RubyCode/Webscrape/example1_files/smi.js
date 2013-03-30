
$(document).ready(function()
{setupModal('stf','swf',function(){$('#stfresponse').hide();$('#reply_button').show();$('#stf_form').show();},function(){});$('#rta_link').click(function(){showModal('report_ad',function(){});});var validator=$("#stf_form").validate({onsubmit:false,ignoreTitle:true,errorElement:'div',errorPlacement:function(error,element)
{if(validator.errorList[0]!==undefined)
{$('#stfresponse_text').text(validator.errorList[0].message);$('#stfresponse').addClass('warning');$('#stfresponse').removeClass('success');$('#stfresponse').show();}
element.removeClass('border_normal');element.addClass('error');},success:function(label)
{if(validator.errorList[0]==undefined)
{$('#stfresponse').removeClass('warning');$('#stfresponse').hide();}},rules:{email:{required:true,email:true},femail:{required:true,email:true}},messages:{email:{required:"Please enter a valid email address"},femail:{required:"Please enter a valid email address"}}});$('#reply_button').click(function(){clearHintsBeforeSubmit($('#stf_form'));var isValid=$('#stf_form').valid();$('#stf_form').valid();if(isValid)
{$('#reply_button').hide();$('#stf_loading').show();var message='Below is a personal message from your friend<br />'
+$('#personal_message').val();$.post('/ajax_endpoint.php',{'action':'send_property_to_friend','email':$('#email').val(),'femail':$('#femail').val(),'message':message,'search_type':$('#ad_search_type').val(),'id':$('#ad_id').val(),'send_to_friend':1},function(data){$('#stf_loading').hide();if(data['error'])
{$('#stfresponse_text').text(data['error']);$('#stfresponse').removeClass('success');$('#stfresponse').addClass('warning');$('#stfresponse').show();$('#reply_button').show();}
else
{$('#stf_form').hide();$('#stfresponse_text').text(data['success']);$('#stfresponse').removeClass('warning');$('#stfresponse').addClass('success');$('#stfresponse').show();}},'json');}
else
{$('.hinted').blur();}});function validateReportDescription()
{var description=$("input.report-radio:checked").val();var information=$("#information").val();var infoString='Please help us by providing a short description of '
+'the problem with this ad';if(description=="7"&&(information==infoString||information.length==0))
{$("#reportresponse").addClass("warning");$("#reportresponse").show();$("#reportresponse_text").html(infoString);$('#information').focus();return false;}
else if(description==undefined)
{$("#reportresponse").addClass("warning");$("#reportresponse").show();$("#reportresponse_text").html("Please choose a reason from the options below for reporting this ad");return false;}
else
{return true;}}
$('#report_reply').click(function(){var validate=validateReportDescription();if(validate==true)
{hideReportError();$('#report_reply').hide();$('#report_loading').show();sendReport();}});$('#information').keyup(function(){var validate=validateReportDescription();if(validate==true)
{hideReportError();}});function hideReportError()
{$("#reportresponse").removeClass("warning");$("#reportresponse").hide();}
function sendReport()
{clearHintsBeforeSubmit($('#report_form'));$.post('/ajax_endpoint.php',{'action':'send_report_ad','search_type':$('#ad_search_type').val(),'id':$('#ad_id').val(),'description':$('input.report-radio:checked').val(),'information':$('#information').val()},function(data){$('#report_loading').hide();$('#report_form').hide();$('#reportresponse_text').text(data['success']);$('#reportresponse').addClass('success');$('#reportresponse').show();},'json');}
$('#other').click(function(){$('#information').focus();});$('#information').focus(function(){if($(this).val()=='Please help us by providing a short description of the problem with this ad.')
{$(this).val('');$(this).css({'color':'#000','font-style':'normal'});}});$('#information').blur(function(){if($(this).val()=='')
{$(this).val('Please help us by providing a short description of the problem with this ad.');$(this).css({'color':'#888'});}});$('#saved-ad, #print-page').click(function(){window.location=$(this).children('a:first').attr('href');});$('#contact_advertiser').click(function(){open_tab($("#smi-contact-link")[0]);smoothScroll('#smi-contact-link');$('#your_name').focus();});$('#apply_now').hover(function(){$(this).css('cursor','pointer')
$(this).attr('src','http://c1.dmstatic.com/i/button_apply_now_on.png');},function(){$(this).attr('src','http://c0.dmstatic.com/i/button_apply_now_off.png');});$('#ad_reply_submit').click(function(){ajax_reply();});$('#your_message, #personal_message').focus(function(){if($(this).val()=='Type your message here...')
{$(this).css("color","black");$(this).val("");}});$('#your_message, #personal_message').blur(function(){if($(this).val()==''||$(this).val()==null)
{$(this).css("color","#666");$(this).val("Type your message here...");}});$('#your_name,#your_email,#your_phone,#your_message').focus(function(){$(this).css({background:'#ffc'});});$('#your_name,#your_email,#your_phone,#your_message').blur(function(){$(this).css({background:'#f7f7f7'});});$('#contact_negotiator').click(function(){open_tab($("#smi-contact-link")[0]);smoothScroll('#smi-contact-link');$('#your_name').focus();});$('#finance-tab-link, #smi-finance-link2').click(function(){open_tab($("#smi-finance-link")[0]);smoothScroll('#smi-finance-link');});$('#smi-finance-link2').click(function(){$('#smi-finance-link').trigger('click');});$('.pb_link').hover(function(){$(this).css({cursor:'pointer',color:'#fe7c00'});},function(){$(this).css({color:'#2b2ae8'});}).click(function(){pb_open=true;tb_show(null,'#TB_inline?inlineId=photo_browser&width='+pbWidth+'&height=627',null);if(pbFirstOpen)
{pbFirstOpen=false;}
else
{rotateAdtech();}});$('.smi-gallery .smi-photo a.p1').click(function(){pb_open=true;tb_show(null,'#TB_inline?inlineId=photo_browser&width='+pbWidth+'&height=627',null);});$('.smi-gallery .smi-photo a.v1').click(function(){tb_show(null,vb_url,null);});$('.smi-gallery .smi-photo a.v2').click(function(){tb_show(null,vt_url,null);});$('#sts').hover(function(){$(this).css({cursor:'pointer',color:'#fe7c00'});},function(){$(this).css({color:'#2b2ae8'});});$('#sts').click(function(){tb_show(null,tips_url,null);});if(ad_type.indexOf('international')==-1)
{if(typeof hit_code!=='undefined'&&hit_code<300)
{gStreetView.getPanoramaByLocation(point,50,function(camera)
{if(camera!=null)
{camera_found=true;$('#smi-sv-link').css("display","list-item");$(window).unload(function(){GUnload();});}});}}});var load_fired=false;$(window).bind('load',function(){if(!load_fired)
{if($.browser.msie&&$.browser.version.substr(0,1)==7)
{var addressOffset=2;var marginTopOffset=39;}
else if($.browser.msie&&$.browser.version.substr(0,1)==6)
{var addressOffset=28;var marginTopOffset=22;}
else
{var addressOffset=10;var marginTopOffset=37;}
var height=$('#address_box').height()+addressOffset;var margin_top=Math.round(((height/2)-marginTopOffset)/2);if(margin_top<0)
{margin_top=0;}
$('#socmed_buttons_smi').height(height);var addressHeight=$('#address_box h2').outerHeight();$('#adverts_ad').css('margin-top',addressHeight+'px');load_fired=true;}});var google_conversion_id=1069610512;var google_conversion_language="en_GB";var google_conversion_format="3";var google_conversion_color="ffffff";var google_conversion_label="v1guCM65jQEQkOyD_gM";