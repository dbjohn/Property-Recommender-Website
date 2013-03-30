
(function($){$.fn.jTruncate=function(options){var defaults={length:300,minTrail:20,moreText:"more",lessText:"less",ellipsisText:"...",moreAni:"",lessAni:""};var options=$.extend(defaults,options);return this.each(function(){obj=$(this);var body=trim(obj.html());if(body.length>options.length+options.minTrail){var splitLocation=body.indexOf(' ',options.length);if(splitLocation!=-1)
{var tagOpen=body.indexOf('<',options.length);var tagClose=body.indexOf('>',options.length);if(tagOpen>tagClose)
{splitLocation=tagOpen;if(body.charAt(splitLocation+1)=='/')
{splitLocation=body.indexOf('>',splitLocation)+1;}}
var lastTagOpen=body.substr(0,splitLocation).lastIndexOf('<');var lastTagClose=body.substr(0,splitLocation).lastIndexOf('>');if(lastTagOpen>lastTagClose)
{splitLocation=lastTagOpen;}
var max_cut=body.indexOf('<!-- dont_cut_below_here -->');if(max_cut<splitLocation)
{splitLocation=max_cut;}
var last_h3=body.substring(0,splitLocation).lastIndexOf('<h3');if(last_h3!=-1)
{if(body.substring(0,splitLocation).lastIndexOf('</h3')==-1)
{splitLocation=last_h3;}}}
if(splitLocation!=-1){var str1=body.substring(0,splitLocation);var str2=body.substring(splitLocation,body.length);obj.html(str1+'<span class="truncate_ellipsis">'+options.ellipsisText+'</span>'+'<span class="truncate_more">'+str2+'</span>');obj.find('.truncate_more').css("display","none");obj.append('<div class="clearboth show_less_toggle">'+'<span class="truncate_more_link">'+options.moreText+'</span>'+'</div>');var moreLink=$('.truncate_more_link',obj);var moreContent=$('.truncate_more',obj);var ellipsis=$('.truncate_ellipsis',obj);moreLink.addClass('more');moreLink.click(function(){if(moreLink.hasClass('more')){moreContent.show(options.moreAni);moreLink.html(options.lessText);ellipsis.css("display","none");moreLink.removeClass('more');}else{moreContent.hide(options.lessAni);moreLink.html(options.moreText);ellipsis.css("display","inline");moreLink.addClass('more');}
return false;});}}});};})(jQuery);function trim(str,charlist){var whitespace,l=0,i=0;str+='';if(!charlist){whitespace=" \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000";}else{charlist+='';whitespace=charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g,'$1');}
l=str.length;for(i=0;i<l;i++){if(whitespace.indexOf(str.charAt(i))===-1){str=str.substring(i);break;}}
l=str.length;for(i=l-1;i>=0;i--){if(whitespace.indexOf(str.charAt(i))===-1){str=str.substring(0,i+1);break;}}
return whitespace.indexOf(str.charAt(0))===-1?str:'';}