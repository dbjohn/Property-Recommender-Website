
$(document).ready(function()
{$('select#mnb').change(function()
{if(parseInt($(this).val())>parseInt($('select#mxb').val()))
$('select#mxb').val($(this).val());});$('select#mxb').change(function()
{if(parseInt($(this).val())<parseInt($('select#mnb').val()))
$('select#mnb').val($(this).val());});$('select#mnp').change(function()
{if(parseInt($(this).val())>parseInt($('select#mxp').val()))
$('select#mxp').val($(this).val());});$('select#mxp').change(function()
{if(parseInt($(this).val())<parseInt($('select#mnp').val()))
$('select#mnp').val($(this).val());});$('#sf_submit').click(function(){$('#sf_search').submit();});$('#mnb').change(function(){if(parseInt($(this).val())>parseInt($('#mxb').val()))
$('#mxb').val($(this).val());});$('#mxb').change(function(){if(parseInt($(this).val())<parseInt($('#mnb').val()))
$('#mnb').val($(this).val());});$('#mnp').change(function(){if(parseInt($(this).val())>parseInt($('#mxp').val()))
$('#mxp').val($(this).val());});$('#mxp').change(function(){if(parseInt($(this).val())<parseInt($('#mnp').val()))
$('#mnp').val($(this).val());});if(typeof isOverseasSearch!='undefined')
{overseasSearchFormJs();}
else if(!$('.search-form').length)
{basicSearchFormJs();onSearchFormPtIdChange();domesticSearchFormJs();}
else
{basicSearchFormJs();searchHeaderJs();filterBarJs();}});function basicSearchFormJs()
{$('select#mnbt').change(function()
{if(parseInt($(this).val())>parseInt($('select#mxbt').val()))
{$('select#mxbt').val($(this).val());}});$('select#mxbt').change(function()
{if(parseInt($(this).val())<parseInt($('select#mnbt').val()))
{$('select#mnbt').val($(this).val());}});$('#refine_button').hover(function(){$(this).attr('src','http://c0.dmstatic.com/i/button_refine_search_on.png');},function(){$(this).attr('src','http://c1.dmstatic.com/i/button_refine_search_off.png');});$('#sqmn').change(function(){if(parseInt($(this).val())>parseInt($('#sqmx').val()))
{$('#sqmx').val($(this).val());}});$('#sqmx').change(function(){if(parseInt($(this).val())<parseInt($('#sqmn').val()))
{$('#sqmn').val($(this).val());}});$('#mna').change(function(){if(parseInt($(this).val())>parseInt($('#mxa').val()))
{$('#mxa').val($(this).val());}});$('#mxa').change(function(){if(parseInt($(this).val())<parseInt($('#mna').val()))
{$('#mna').val($(this).val());}});$('#min_size').change(function(){if(parseInt($(this).val())>parseInt($('#max_size').val()))
{$('#max_size').val($(this).val());}});$('#max_size').change(function(){if(parseInt($(this).val())<parseInt($('#min_size').val()))
{$('#min_size').val($(this).val());}});$('#single_beds, #double_beds, #twin_beds').change(function(){var sb=parseInt($('#single_beds').val());if(isNaN(sb))
{sb=0;}
var db=parseInt($('#double_beds').val());if(isNaN(db))
{db=0;}
var tb=parseInt($('#twin_beds').val());if(isNaN(tb))
{tb=0;}
var total_ind=sb+db+tb;if($('#total_beds'))
{var bedrooms=parseInt($('#total_beds').val());if(total_ind>bedrooms)
{if(total_ind>6)
{total_ind=6;}
$('#total_beds').val(total_ind);}}});$('#total_beds').change(function(){var sb=parseInt($('#single_beds').val());if(isNaN(sb))
{sb=0;}
var db=parseInt($('#double_beds').val());if(isNaN(db))
{db=0;}
var tb=parseInt($('#twin_beds').val());if(isNaN(tb))
{tb=0;}
var total_ind=sb+db+tb;var bedrooms=parseInt($('#total_beds').val());if(isNaN(bedrooms))
{bedrooms=0;}
if(total_ind>bedrooms)
{if(total_ind>6)
{total_ind=6;}
$('#single_beds, #double_beds, #twin_beds').val(0);}});$('#area_type_1').change(function(){if($(this).val().length>0)
{$('#area_type1').click();}});$('#area_type_2').change(function(){if($(this).val().length>0)
{$('#area_type2').click();}});if($('select#province').val())
{if($('select#province').val().length)
{$('select#province').change();}}}
function toggleTransport()
{if($('#s_transport').attr('value')=='1')
{$('#s_transport').attr('value','0');}
else
{$('#s_transport').attr('value','1');$('#cc_id').trigger('change');}
$('#advanced').attr('value','1');}
function togglePriceRange()
{if($('#price_per_room').attr('value')=='1')
{$('#price_per_room').attr('value','0');}
else
{$('#price_per_room').attr('value','1');}
$('#advanced').attr('value','1');}
function onSearchFormPtIdChange()
{var searchType=$('input[name="s[search_type]"]').val();$('#pt_id').change(function(){if($(this).attr('value')!='5'&&search_type=='tabs_advanced')
{$('#advanced_sqm').show();}
else
{$('#advanced_sqm').hide();}
if($(this).attr('value')=='1')
{$('#house_type_div').show();}
else
{$('#house_type_div').hide();}
if($(this).attr('value')=='5')
{$('#advanced_acreage').show();}
else
{$('#advanced_acreage').hide();}
if(searchType=='commercial')
{if($(this).val()==6)
{$('#advanced_acreage').show();$('#commercialSize').hide();}
else
{$('#commercialSize').show();$('#advanced_acreage').hide();}}});}
function searchHeaderJs()
{$('#tabs #tabs_listview').click(function(){refine_type='tabs_listview';$('#tabs LI').removeClass('active');$('#tabs LI#tabs_listview').addClass('active');});$('#tabs #tabs_photogallery').click(function(){refine_type='tabs_photogallery';$('#tabs LI').removeClass('active');$('#tabs LI#tabs_photogallery').addClass('active');});$('#tabs #tabs_mapview').click(function(){refine_type='tabs_mapview';$('#tabs LI').removeClass('active');$('#tabs LI#tabs_mapview').addClass('active');});$('#tabs LI').hover(function(){if($(this).attr('ID')!=refine_type)
{$(this).css('cursor','pointer');$(this).css('background','url(http://c1.dmstatic.com/i/sf_tab_bg_on.png) repeat-x');$(this).children('DIV').css('background','url(http://c1.dmstatic.com/i/sf_tab_bg_right_on.png) '
+'no-repeat right');$(this).children('DIV').children('H2').css('background','url(http://c0.dmstatic.com/i/sf_tab_bg_left_on.png) '
+'no-repeat left');}},function(){if($(this).attr('ID')!=refine_type)
{$(this).css('background','url(http://c0.dmstatic.com/i/sf_tab_bg_off.png) repeat-x');$(this).children('DIV').css('background','url(http://c0.dmstatic.com/i/sf_tab_bg_right_off.png) '
+'no-repeat right');$(this).children('DIV').children('H2').css('background','url(http://c1.dmstatic.com/i/sf_tab_bg_left_off.png) '
+'no-repeat left');}});$('img.sr_pp_photo').hover(function(){var ad_id=$(this).attr('id').split('_');var this_photo=ad_id[0].slice(-1);ad_id=ad_id[1];$('#pp_'+ad_id).attr('src',pp_photos[ad_id][this_photo][0]);},function(){var ad_id=$(this).attr('id').split('_');var this_photo=ad_id[0].slice(-1);ad_id=ad_id[1];$('#pp_'+ad_id).attr('src',pp_photos[ad_id][0][0]);});$(window).load(function(){var banner=$('#sr_sidebar');if(banner==null||banner.val()==undefined)
{return;}
if($('#fagent-holder').length==1)
{return;}
var windowCache=$(window)
var bannerDummy=$('#sr_sidebar_dummy');var bannerTop=banner.offset().top-20;var bannerRight=banner.offset().right;var widthSet=false;windowCache.scroll(function()
{var windowTop=windowCache.scrollTop();banner.toggleClass('sticky',windowTop>bannerTop);var bannerWidth=banner.width();if(!widthSet&&bannerWidth>14)
{bannerDummy.css('width',bannerWidth);}
if(windowTop>bannerTop)
{banner.css('right',bannerRight);bannerDummy.css('display','block');}
else
{banner.css('right','auto');bannerDummy.css('display','none');}});});}
function filterBarJs()
{$('#pt_id').change(function(){var searchType=$('input[name="s[search_type]"]').val();var propType=$(this).val();if((searchType=='sale'||searchType=='international_sale')&&propType==5){$('#filterBeds').css('display','none');$('#filterAcres').css('display','');$('#mnb').val('');$('#mxb').val('');}
if((searchType=='sale'||searchType=='international_sale')&&propType!=5){$('#filterBeds').css('display','');$('#filterAcres').css('display','none');$('#mna').val('');$('#mxa').val('');}
if(searchType=='shortterm'&&propType==4){$('#filterBeds').css('display','none');$('#filterSleeps').css('display','');}
if(searchType=='shortterm'&&propType!=4){$('#filterBeds').css('display','');$('#filterSleeps').css('display','none');}
if(searchType=='commercial')
{if(propType==6)
{$('#filterSize').hide();$('#filterAcres').show();}
else
{$('#filterSize').show();$('#filterAcres').hide();}}});}
function overseasSearchFormJs()
{$('#tabs #tabs_sale').click(function(){overseas_type='tabs_sale';$('#tabs li').removeClass('active');$(this).addClass('active');$(this).css('cursor','default');$('#search_type').val('international_sale');$('#price').text('What is your price range?');$('#mnp, #mxp, #pt_id, #country, #region').empty();$('#price_loading, #type_loading, #country_loading, #region_loading').show();$.post('/ajax_endpoint.php',{'action':'sf_international_search_change','search_type':'international_sale','cc_id':$('#country').val(),'continent_id':$('#continent').val()},function(data){$('#country').append('<option value="">Any</option>'+data['country_options']);$('#mnp').append('<option value="">Any</option>'+data['price_options']);$('#mxp').append('<option value="">Any</option>'+data['price_options']);$('#pt_id').append('<option value="">Any</option>'+data['type_options']);$('#region').append('<option value="">Any</option>');$('#price_loading, #type_loading, #country_loading, '+'#region_loading').hide();},'json');});$('#tabs #tabs_rental').click(function(){overseas_type='tabs_rental';$('#tabs li').removeClass('active');$(this).addClass('active');$(this).css('cursor','default');$('#search_type').val('international_rental');$('#price').text('What is your price range per week?');$('#mnp, #mxp, #pt_id, #country, #region').empty();$('#price_loading, #type_loading, #country_loading, #region_loading').show();$.post('/ajax_endpoint.php',{'action':'sf_international_search_change','search_type':'international_rental','cc_id':$('#country').val(),'continent_id':$('#continent').val()},function(data){$('#country').append('<option value="">Any</option>'+data['country_options']);$('#mnp').append('<option value="">Any</option>'+data['price_options']);$('#mxp').append('<option value="">Any</option>'+data['price_options']);$('#pt_id').append('<option value="">Any</option>'+data['type_options']);$('#region').append('<option value="">Any</option>');$('#price_loading, #type_loading, #country_loading, '
+'#region_loading').hide();},'json');});$('#continent').change(function(){$('#country_loading, #region_loading').show();$('#country, #region').empty();$.post('/ajax_endpoint.php',{'action':'sf_continent_change','continent_id':$(this).val(),'ad_type':overseas_type.substring(5)},function(data){$('#country').append('<option value="">Any</option>'+data['country_options']);$('#region').append('<option value="">Any</option>');$('#country_loading, #region_loading').hide();},'json');$.cookie('s[search][continent]',$(this).val(),{expires:7,path:'/'});$('#sf_map_link').attr('href','/searchinternational.daft?s[search_type]=international_sale'
+'&map=1&s[continent_id]='+$(this).val());});$('#country').change(function(){$('#region').empty();$('#region_loading').show();$.post('/ajax_endpoint.php',{'action':'sf_country_change','country_id':$(this).val(),'ad_type':overseas_type.substring(5)},function(data){$('#region').append('<option value="">Any</option>'+data['options']);$('#region_loading').hide();},'json');$.cookie('s[search][country_id]',$(this).val(),{expires:7,path:'/'});});$('.sf_four_props img').hover(function(){$(this).css('border-color','#666');},function(){$(this).css('border-color','#aeaeae');});}
function domesticSearchFormJs()
{if(search_type!='tabs_college')
{$('#college_id').empty();}
else
{$('.normal, .transport, .advanced').hide();}
if($('#cc_id').val()!='ct1'&&$('#cc_id').val()!='ct3')
{$('.'+active_tab+':not(#sf_transport_block)').show();}
else
{$('.'+active_tab).show();}
$('#tabs #tabs_normal').click(function(){search_type='tabs_normal';$('#tabs li').removeClass('active');$(this).addClass('active');$(this).css('cursor','default');$('.normal, .transport').show();$('.advanced, .college').hide();$('#advanced, #npt_id, #days_old, #single_beds, #double_beds, '+'#twin_beds, #occupants').removeAttr('value');$('#address, #description').val('');$('#new_1, #agreed_1, #o_oc_1').attr('checked','checked');$('#ra, #fac_2, #fac_4, #fac_8, #fac_16, #fac_32, #fac_64, #fac_128, '+'#fac_256, #fac_512, #fac_1024, #fac_2048, #photos, #couples, '+'#area_type, #enroute').removeAttr('checked');$('#college_id').empty();});$('#tabs #tabs_advanced').click(function(){search_type='tabs_advanced';$('#tabs li').removeClass('active');$(this).addClass('active');$(this).css('cursor','default');$('.normal, .advanced').show();if($('#cc_id').val()!='ct1'&&$('#cc_id').val()!='ct3')
{$('#sf_transport_block').hide();}
$('.transport, .college').hide();$('#advanced').attr('value','1');$('#college_id').empty();$('#area_type, #enroute').removeAttr('checked');});$('#tabs #tabs_college').click(function(){search_type='tabs_college';$('#tabs li').removeClass('active');$(this).addClass('active');$(this).css('cursor','default');$('.college, #college_id_loading').show();$('.normal, .transport, .advanced').hide();$('#advanced, #npt_id, #days_old, #single_beds, #double_beds, '+'#twin_beds, #occupants').removeAttr('value');$('#address, #description').val('');$('#ra, #fac_2, #fac_4, #fac_8, #fac_16, #fac_32, #fac_64, #fac_128, '+'#fac_256, #fac_512, #fac_1024, #fac_2048, #photos, #couples').removeAttr('checked');$('#agreed_1, #o_oc_1, #area_type').attr('checked','checked');$('#college_id').empty();$.post('/ajax_endpoint.php',{'action':'sf_college_tab_change','college_id':college},function(data){$('#college_id').append(data['options']);$('#college_id_loading').hide();},'json');});$('#ccc_id').change(function(){$('#area_type_1, #area_type_2').empty();$('#area_type_1_loading, #area_type_2_loading').show();$.post('/ajax_endpoint.php',{'action':'sf_ccc_id_change','ccc_id':$(this).val(),'route_id':route,'a_id':area},function(data){$('#area_type_1').append(data['options_1']);$('#area_type_2').append(data['options_2']);$('#area_type_1_loading, #area_type_2_loading').hide();},'json');});$('#cc_id').change(function(){if($(this).val().length>0)
{if(($(this).val()=='ct1'||$(this).val()=='ct3')&&$('#advanced').val()==1)
{$('#sf_transport_block').show();}
else
{$('#sf_transport_block').hide();}
if($('#s_transport').attr('value')!=1)
{var cc_string=$('#cc_id :selected').text();if('Anywhere in Republic of Ireland'==cc_string)
{cc_string="Republic of Ireland";}
if('Anywhere in Northern Ireland'==cc_string)
{cc_string="Northern Ireland";}
$.cookie('adserver_ccid',$(this).val(),{expires:7,path:'/'});$('#a_id, #mnp, #mxp').empty();$('.areas, #a_id_loading, #price_loading').show();$('.city_county_name').text('');var cc_id_val=$(this).val();$.post('/ajax_endpoint.php',{'action':'sf_cc_id_change','cc_id':$(this).val(),'search_type':type,'mnp':min,'mxp':max,'cc_string':cc_string,'agreed':agreed},function(data)
{$('#a_id').append(data['options_a_id']);$('#mnp').append(data['options_mnp']);$('#mxp').append(data['options_mxp']);$('#a_id_loading, #price_loading').hide();if(cc_id_val=='ct1'||cc_id_val=='ct3')
{$('#area_type_1').empty();$('#area_type_1').append(data['options_route']);$('#area_type_2').empty();$('#area_type_2').append(data['options_area']);}},'json');$('.city_county_name').text(cc_string);}
else
{$('#area_type_1, #area_type_2').empty();$('#area_type_1_loading, #area_type_2_loading').show();$.post('/ajax_endpoint.php',{'action':'sf_ccc_id_change','ccc_id':$(this).val(),'route_id':route,'a_id':area},function(data){$('#area_type_1').append(data['options_1']);$('#area_type_2').append(data['options_2']);$('#area_type_1_loading, #area_type_2_loading').hide();},'json');}}
else if($('#cc_id :selected').text()=='Anywhere in Ireland')
{$('.areas').hide();}});$('#college_id').change(function(){$('#mnp, #mxp').empty();$('#price_loading').show();$.post('/ajax_endpoint.php',{'action':'sf_college_id_change','college_id':$(this).val(),'search_type':type,'mnp':min,'mxp':max},function(data){$('#mnp').append(data['options_mnp']);$('#mxp').append(data['options_mxp']);$('#price_loading').hide()},'json');});$('#sf_price_link, #sf_transport_link, #sf_area_link').hover(function(){$(this).css('color','#fe7c00');},function(){$(this).css('color','#2b2ae8');});$('#sf_price_link').click(function(){togglePriceRange();if($(this).text()=='Specify per property per month')
{$(this).text('Specify price range per room');$('#sf_price_text').text('What is your price range (per month)?');}
else
{$(this).text('Specify per property per month');$('#sf_price_text').text('What is your price range (per room per month)?');}
$('#price_loading').show();$('#mnp, #mxp').empty();$.post('/ajax_endpoint.php',{'action':'sf_price_change','price_per_room':$('#price_per_room').attr('value')},function(data){$('#mnp').append(data['options_mnp']);$('#mxp').append(data['options_mxp']);$('#price_loading').hide();},'json');});$('#sf_transport_link').click(function(){toggleTransport();var cc_id_val=$('#cc_id').val();$('#ccid_loading').show();$('#cc_id').empty();$('#cc_id_label').text('Choose a City:');$.post('/ajax_endpoint.php',{'action':'sf_transport_select','cc_id':cc_id_val},function(data){$('.areas').hide();$('#sf_transport').show();$('#cc_id').append(data['ccid_options']);$('#ccid_loading').hide();},'json');});$('#tabs_normal, #sf_area_link').click(function(){toggleTransport();var cc_id_val=$('#cc_id').val();$('#ccid_loading').show();$('#cc_id').empty();$('#cc_id_label').text('Choose a City or County:');$.post('/ajax_endpoint.php',{'action':'sf_area_select','cc_id':cc_id_val},function(data){$('#sf_transport').hide();$('.areas').show();$('#cc_id').append(data['ccid_options']);$('#a_id').empty();$('#a_id').append(data['aid_options']);$('#ccid_loading').hide();},'json');});$('#tabs_normal').click(function(){$('#s_transport').attr('value','0');$('#advanced').attr('value','0');});}