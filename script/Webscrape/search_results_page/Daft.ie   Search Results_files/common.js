
$(document).ready(function(){$('.submit-form').click(function(){$(this).parents('form').submit();});$('.md-drafts-close').click(function(){$.cookie('hide_current_drafts',"1",{path:'/'});$(".draftMessages").hide();});$('a[rel=external]').attr('target','_blank');$('#target_external').attr('target','_blank');$('.target_external').attr('target','_blank');$('#toolbar_home').hover(function(){$('#toolbar').addClass('hover');},function(){$('#toolbar').removeClass('hover');});$('#backbutton_main').hover(function(){$(this).attr('src','//c1.dmstatic.com/i/button_back_on.png');$(this).css("cursor","pointer");},function(){$(this).attr('src','//c0.dmstatic.com/i/button_back_off.png');$(this).css("cursor","default");});$('#nextbutton_main').hover(function(){$(this).attr('src','//c1.dmstatic.com/i/button_next_on.png');},function(){$(this).attr('src','//c0.dmstatic.com/i/button_next_off.png');});$('#finishbutton_main').hover(function(){$(this).attr('src','//c1.dmstatic.com/i/button_finish_on.png');},function(){$(this).attr('src','//c0.dmstatic.com/i/button_finish_off.png');});$('#savebutton_main').hover(function(){$(this).attr('src','//c1.dmstatic.com/i/button_save_now_on.png');},function(){$(this).attr('src','//c0.dmstatic.com/i/button_save_now_off.png');});$('#cancelbutton_main').hover(function(){$(this).attr('src','//c0.dmstatic.com/i/button_cancel_blue_on.png');$(this).css("cursor","pointer");},function(){$(this).attr('src','//c1.dmstatic.com/i/button_cancel_blue_off.png');$(this).css("cursor","default");});$('.js_link').hover(function(){$(this).css({cursor:'pointer',color:'#fe7c00'});},function(){$(this).css({cursor:'default',color:'#0000FF'});});$('#unsubscribe_button').hover(function(){$(this).attr('src','//c0.dmstatic.com/i/button_unsubscribe_on.png');$(this).css('cursor','pointer');},function(){$(this).attr('src','//c1.dmstatic.com/i/button_unsubscribe_off.png');$(this).css('cursor','default');});$('#payment_proceed_button').hover(function(){$(this).attr('src','//c0.dmstatic.com/i/button_payment_proceed_on.png');$(this).css('cursor','pointer');},function(){$(this).attr('src','//c1.dmstatic.com/i/button_payment_proceed_off.png');$(this).css('cursor','default');});$('.hinted').focus(function()
{if($(this).val()==$(this).attr('title'))
{$(this).val('');$(this).removeClass('hintshown');}}).blur(function()
{if($(this).val()=='')
{$(this).val($(this).attr('title'));$(this).addClass('hintshown');}});$('.hinted').blur();$('.notify-close').click(function(){$.cookie(cookie_name,"1",{expires:1095,path:"/"});$("#notify-container").hide();$("#container").css("margin-top","0px");});$('#sr_mortgage_centre_img, #sr_mortgage_centre_link').click(function(event){var gaName=$(this).attr('class').split(' ');for(var j=0;j<gaName.length;j++){if(gaName[j]=='internal'){gaName.splice(j,1);}}
gaName=gaName[0];var code=event.charCode||event.keyCode;if(!code||(code&&code==13)){if(_gaq&&gaName){_gaq.push(['_trackEvent','mortgage_centre',gaName]);}}});$('.welcome-arrow').click(function(event){event.stopPropagation();$('.welcome-menu').children('li').children('ul').toggleClass('welcome-active');$('.welcome-menu-li').toggleClass('li-active');$('.welcome-menu').find('div').toggleClass('title-active');$('.welcome-menu').find('div').toggleClass('title-inactive');$('.welcome-menu').find('div').toggleClass('menu-active');});$('body').click(function(){$('.welcome-menu').children('li').children('ul').removeClass('welcome-active');$('#welcome_title').removeClass('title-active');$('#welcome_title').removeClass('menu-active');$('.welcome-menu-li').removeClass('li-active');$('#welcome_title').addClass('title-inactive');});});function validateEmail(emailField)
{var emailReg="^[\\w-_\.\'+]*[\\w-_\.\']\@([\\w-]+\\.)+[\\w]+[\\w]$";var regex=new RegExp(emailReg);return regex.test(emailField);}
var unavailable_images={};unavailable_images['spacer']='//c1.dmstatic.com/i/spacer.gif';var failed_images=Array();function image_error(img,backup_url,unavailable_image_size)
{var failures=0;for(var index in failed_images)
if(img==failed_images[index])
failures++;failed_images.push(img);switch(failures)
{case 0:img.src=backup_url;break;case 1:if('none'!=unavailable_image_size)
img.src=unavailable_images[unavailable_image_size];break;default:break;}}
function addImageErrorHandlers()
{if(typeof(jQuery)!='undefined')
{jQuery('img.image_error').removeClass("image_error").error(function(){var failoverImage=jQuery(this).next('span.image_error');if(1==failoverImage.length&&failoverImage.attr('title').length>0)
{if($.browser.opera)
{var copy_events=true;var clean_copy=jQuery(this).clone(copy_events);jQuery(clean_copy).attr('src',failoverImage.attr('title'));jQuery(this).hide();jQuery(this).after(clean_copy);jQuery(this).remove();}
else
{jQuery(this).attr('src',failoverImage.attr('title'));}
failoverImage.remove();}});}}
function strstr(haystack,needle,bool){var pos=0;haystack+='';pos=haystack.indexOf(needle);if(pos==-1){return false;}else{if(bool){return haystack.substr(0,pos);}else{return haystack.slice(pos);}}}
function str_replace(search,replace,subject,count){var i=0,j=0,temp='',repl='',sl=0,fl=0,f=[].concat(search),r=[].concat(replace),s=subject,ra=Object.prototype.toString.call(r)==='[object Array]',sa=Object.prototype.toString.call(s)==='[object Array]';s=[].concat(s);if(count){this.window[count]=0;}
for(i=0,sl=s.length;i<sl;i++){if(s[i]===''){continue;}
for(j=0,fl=f.length;j<fl;j++){temp=s[i]+'';repl=ra?(r[j]!==undefined?r[j]:''):r[0];s[i]=(temp).split(f[j]).join(repl);if(count&&s[i]!==temp){this.window[count]+=(temp.length-s[i].length)/f[j].length;}}}
return sa?s:s[0];}
Array.prototype.unique=function(){var r=new Array();o:for(var i=0,n=this.length;i<n;i++)
{for(var x=0,y=r.length;x<y;x++)
{if(r[x]==this[i])
{continue o;}}
r[r.length]=this[i];}
return r;}
if(!Array.indexOf){Array.prototype.indexOf=function(obj){for(var i=0;i<this.length;i++){if(this[i]==obj){return i;}}
return-1;}}
var UrlHelper={};UrlHelper.parseQueryParamsFromUrl=function(url)
{var result={};var params=decodeURIComponent(url).split('&');for(var i=0;i<params.length;i++)
{var splittingPosition=params[i].indexOf('=');var key=params[i].substring(0,splittingPosition);var value=params[i].substring(splittingPosition+1);result[key]=value;}
return result;};UrlHelper.parseQueryParamsFromCurrentUrl=function()
{return this.parseQueryParamsFromUrl(window.location.search.substring(1));};UrlHelper.getCurrentUrlWithNewQuery=function(newParams)
{var params=$.map(newParams,function(value,key){return key+'='+value;});return window.location.protocol+'//'
+window.location.host
+window.location.pathname
+'?'
+params.join('&');};