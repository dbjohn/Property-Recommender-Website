
var num_images;var pb_open=false;var pb_page;var slide_speed=10;var photos_seen=0;var img_slide_finished=true;function setup_images(images_in,page_index_in,campaign_in)
{carousel_images=images_in;num_images=carousel_images.length;pb_page=page_index_in;campaign=campaign_in;}
function photoDataToggle(pb_page)
{photos_seen++;if((photos_seen%adtechConfig['refreshInterval'])==1)
{if(adtechConfig['dfp']==true)
{rotateDFP();}
else
{rotateAdtech();}}
$("#pbxl_current_photo").text(pb_page);if(pb_captions[pb_page-1].length>0)
{$('#pb_caption').html(pb_captions[pb_page-1]).show();}
else
{$('#pb_caption').hide();}
var url_to_track='/media_browser/';if(campaign.length>0)
{url_to_track='/mb_views/'+campaign+'_mb_campaign'+url_to_track;}
if(typeof _gaq!=='undefined')
{if(typeof _gaq.push=='function')
{_gaq.push(['_trackPageview',url_to_track],['b._trackPageview',url_to_track]);}}
var tempurl=window.location.href;var regex=new RegExp("((http|https)://)([a-zA-Z0-9]+\.)(.*)");var comurl=tempurl.match(regex);var com_tag_url=comurl[3]+comurl[4];COMSCORE.beacon({c1:2,c2:6770180,c3:"",c4:com_tag_url,c5:"",c6:"",c15:""});img_slide_finished=true;}
$(document).ready(function(){$("span[class^=p]").click(function(){if(img_slide_finished==true)
{for(var i=1;i<=num_images;i++)
{if($(this).hasClass("p"+i))
{img_slide_finished=false;var prev_page=pb_page;pb_page=i;photoDataToggle(pb_page);}}}});$("#pbxl_right").click(function(){if(img_slide_finished==true)
{img_slide_finished=false;pb_page=(pb_page%num_images)+1;photoDataToggle(pb_page);}});$("#pbxl_left").click(function(){if(img_slide_finished==true)
{img_slide_finished=false;pb_page=(pb_page%num_images)-1;if(pb_page<1)
{pb_page+=num_images;}
photoDataToggle(pb_page);}});$('#pbxl_close_btn').click(function(){tb_remove();});$(document).keydown(function(e){if(img_slide_finished==true&&e.keyCode==37&&pb_open)
{$("#pbxl_left").trigger('click');}
else if(img_slide_finished==true&&e.keyCode==39&&pb_open)
{$("#pbxl_right").trigger('click');}
return true;});});function rotateDFP()
{googletag.pubads().refresh([googleAdSlots.pb234_60,googleAdSlots.pb160_600]);}
function rotateAdtech()
{var sky='pbxl_adtech_sky_holder';var halflb='pbxl_adtech_half_holder';$('#'+sky).remove();$('<iframe id="'+sky+'" marginheight="0" marginwidth="0" frameborder="0">').appendTo('#pbxl_skyscraper');var ifrm=document.getElementById(sky);ifrm=(ifrm.contentWindow)?ifrm.contentWindow:(ifrm.contentDocument.document)?ifrm.contentDocument.document:ifrm.contentDocument;ifrm.document.open();if(window.adgroupid==undefined){window.adgroupid=Math.round(Math.random()*1000);}
ifrm.document.write('<script language="javascript1.1" src="http://adse'
+'rver.adtech.de/addyn|3.0|809|'+adtechConfig['placements']['sky']
+'|0|154|ADTECH;cookie=info;loc='
+'100;key='+adtechConfig['keys']+';'+adtechConfig['keyvals']
+';target=_blank;grp='+window.adgroupid+';misc='+new Date().getTime()
+'"></script>');$('#'+sky).css({height:"615px",width:"175px"}).show();if((typeof(branded_agent_id)!=='undefined')&&branded_agent_id!=false&&branded_agent_id>0)
{$.post('/ajax_endpoint.php',{'action':'log_branded_agent_impression','agent_id':branded_agent_id});}
else
{$('#'+halflb).remove();$('<iframe id="'+halflb+'" marginheight="0" marginwidth="0" frameborder="0">').appendTo('#pbxl_adtech_half_container');var ifrm=document.getElementById(halflb);ifrm=(ifrm.contentWindow)?ifrm.contentWindow:(ifrm.contentDocument.document)?ifrm.contentDocument.document:ifrm.contentDocument;ifrm.document.open();if(window.adgroupid==undefined){window.adgroupid=Math.round(Math.random()*1000);}
ifrm.document.write('<script language="javascript1.1" src="http://adse'
+'rver.adtech.de/addyn|3.0|809|'+adtechConfig['placements']['halflb']
+'|0|4|ADTECH;cookie=info;loc='
+'100;key='+adtechConfig['keys']+';'+adtechConfig['keyvals']
+';target=_blank;grp='+window.adgroupid+';misc='+new Date().getTime()
+'"></script>');$('#'+halflb).css({height:"75px",width:"234px"}).show();}}