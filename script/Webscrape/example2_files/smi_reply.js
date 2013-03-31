
function ajax_reply()
{$('#email_error_text').removeClass("success");clearHintsBeforeSubmit($('#reply_form_fields #form1'));var email=document.getElementById("your_email").value;var name=document.getElementById("your_name").value;var phone=document.getElementById("your_phone").value;var message=document.getElementById("your_message").value;message=message.replace(/(\r\n|\r|\n)/g,"  ");message=jQuery.trim(message);var search_type=document.getElementById("ad_search_type").value;var id=document.getElementById("ad_id").value;if($.browser.msie)
{var height='390px';}
else
{var height='365px';}
if($('#copy_message').is(':checked'))
{var self_copy=1;}
else
{var self_copy='';}
var data="";if($.trim(name)=='')
{data="Please enter your name";$('#email_error_text').html(data);$('#email_error_text').show();}
else if(email=="")
{data="Please enter your email address";$('#email_error_text').html(data);$('#email_error_text').show();}
else if(!validateEmail(email))
{data="That is not a valid email address";$('#email_error_text').html(data);$('#email_error_text').show();}
else if(message==""||message=="Type your message here...")
{data="Please enter your message";$('#email_error_text').html(data);$('#email_error_text').show();}
else
{$('#email_error_text').hide();$('#reply_sending').fadeTo(0,0.9);$('#reply_sending').show();$.post('/ajax_endpoint.php',{'action':'daft_contact_advertiser','from':name,'email':email,'message':message,'contact_number':phone,'type':search_type,'id':id,'self_copy':self_copy},function(data){$('#reply_sending').hide();if(data.indexOf("Email successfully")!=-1)
{$('#email_error_text').addClass("success");}
$('#email_error_text').html(data);$('#email_error_text').show();ga__log_ad_reply();var body=document.getElementsByTagName('body')[0];var img=document.createElement('img');img.src='http://www.googleadservices.com/pagead/conversion/1069610512/?label=QomHCKi6jQEQkOyD_gM&guid=ON&script=0';body.appendChild(img);},'json');return;}
refillHints($('#reply_form_fields #form1'));}
function ga__log_ad_reply()
{_gaq.push(['_trackEvent','desktop_email',ad_type,ad_id]);}