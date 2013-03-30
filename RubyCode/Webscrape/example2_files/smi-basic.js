
var main_map_initialized=false;var pbFirstOpen=true;$(document).ready(function(){$('.smi-tab').click(function(){open_tab(this);return false;});$('.smi-tabset .smi-tab').hover(function(){$(this).addClass('tab-interaction');},function(){$(this).removeClass('tab-interaction');});});function open_tab(tab)
{var tab_group_name=tab.parentNode.parentNode.id;var tab_name=tab.title;close_all_tabs(tab_group_name);$(tab).parent().addClass("smi-active");$("#"+tab_name).show();if($(tab).attr("id")=="smi-satellite-link")
{$("#smi-map-tab-header").html("Satellite");MultiMaps.satClick();}
if($(tab).attr("id")=="smi-map-link")
{$("#smi-map-tab-header").html("Road map");$('#smi-map-tab-icon').addClass('active');MultiMaps.mapClick();}
else
{$('#smi-map-tab-icon').removeClass('active');$('#smi-tab-map').hide();}
return true;}
function close_all_tabs(group_name)
{var group=$("#"+group_name).children();var tabs=$("#"+group_name+"_holder").children();var group_len=group.length;var tabs_len=tabs.length;for(var i=group_len;i--;)
{$(group[i]).removeClass("smi-active");}
for(var i=tabs_len;i--;)
{tabs[i].style.display="none";}
return true;}
$(document).ready(function()
{var trimmed_desc_length=850;$('#description').jTruncate({length:trimmed_desc_length,minTrail:0,moreText:'Show more information',lessText:'Show less information'});var downArrow='//c0.dmstatic.com/i/sr_sort_desc.png';var upArrow='//c1.dmstatic.com/i/sr_sort_asc.png';if($('.truncate_more_link').length>0)
{$($('<img id="truncate_icon" src="'+downArrow+'" />')).insertAfter('.truncate_more_link');$($('#smi-map-text-holder').prepend(" | ")).insertAfter('#truncate_icon');}
$('.truncate_more_link').hover(function(){$(this).css("color","#FE7C00");$(this).css("cursor","pointer");},function(){$(this).css("color","#1543AA");$(this).css("cursor","default");}).click(function(){if($('#truncate_icon').attr('src')==upArrow)
{$('#truncate_icon').attr('src',downArrow);}
else
{$('#truncate_icon').attr('src',upArrow);}});if(typeof hit_code!=='undefined'&&hit_code<300)
{gStreetView.getPanoramaByLocation(point,50,showStreetView);}
$('#smi-small-map').hover(function(){$(this).css({'cursor':'pointer'});$('#smi-enlarge-map div').css({'text-decoration':'underline'});},function(){$('#smi-enlarge-map div').css('text-decoration','none');}).click(function(){open_tab($("#smi-map-link")[0]);smoothScroll('#smi-map-link');});$('.smi-map-link').click(function(){open_tab($("#smi-map-link")[0]);smoothScroll('#smi-map-link');});$('.ber-hover').mouseover(function(){$(this).children('.tooltipText').show();});$('.ber-hover').mouseleave(function(){$(this).children('.tooltipText').hide();});});function smoothScroll(destTag)
{var destination=$(destTag).offset().top;$("html:not(:animated),body:not(:animated)").animate({scrollTop:destination-20},500);return false;}