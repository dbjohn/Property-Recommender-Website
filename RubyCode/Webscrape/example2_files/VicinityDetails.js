
(function(){VicinityDetails={};VicinityDetails.init=function(objOptions)
{var options=JSON.parse(objOptions);VicinityDetails.MapDiv=$('#'+options.MapDiv);VicinityDetails.AdId=options.AdId;VicinityDetails.AdType=options.AdType;VicinityDetails.SimButton=$('#'+options.SimButton);VicinityDetails.EatButton=$('#'+options.EatButton);VicinityDetails.EduButton=$('#'+options.EduButton);VicinityDetails.PubButton=$('#'+options.PubButton);VicinityDetails.DocButton=$('#'+options.DocButton);VicinityDetails.ShopButton=$('#'+options.ShopButton);VicinityDetails.PprSoldButton=$('#'+options.soldPprButton);VicinityDetails.SimButton.click(VicinityDetails.simListener);VicinityDetails.EatButton.click(VicinityDetails.eatListener);VicinityDetails.EduButton.click(VicinityDetails.eduListener);VicinityDetails.PubButton.click(VicinityDetails.pubListener);VicinityDetails.DocButton.click(VicinityDetails.docListener);VicinityDetails.ShopButton.click(VicinityDetails.shopListener);VicinityDetails.PprSoldButton.click(VicinityDetails.pprListener);VicinityDetails.Similar=true;VicinityDetails.SoldPpr=false;VicinityDetails.Eating=false;VicinityDetails.Education=false;VicinityDetails.Shopping=false;VicinityDetails.Pubbing=false;VicinityDetails.Doctors=false;VicinityDetails.loadingSim=false;VicinityDetails.loadingPpr=false;VicinityDetails.loadingEat=false;VicinityDetails.loadingEdu=false;VicinityDetails.loadingShop=false;VicinityDetails.loadingPub=false;VicinityDetails.loadingDoc=false;VicinityDetails.similarMarkers=new Array();VicinityDetails.PprMarkers=new Array();VicinityDetails.EatingMarkers=new Array();VicinityDetails.EducationMarkers=new Array();VicinityDetails.ShoppingMarkers=new Array();VicinityDetails.PubbingMarkers=new Array();VicinityDetails.DoctorsMarkers=new Array();VicinityDetails.similarCache=new Array();MultiMaps.onDraw(VicinityDetails.refresh);MultiMaps.onZoom(VicinityDetails.refresh);MultiMaps.onMove(VicinityDetails.refresh);}
VicinityDetails.updateButtons=function()
{VicinityDetails.Similar=VicinityDetails.SimButton.is(":checked");VicinityDetails.SoldPpr=VicinityDetails.PprSoldButton.is(":checked");VicinityDetails.Eating=VicinityDetails.EatButton.is(":checked");VicinityDetails.Education=VicinityDetails.EduButton.is(":checked");VicinityDetails.Shopping=VicinityDetails.ShopButton.is(":checked");VicinityDetails.Pubbing=VicinityDetails.PubButton.is(":checked");VicinityDetails.Doctors=VicinityDetails.DocButton.is(":checked");if(!VicinityDetails.Similar)
{VicinityDetails.loadingSim=false;}
if(!VicinityDetails.SoldPpr)
{VicinityDetails.loadingPpr=false;}
if(!VicinityDetails.Eating)
{VicinityDetails.loadingEat=false;}
if(!VicinityDetails.Education)
{VicinityDetails.loadingEdu=false;}
if(!VicinityDetails.Shopping)
{VicinityDetails.loadingShop=false;}
if(!VicinityDetails.Pubbing)
{VicinityDetails.loadingPub=false;}
if(!VicinityDetails.Doctors)
{VicinityDetails.loadingDoc=false;}}
VicinityDetails.refresh=function()
{VicinityDetails.updateButtons();MultiMaps.clearMarkers();MultiMaps.showProperty();if(MultiMaps.zoom<14)
{MultiMaps.clearToast();return;}
if(VicinityDetails.Similar)
{VicinityDetails.simListener();}
if(VicinityDetails.SoldPpr)
{VicinityDetails.pprListener();}
if(VicinityDetails.Eating)
{VicinityDetails.eatListener();}
if(VicinityDetails.Education)
{VicinityDetails.eduListener();}
if(VicinityDetails.Shopping)
{VicinityDetails.shopListener();}
if(VicinityDetails.Pubbing)
{VicinityDetails.pubListener();}
if(VicinityDetails.Doctors)
{VicinityDetails.docListener();}
VicinityDetails.clearLoader();}
VicinityDetails.clearLoader=function()
{VicinityDetails.updateButtons();if(!VicinityDetails.loadingSim&&!VicinityDetails.loadingPpr&&!VicinityDetails.loadingEat&&!VicinityDetails.loadingEdu&&!VicinityDetails.loadingShop&&!VicinityDetails.loadingPub&&!VicinityDetails.loadingDoc)
{MultiMaps.clearToast();}}
VicinityDetails.updateMapProperties=function(data)
{var properties=JSON.parse(data);for(id in properties)
{var property=properties[id];if(property.id===undefined)
{continue;}
property.AdType=VicinityDetails.AdType;property=checkSimilarCache(property);var marker=MultiMaps.drawPropertyMarker(property);VicinityDetails.similarMarkers.push(marker);}
VicinityDetails.loadingSim=false;pruneSimilarCache();VicinityDetails.clearLoader();}
checkSimilarCache=function(property)
{for(id in VicinityDetails.similarCache)
{var cachedProperty=VicinityDetails.similarCache[id];if(cachedProperty.id==property.id)
{return cachedProperty;}}
property.timestamp=new Date().getTime();VicinityDetails.similarCache[VicinityDetails.similarCache.length]=property;return property;}
pruneSimilarCache=function()
{if(VicinityDetails.similarCache.length>100)
{VicinityDetails.similarCache.sort(sortByTimestamp);}
var excess=VicinityDetails.similarCache.length-100;if(excess>100)
{VicinityDetails.similarCache.splice(100,excess);}}
sortByTimestamp=function(a,b)
{if(a.timestamp<b.timestamp)
return-1;if(a.timestamp>b.timestamp)
return 1;return 0;}
VicinityDetails.clearSimilar=function()
{for(id in VicinityDetails.similarMarkers)
{var marker=VicinityDetails.similarMarkers[id];MultiMaps.clearMarker(marker,true);}}
VicinityDetails.simListener=function()
{if(MultiMaps.zoom<14)
{MultiMaps.clearToast();return;}
if(VicinityDetails.loadingSim)
{return;}
VicinityDetails.updateButtons();var c=MultiMaps.normaliseLatLng(MultiMaps.map.getCenter());var sw=PaddedThreshold.padSWBounds(MultiMaps.getSWBounds());var ne=PaddedThreshold.padNEBounds(MultiMaps.getNEBounds());if(VicinityDetails.Similar)
{VicinityDetails.loadingSim=true;MultiMaps.throbber("Refining search",25000);$.get("/ajax_endpoint.php",{"action":"smi_nearby_properties","ad_type":VicinityDetails.AdType,"ad_id":VicinityDetails.AdId,"sw":"("+sw.lat+", "+sw.lng+")","ne":"("+ne.lat+", "+ne.lng+")","extra_params":"[]"},VicinityDetails.updateMapProperties);}
else
{VicinityDetails.refresh();}}
VicinityDetails.eatListener=function()
{if(MultiMaps.zoom<14)
{MultiMaps.clearToast();return;}
if(VicinityDetails.loadingEat)
{return;}
VicinityDetails.updateButtons();var sw=PaddedThreshold.padSWBounds(MultiMaps.getSWBounds());var ne=PaddedThreshold.padNEBounds(MultiMaps.getNEBounds());if(VicinityDetails.Eating)
{VicinityDetails.loadingEat=true;MultiMaps.throbber("Refining search",25000);$.get("/jscript/daftie/nearby_business.php",{"feature":"qype_food_drink","sw_lat":sw.lat,"sw_lon":sw.lng,"ne_lat":ne.lat,"ne_lon":ne.lng,"provider":"qype"},VicinityDetails.showEating);}
else
{VicinityDetails.clearEating();}}
VicinityDetails.showEating=function(data)
{var properties=JSON.parse(data);properties=properties.listing;for(id in properties)
{var property=properties[id];if(property.id===undefined)
{continue;}
VicinityDetails.EatingMarkers.push(MultiMaps.DrawQypeMarker(property,"/i/m/nearby_qype_food_drink.png","qype_food_drink"));}
VicinityDetails.loadingEat=false;VicinityDetails.clearLoader();}
VicinityDetails.clearEating=function()
{for(id in VicinityDetails.EatingMarkers)
{var marker=VicinityDetails.EatingMarkers[id];MultiMaps.clearMarker(marker,true);}
VicinityDetails.clearLoader();}
VicinityDetails.pprListener=function()
{if(MultiMaps.zoom<14)
{MultiMaps.clearToast();return;}
if(VicinityDetails.loadingPpr)
{return;}
VicinityDetails.updateButtons();if(VicinityDetails.SoldPpr)
{VicinityDetails.loadingPpr=true;ct={};ct.lat=MultiMaps.map.getCenter().lat();ct.lng=MultiMaps.map.getCenter().lng();MultiMaps.throbber("Refining search",25000);if(typeof window.propertyRequest=="object"&&typeof window.propertyRequest.abort=="function")
{window.propertyRequest.abort();}
window.propertyRequest=$.post('/priceregister?isAjax=1',{'action':'get_map_results','mapView':"1","rows":500,"center[lat]":ct.lat,"center[lng]":ct.lng,"radius":getMapRadius()},VicinityDetails.showPpr,'json');}
else
{VicinityDetails.refresh();}}
VicinityDetails.showPpr=function(data)
{properties=data.response.docs;window.properties=properties;for(id in properties)
{var property=properties[id];if(property.id===undefined)
{continue;}
VicinityDetails.PprMarkers.push(MultiMaps.DrawPprMarker("/i/m/sold_property.png",id));}
VicinityDetails.loadingPpr=false;VicinityDetails.clearLoader();}
VicinityDetails.clearPpr=function()
{for(id in VicinityDetails.PprMarkers)
{var marker=VicinityDetails.PprMarkers[id];MultiMaps.clearMarker(marker,true);}
VicinityDetails.clearLoader();}
VicinityDetails.eduListener=function()
{if(MultiMaps.zoom<14)
{MultiMaps.clearToast();return;}
if(VicinityDetails.loadingEdu)
{return;}
VicinityDetails.updateButtons();var sw=PaddedThreshold.padSWBounds(MultiMaps.getSWBounds());var ne=PaddedThreshold.padNEBounds(MultiMaps.getNEBounds());if(VicinityDetails.Education)
{VicinityDetails.loadingEdu=true;MultiMaps.throbber("Refining search",25000);$.get("/jscript/daftie/nearby_business.php",{"feature":"qype_education","sw_lat":sw.lat,"sw_lon":sw.lng,"ne_lat":ne.lat,"ne_lon":ne.lng,"provider":"qype"},VicinityDetails.showEducational);}
else
{VicinityDetails.clearEducation();}}
VicinityDetails.showEducational=function(data)
{var properties=JSON.parse(data);properties=properties.listing;for(id in properties)
{var property=properties[id];if(property.id===undefined)
{continue;}
VicinityDetails.EducationMarkers.push(MultiMaps.DrawQypeMarker(property,"/i/m/nearby_qype_education.png","qype_education"));}
VicinityDetails.loadingEdu=false;VicinityDetails.clearLoader();}
VicinityDetails.clearEducation=function()
{for(id in VicinityDetails.EducationMarkers)
{var marker=VicinityDetails.EducationMarkers[id];MultiMaps.clearMarker(marker,true);}
VicinityDetails.clearLoader();}
VicinityDetails.shopListener=function()
{if(MultiMaps.zoom<14)
{MultiMaps.clearToast();return;}
if(VicinityDetails.loadingShop)
{return;}
VicinityDetails.updateButtons();var sw=PaddedThreshold.padSWBounds(MultiMaps.getSWBounds());var ne=PaddedThreshold.padNEBounds(MultiMaps.getNEBounds());if(VicinityDetails.Shopping)
{VicinityDetails.loadingShop=true;MultiMaps.throbber("Refining search",25000);$.get("/jscript/daftie/nearby_business.php",{"feature":"qype_shopping","sw_lat":sw.lat,"sw_lon":sw.lng,"ne_lat":ne.lat,"ne_lon":ne.lng,"provider":"qype"},VicinityDetails.showShopping);}
else
{VicinityDetails.clearShopping();}}
VicinityDetails.showShopping=function(data)
{var properties=JSON.parse(data);properties=properties.listing;for(id in properties)
{var property=properties[id];if(property.id===undefined)
{continue;}
VicinityDetails.ShoppingMarkers.push(MultiMaps.DrawQypeMarker(property,"/i/m/nearby_qype_shopping.png","qype_shopping"));}
VicinityDetails.loadingShop=false;VicinityDetails.clearLoader();}
VicinityDetails.clearShopping=function()
{for(id in VicinityDetails.ShoppingMarkers)
{var marker=VicinityDetails.ShoppingMarkers[id];MultiMaps.clearMarker(marker,true);}
VicinityDetails.clearLoader();}
VicinityDetails.pubListener=function()
{if(MultiMaps.zoom<14)
{MultiMaps.clearToast();return;}
if(VicinityDetails.loadingPub)
{return;}
VicinityDetails.updateButtons();var sw=PaddedThreshold.padSWBounds(MultiMaps.getSWBounds());var ne=PaddedThreshold.padNEBounds(MultiMaps.getNEBounds());if(VicinityDetails.Pubbing)
{VicinityDetails.loadingPub=true;MultiMaps.throbber("Refining search",25000);$.get("/jscript/daftie/nearby_business.php",{"feature":"qype_nightlife","sw_lat":sw.lat,"sw_lon":sw.lng,"ne_lat":ne.lat,"ne_lon":ne.lng,"provider":"qype"},VicinityDetails.showPubbing);}
else
{VicinityDetails.clearPubbing();}}
VicinityDetails.showPubbing=function(data)
{var properties=JSON.parse(data);properties=properties.listing;for(id in properties)
{var property=properties[id];if(property.id===undefined)
{continue;}
VicinityDetails.PubbingMarkers.push(MultiMaps.DrawQypeMarker(property,"/i/m/nearby_qype_nightlife.png","qype_nightlife"));}
VicinityDetails.loadingPub=false;VicinityDetails.clearLoader();}
VicinityDetails.clearPubbing=function()
{for(id in VicinityDetails.PubbingMarkers)
{var marker=VicinityDetails.PubbingMarkers[id];MultiMaps.clearMarker(marker,true);}
VicinityDetails.clearLoader();}
VicinityDetails.docListener=function()
{if(MultiMaps.zoom<14)
{MultiMaps.clearToast();return;}
if(VicinityDetails.loadingDoc)
{return;}
VicinityDetails.updateButtons();var sw=PaddedThreshold.padSWBounds(MultiMaps.getSWBounds());var ne=PaddedThreshold.padNEBounds(MultiMaps.getNEBounds());if(VicinityDetails.Doctors)
{VicinityDetails.loadingDoc=true;MultiMaps.throbber("Refining search",25000);$.get("/jscript/daftie/nearby_business.php",{"feature":"qype_doctor","sw_lat":sw.lat,"sw_lon":sw.lng,"ne_lat":ne.lat,"ne_lon":ne.lng,"provider":"qype"},VicinityDetails.showDoctors);}
else
{VicinityDetails.clearDoctors();}}
VicinityDetails.showDoctors=function(data)
{var properties=JSON.parse(data);properties=properties.listing;for(id in properties)
{var property=properties[id];if(property.id===undefined)
{continue;}
VicinityDetails.DoctorsMarkers.push(MultiMaps.DrawQypeMarker(property,"/i/m/nearby_qype_doctor.png","qype_doctor"));}
VicinityDetails.loadingDoc=false;VicinityDetails.clearLoader();}
VicinityDetails.clearDoctors=function()
{for(id in VicinityDetails.DoctorsMarkers)
{var marker=VicinityDetails.DoctorsMarkers[id];MultiMaps.clearMarker(marker,true);}
VicinityDetails.clearLoader();}
return VicinityDetails;}());function getMapRadius()
{return distanceBetween(MultiMaps.map.getBounds().getNorthEast(),MultiMaps.map.getCenter());}
function distanceBetween(p1,p2)
{if(!p1||!p2){return 0;}
var R=6371;var dLat=(p2.lat()-p1.lat())*Math.PI/180;var dLon=(p2.lng()-p1.lng())*Math.PI/180;var a=Math.sin(dLat/2)*Math.sin(dLat/2)+
Math.cos(p1.lat()*Math.PI/180)*Math.cos(p2.lat()*Math.PI/180)*Math.sin(dLon/2)*Math.sin(dLon/2);var c=2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));var d=R*c;return d;};