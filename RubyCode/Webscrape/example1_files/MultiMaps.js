
(function(){PaddedThreshold={}
PaddedThreshold.init=function(moveThreshold,zoomThreshold)
{this.moveThreshold=moveThreshold;this.zoomThreshold=zoomThreshold;this.center=MultiMaps.map.getCenter();this.zoom=MultiMaps.zoom;this.thresholdExceededCallback=null;}
PaddedThreshold.testNewPosition=function(newCenter,newZoom)
{var centerLat=PaddedThreshold.center.lat;if(typeof centerLat=='function')
{centerLat=PaddedThreshold.center.lat();}
var centerLng=PaddedThreshold.center.lng;if(typeof centerLng=='function')
{centerLng=PaddedThreshold.center.lng();}
if(PaddedThreshold.center===null||PaddedThreshold.zoom===null||PaddedThreshold.checkPosThreshold(newCenter.lat,centerLat)||PaddedThreshold.checkPosThreshold(newCenter.lng,centerLng)||PaddedThreshold.checkZoomThreshold(newZoom))
{PaddedThreshold.center=newCenter;PaddedThreshold.zoom=newZoom;if(PaddedThreshold.thresholdExceededCallback!==null)
{PaddedThreshold.thresholdExceededCallback();}}}
PaddedThreshold.onThresholdExceeded=function(callback)
{PaddedThreshold.thresholdExceededCallback=callback;}
PaddedThreshold.checkPosThreshold=function(a,b)
{return Math.abs(a-b)>PaddedThreshold.moveThreshold;}
PaddedThreshold.checkZoomThreshold=function(newZ)
{return Math.abs(PaddedThreshold.zoom-newZ)>PaddedThreshold.zoomThreshold;}
PaddedThreshold.padSWBounds=function(sw)
{sw.lat=sw.lat-PaddedThreshold.moveThreshold;sw.lng=sw.lng-PaddedThreshold.moveThreshold;return sw;}
PaddedThreshold.padNEBounds=function(ne)
{ne.lat=ne.lat+PaddedThreshold.moveThreshold;ne.lng=ne.lng+PaddedThreshold.moveThreshold;return ne;}
return PaddedThreshold;}());(function(){MultiMaps={};MultiMaps.init=function(jsonObject)
{var options=JSON.parse(jsonObject);this.map=null;this.gMapsLoaded=false;this.gMapsJustLoaded=true;this.onMQ=true;this.SVAvailable=false;this.domElement=options.elementName;this.latitude=options.latitude;this.longitude=options.longitude;this.markerLatitude=this.latitude;this.markerLongitude=this.longitude;this.showMarker=options.showMarker;this.showArea=options.showArea;this.radius=options.areaSize;this.zoom=options.zoom;this.mapButs=options.mapButtons;this.satButs=options.satButtons;this.streetButs=options.svButtons;this.lateLoad=options.lateLoad;this.markerDraggable=options.isMarkerDraggable;this.key=options.key;this.gmaps_mode="map";this.lateLoadId=options.lateLoadIds;this.clusterer=null;this.clustering=options.clustering;this.lastPolledPos=null;this.lastPolledZoom=null;this.MQMarkers=new Array();this.GMMarkers=new Array();this.GMPopup=null;this.delayMapRender=50;this.onlyGoogle=false;this.loadingGMaps=false;this.bizmapWaitTime=options.bizmapWaitTime;this.multipleAreas=options.multipleAreas;this.maxZoom=18;this.minZoom=1;if(options)
{if(options.maxZoom!=="undefined")
{this.maxZoom=options.maxZoom;}
if(options.minZoom!=="undefined")
{this.minZoom=options.minZoom;}
if(options.onlyGoogle!=="undefined")
{this.onlyGoogle=options.onlyGoogle;}}
if(typeof MultiMaps.onDrawCallback!=="function")
{MultiMaps.onDrawCallback=function(){;};}
if(typeof MultiMaps.onZoomCallback!=="function")
{MultiMaps.onZoomCallback=function(){;};}
if(typeof MultiMaps.onMoveCallback!=="function")
{MultiMaps.onMoveCallback=function(){;};}
if(typeof MultiMaps.onDragOrZoomCallback!=='function')
{MultiMaps.onDragOrZoomCallback=function(){;};}
MultiMaps.toastContainer=document.createElement("div");$(MultiMaps.toastContainer).attr("id","toastContainer");if(!MultiMaps.lateLoad)
{setTimeout(MultiMaps.mapClick,1000);}
else
{MultiMaps.lateLoadId=options.lateLoadIds;MultiMaps.setUpLateLoading();}
MultiMaps.jumpToGoogleIds=options.jumpToGoogleIds;MultiMaps.setUpJumpToGoogle();MultiMaps.activateAllButtons();}
MultiMaps.onDraw=function(callback)
{MultiMaps.onDrawCallback=callback;}
MultiMaps.onZoom=function(callback)
{MultiMaps.onZoomCallback=callback;}
MultiMaps.onMove=function(callback)
{MultiMaps.onMoveCallback=callback;}
MultiMaps.onDragOrZoom=function(callback)
{MultiMaps.onDragOrZoomCallback=callback;};MultiMaps.drawPopup=function(latitude,longitude,popupOptions)
{if(MultiMaps.onMQ)
{latlng=new L.LatLng(latitude,longitude,true);CustomPopup.init(popupOptions);popup=new L.Popup();popup.setLatLng(latlng);popup.setContent(CustomPopup.getHTML());MultiMaps.map.openPopup(popup);}
else
{popupOptions.popupClass+=' googleMapPopupCircle';CustomPopup.init(popupOptions);var popup=new GMapsPopup(CustomPopup,MultiMaps.map,{offX:-140,offY:0,onClick:CustomPopup.onClick});popup.show();}}
MultiMaps.openMarkerPopup=function(marker)
{if(MultiMaps.onMQ)
{marker.openPopup();}}
MultiMaps.onClick=function(callback)
{if(MultiMaps.onMQ)
{MultiMaps.map.on('click',function(e){latLng=e.latlng;latLng=MultiMaps.normaliseLatLng(latLng);callback(latLng);});}
else
{google.maps.event.addListener(MultiMaps.map,"click",function(e){latLng=e.latLng;latLng=MultiMaps.normaliseLatLng(latLng);callback(latLng);});}}
MultiMaps.closePopup=function()
{if(MultiMaps.onMQ)
{MultiMaps.map.closePopup();}
else
{if(MultiMaps.GMPopup!==null)
{MultiMaps.GMPopup.hide();}}}
MultiMaps.toast=function(message,timeout)
{$(MultiMaps.toastContainer).html(message);$('#'+MultiMaps.domElement).append(MultiMaps.toastContainer);$(MultiMaps.toastContainer).hide();$(MultiMaps.toastContainer).css({"display":"block","position":"relative","z-index":"10000","top":"30%","width":"200px","margin":"auto","border":"2px solid #efefef","background-color":"#555555","padding":"8px","font-weight":"bold","font-size":"15px","color":"#efefef","text-align":"center","line-height":"18px"});$(MultiMaps.toastContainer).show();setTimeout(MultiMaps.clearToast,timeout);}
MultiMaps.clearToast=function()
{$(MultiMaps.toastContainer).fadeOut(600,function(){$(MultiMaps.toastContainer).remove();});}
MultiMaps.throbber=function(message,timeout)
{MultiMaps.toast("<img "
+"src='/i/loading.gif' "
+"style='"
+"float: left; "
+"'/>"
+message,timeout);}
MultiMaps.setUpLateLoading=function()
{if(MultiMaps.lateLoad)
{$(MultiMaps.lateLoadId).bind("click.mm",function(){setTimeout(MultiMaps.mapClick,MultiMaps.delayMapRender);$(this).unbind("click.mm");});}}
MultiMaps.setUpJumpToGoogle=function()
{if(MultiMaps.jumpToGoogleIds.toString().length>0)
{$(MultiMaps.jumpToGoogleIds).bind("click.mm",function(){setTimeout(MultiMaps.satClick,MultiMaps.delayMapRender);$(this).unbind("click.mm");});}}
MultiMaps.activateAllButtons=function()
{for(id in MultiMaps.streetButs)
{streetBut=MultiMaps.streetButs[id];if(typeof(streetBut)=="string")
{$("#"+streetBut).css('cursor','pointer');$("#"+streetBut).removeClass('over');$('#'+streetBut).bind('click.mm',MultiMaps.streetClick);}}
for(id in MultiMaps.mapButs)
{var mapBut=MultiMaps.mapButs[id];if(typeof(mapBut)=="string")
{$('#'+mapBut).css('cursor','pointer');$('#'+mapBut).removeClass('over');$('#'+mapBut).bind("click.mm",MultiMaps.mapClick);}}
for(id in MultiMaps.satButs)
{satBut=MultiMaps.satButs[id];if(typeof(satBut)=="string")
{$('#'+satBut).css('cursor','pointer');$('#'+satBut).removeClass('over');$('#'+satBut).bind("click.mm",MultiMaps.satClick);}}}
MultiMaps.drawGMapStreetView=function()
{if(MultiMaps.onMQ)
{$('#'+MultiMaps.domElement).empty();}
MultiMaps.onMQ=false;if(MultiMaps.SVAvailable!==true)
{MultiMaps.satClick();MultiMaps.toast("Streetview not available at this location.",2000,MultiMaps.domElement);for(id in MultiMaps.streetButs)
{streetBut=MultiMaps.streetButs[id];if(typeof(streetBut)=="string")
{$('#'+streetBut).hide();}}
return;}
var point=new google.maps.LatLng(MultiMaps.latitude,MultiMaps.longitude);MultiMaps.map=new google.maps.Map(document.getElementById(MultiMaps.domElement));var panoramaOptions={position:point,scrollwheel:false};var panorama=new google.maps.StreetViewPanorama(document.getElementById(MultiMaps.domElement),panoramaOptions);MultiMaps.map.setStreetView(panorama);}
MultiMaps.loadGMapScript=function()
{if(MultiMaps.loadingGMaps==true)
{return;}
MultiMaps.loadingGMaps=true;$('#'+MultiMaps.domElement).html("<img src='/i/loadingAnimation.gif' id='map_throbber'/>");$('#map_throbber').css({"margin":"auto","position":"relative","top":"100px"})
var s=document.createElement("script");s.type="text/javascript";key="";if(typeof this.key!="undefined"&&this.key.length>0)
{key="&key="+this.key;}
s.src="//maps.google.com/maps/api/js"
+"?v=3"
+key
+"&sensor=true"
+"&callback=MultiMapCallBackHandler";$("head").append(s);}
MultiMaps.configButtons=function(buttonsOn)
{for(id in MultiMaps.satButs)
{satBut=MultiMaps.satButs[id];if(typeof(satBut)=="string")
{$('#'+satBut).css('cursor','pointer');$('#'+satBut).removeClass('over');$('#'+satBut).bind("click.mm",MultiMaps.satClick);}}
for(id in MultiMaps.mapButs)
{mapBut=MultiMaps.mapButs[id];if(typeof(mapBut)=="string")
{$('#'+mapBut).css('cursor','pointer');$('#'+mapBut).removeClass('over');$('#'+mapBut).bind("click.mm",MultiMaps.mapClick);}}
for(id in MultiMaps.streetButs)
{streetBut=MultiMaps.streetButs[id];if(typeof(streetBut)=="string")
{$('#'+streetBut).css('cursor','pointer');$('#'+streetBut).removeClass('over');$('#'+streetBut).bind("click.mm",MultiMaps.streetClick);}}
for(id in buttonsOn)
{buttonOn=buttonsOn[id];if(typeof(buttonOn)=="string")
{$("#"+buttonOn).css('cursor','default');$("#"+buttonOn).addClass('over');$("#"+buttonOn).unbind('click.mm');}}}
MultiMaps.satClick=function()
{MultiMaps.gmaps_mode="map";if(MultiMaps.gMapsLoaded)
{setTimeout(MultiMaps.drawGMapSatelliteView,MultiMaps.delayMapRender);}
else
{MultiMaps.loadGMapScript();}
MultiMaps.configButtons(MultiMaps.satButs);}
MultiMaps.mapClick=function()
{if(MultiMaps.onlyGoogle)
{MultiMaps.gmaps_mode="road";if(MultiMaps.gMapsLoaded)
{setTimeout(MultiMaps.drawGMapRoadmapView,MultiMaps.delayMapRender);}
else
{MultiMaps.loadGMapScript();}}
else
{setTimeout(MultiMaps.drawMQMap,MultiMaps.delayMapRender);}
MultiMaps.configButtons(MultiMaps.mapButs);}
MultiMaps.streetClick=function()
{MultiMaps.gmaps_mode="street";if(MultiMaps.gMapsLoaded)
{setTimeout(MultiMaps.drawGMapStreetView,MultiMaps.delayMapRender);}
else
{MultiMaps.loadGMapScript();}
MultiMaps.configButtons(MultiMaps.streetButs);}
MultiMaps.CallbackHandler=function()
{MultiMaps.gMapsLoaded=true;if(MultiMaps.gmaps_mode=="road")
{MultiMaps.drawGMapRoadmapView();}
else
{MultiMaps.drawGMapSatelliteView();}}
MultiMaps.checkForStreetview=function()
{var svc=new google.maps.StreetViewService();var latlng=new google.maps.LatLng(MultiMaps.markerLatitude,MultiMaps.markerLongitude);svc.getPanoramaByLocation(latlng,50,function(data,status){if(status=="OK")
{MultiMaps.SVAvailable=true;}
else
{$('#'+MultiMaps.streetBut).hide();MultiMaps.SVAvailable=false;}});}
MultiMaps.setView=function(lat,lng,zoom)
{MultiMaps.zoom=zoom;MultiMaps.latitude=lat;MultiMaps.longitude=lng;if(MultiMaps.onMQ)
{MultiMaps.map.setView(new L.LatLng(lat,lng,true),zoom);}
else
{MultiMaps.map.setZoom(zoom);MultiMaps.map.setCenter(new google.maps.LatLng(lat,lng));}}
MultiMaps.clearMarker=function(marker)
{if(MultiMaps.onMQ)
{MultiMaps.map.removeLayer(marker);}
else
{if(typeof marker.setMap=="function")
{marker.setMap(null);}}}
MultiMaps.drawMarker=function(latitude,longitude,draggable)
{draggable=typeof draggable!=='undefined'?draggable:false;if(MultiMaps.onMQ)
{var marker=drawMQMarker(latitude,longitude,draggable);MultiMaps.MQMarkers.push(marker);return marker;}
else
{var marker=drawGMapMarker(latitude,longitude,draggable);MultiMaps.GMMarkers.push(marker);return marker;}}
MultiMaps.drawClusteredMarker=function(latitude,longitude)
{if(MultiMaps.onMQ)
{return drawMQClusteredMarker(latitude,longitude);}
else
{return drawGMapClusteredMarker(latitude,longitude);}}
MultiMaps.DrawCustomMarker=function(latitude,longitude,icon)
{if(MultiMaps.onMQ)
{var marker=MultiMaps.DrawCustomMQMarker(latitude,longitude,icon);MultiMaps.MQMarkers.push(marker);return marker;}
else
{var marker=MultiMaps.DrawCustomGMapsMarker(latitude,longitude,icon);MultiMaps.GMMarkers.push(marker);return marker;}}
MultiMaps.DrawPinWithLabel=function(pinWithLabel)
{if(MultiMaps.onMQ)
{MultiMaps.DrawMQPinWithLabel(pinWithLabel);}
else
{MultiMaps.DrawGMapsPinWithLabel(pinWithLabel);}}
MultiMaps.DrawMQPinWithLabel=function(pinWithLabel)
{var popup=new L.Popup({autoPan:false});popup.setLatLng(new L.LatLng(pinWithLabel.latitude,pinWithLabel.longitude,true));popup.setContent(pinWithLabel.getHTML());MultiMaps.MQMarkers.push(popup);MultiMaps.map.addLayer(popup);return popup}
MultiMaps.DrawGMapsPinWithLabel=function(pinWithLabel)
{var popup=new GMapsPopup(pinWithLabel,MultiMaps.map,{offX:0,offY:0,onClick:pinWithLabel.onClick});popup.showMulti();MultiMaps.GMMarkers.push(popup);}
MultiMaps.DrawPprMarker=function(icon,propertyId)
{property=window.properties[propertyId];if(property.address===undefined)
{return;}
if(MultiMaps.onMQ)
{return;}
else
{return MultiMaps.DrawGMapsPprMarker(icon,propertyId);}}
MultiMaps.DrawGMapsPprMarker=function(icon,propertyId)
{property=window.properties[propertyId];var marker=drawGMapClusteredMarker(property.plocation_0_coordinate,property.plocation_1_coordinate,icon);google.maps.event.addListener(marker,"click",function(marker){MultiMaps.togglePprPopup(marker,propertyId);});return marker;}
MultiMaps.togglePprPopup=function(marker,propertyId)
{property=window.properties[propertyId];popupData={};popupData.lat=marker.latLng.lat();popupData.long=marker.latLng.lng();popupData.getHTML=function()
{return'<div class="ppr-popup-container"><div class="ppr-popup-notch"></div><div class="ppr-main-content"><span class="ppr-popup-close" onClick="pprClosePopups()"></span>'
+'<span class="ppr-popup-line">'+property.address+', '+property.area+'</span>'
+'<span class="ppr-popup-line">'+property.type_description+'<br />'
+'<strong>'+property.sold_price+'</strong> | '+property.sold_date+'</span>'
+'<div class="ppr-bottom-bar"><img style="display: inline;" src="/i/white_sold_icon.png" class="ppr-popup-sold"/></div></div></div>';}
if(typeof window.popup=="object")
{window.popup.hide();}
window.popup=new GMapsPopup(popupData,MultiMaps.map,{offX:2,offY:-10});window.popup.show();MultiMaps.map.panToBounds(window.popup.getBounds());}
MultiMaps.DrawQypeMarker=function(business,icon,type)
{if(business.link===undefined)
{return;}
if(MultiMaps.onMQ)
{return MultiMaps.DrawMQQypeMarker(business,icon,type);}
else
{return MultiMaps.DrawGMapsQypeMarker(business,icon,type);}}
MultiMaps.DrawMQQypeMarker=function(business,icon,type)
{var marker=MultiMaps.DrawCustomMQMarker(business.latitude,business.longitude,icon);QypePopupContents.init(business,type);MultiMaps.popup=marker.bindPopup(QypePopupContents.getHTML());MultiMaps.popup._popup.options.offset=new L.Point(185,75);MultiMaps.popup._popup.options.maxWidth="430";MultiMaps.popup._popup.options.closeButton=false;return marker;}
MultiMaps.DrawGMapsQypeMarker=function(business,icon,type)
{var marker=MultiMaps.DrawCustomGMapsMarker(business.latitude,business.longitude,icon);QypePopupContents.init(business,type);var popup=new GMapsPopup(QypePopupContents,MultiMaps.map,{offX:20,offY:-75});google.maps.event.addListener(marker,'click',function(){popup.show();MultiMaps.map.panToBounds(popup.getBounds());});return marker;}
MultiMaps.DrawCustomMQMarker=function(latitude,longitude,icon)
{var MarkerIcon=L.Icon.extend({iconUrl:icon,iconSize:new L.Point(32,37)});var Marker=new MarkerIcon();var markerLatLng=new L.LatLng(latitude,longitude,true);var marker=new L.Marker(markerLatLng,{icon:Marker});MultiMaps.map.addLayer(marker);MultiMaps.MQMarkers.push(marker);return marker;}
MultiMaps.DrawCustomGMapsMarker=function(latitude,longitude,icon)
{var markerPoint=new google.maps.LatLng(latitude,longitude);var GMMark=new google.maps.Marker
({icon:new google.maps.MarkerImage(icon),position:markerPoint});GMMark.setMap(MultiMaps.map);MultiMaps.GMMarkers.push(GMMark);return GMMark;}
var drawGMapMarker=function(latitude,longitude,draggable)
{var markerPoint=new google.maps.LatLng(latitude,longitude);var shadow=new google.maps.MarkerImage("/osm_files/dist/images/marker-shadow.png");shadow.anchor=new google.maps.Point(12,41);var GMMark=new google.maps.Marker
({icon:new google.maps.MarkerImage("/osm_files/dist/images/marker.png"),shadow:shadow,position:markerPoint,map:MultiMaps.map,draggable:draggable});return GMMark;}
var drawMQMarker=function(latitude,longitude,draggable)
{var option={};var markerLatLng=new L.LatLng(latitude,longitude,true);if(draggable===true)
{option={draggable:true};}
var marker=new L.Marker(markerLatLng,option);MultiMaps.map.addLayer(marker);return marker;}
var drawGMapClusteredMarker=function(latitude,longitude,icon)
{if(icon===undefined)
{icon="/i/m/nearby_property.png";}
var markerPoint=new google.maps.LatLng(latitude,longitude);var shadow=new google.maps.MarkerImage("/i/m/nearby_shadow.png");var GMMark=new google.maps.Marker
({icon:new google.maps.MarkerImage(icon),shadow:shadow,position:markerPoint,size:new google.maps.Size(32,37),anchor:new google.maps.Point(14,33)});if(MultiMaps.clustering)
{MultiMaps.clusterer.addMarker(GMMark);}
else
{GMMark.setMap(MultiMaps.map);}
MultiMaps.GMMarkers.push(GMMark);return GMMark;}
var drawMQClusteredMarker=function(latitude,longitude)
{var ClusterIcon=L.Icon.extend({iconUrl:'/i/m/nearby_property.png',shadowUrl:'/i/m/nearby_shadow.png',iconSize:new L.Point(32,37)});var Cluster=new ClusterIcon();var markerLatLng=new L.LatLng(latitude,longitude,true);var marker=new L.Marker(markerLatLng,{icon:Cluster});if(MultiMaps.clustering)
{MultiMaps.clusterer.addMarker(marker);}
else
{MultiMaps.map.addLayer(marker);MultiMaps.MQMarkers.push(marker);}
return marker;}
MultiMaps.drawPropertyMarker=function(property,icon)
{var marker=MultiMaps.drawClusteredMarker(property.lat,property.long);if(marker===undefined)
{return false;}
PropertyPopupContents.init(property);if(MultiMaps.onMQ)
{var popup=marker.bindPopup(PropertyPopupContents.getHTML());popup._popup.options.offset=new L.Point(185,75);popup._popup.options.maxWidth="430";popup._popup.options.closeButton=true;}
else
{var popup=new GMapsPopup(PropertyPopupContents,MultiMaps.map,{offX:20,offY:-75});google.maps.event.addListener(marker,'click',function(){popup.show();MultiMaps.map.panToBounds(popup.getBounds());});}}
MultiMaps.drawDraggablePinWithLabel=function(lat,lng,draggable,popupOptions)
{var marker=MultiMaps.drawMarker(lat,lng,draggable);CustomPopup.init(popupOptions);if(MultiMaps.onMQ)
{CustomPopup.init(popupOptions);var popup=marker.bindPopup(CustomPopup.getHTML());popup.openPopup();return marker;}
else
{popupOptions.popupClass='googleMapPopup';CustomPopup.init(popupOptions);var popup=new GMapsPopup(CustomPopup,MultiMaps.map,{offX:-140,offY:0,onClick:CustomPopup.onClick});popup.show();google.maps.event.addListener(marker,'click',function(){popup.show();});google.maps.event.addListener(marker,'dragstart',function(){popup.hide();});return marker;}}
MultiMaps.clearMarkers=function()
{MultiMaps.closePopup();if(MultiMaps.onMQ)
{var marker;for(id in MultiMaps.MQMarkers)
{marker=MultiMaps.MQMarkers[id];MultiMaps.map.removeLayer(marker);}
MultiMaps.MQMarkers=new Array();if(MultiMaps.clusterer)
{MultiMaps.clusterer.clearMarkers();}}
else
{if(MultiMaps.gmaps_mode="map")
{var marker;for(id in MultiMaps.GMMarkers)
{marker=MultiMaps.GMMarkers[id];if(typeof marker.setMap==="function")
{marker.setMap(null);}}
MultiMaps.clusterer.clearMarkers();}
else
{MultiMaps.drawGMapStreetView();}}}
MultiMaps.drawAreaMarker=function(latitude,longitude,area)
{if(MultiMaps.onMQ)
{drawMQAreaMarker(latitude,longitude,area);}
else
{drawGMapAreaMarker(latitude,longitude,area);}}
var drawGMapAreaMarker=function(latitude,longitude,area)
{var markerPoint=new google.maps.LatLng(latitude,longitude);var marker=new google.maps.Circle({center:markerPoint,radius:(area*0.61),fillColor:"#6b99ff",strokeColor:"#4654bc",strokeWeight:1,map:MultiMaps.map});$(marker).click(function(){$(google.maps).click();});MultiMaps.GMMarkers.push(marker);}
var drawMQAreaMarker=function(latitude,longitude,area)
{var markerLatLng=new L.LatLng(latitude,longitude,true);var marker=new L.Circle(markerLatLng,area,{weight:1,fillColor:"#6b99ff",color:"#4654bc"});MultiMaps.MQMarkers.push(marker);MultiMaps.map.addLayer(marker);}
MultiMaps.normaliseLatLng=function(pos)
{var ret={};if(MultiMaps.onMQ)
{ret.lat=pos.lat;ret.lng=pos.lng;}
else
{ret.lat=pos.lat();ret.lng=pos.lng();}
return ret;}
MultiMaps.getNEBounds=function()
{var point=MultiMaps.map.getBounds().getNorthEast();return MultiMaps.normaliseLatLng(point);}
MultiMaps.getSWBounds=function()
{var point=MultiMaps.map.getBounds().getSouthWest();return MultiMaps.normaliseLatLng(point);}
MultiMaps.showProperty=function()
{if(MultiMaps.showMarker)
{MultiMaps.drawMarker(MultiMaps.markerLatitude,MultiMaps.markerLongitude,MultiMaps.markerDraggable);}
else
{MultiMaps.drawAreaMarker(MultiMaps.markerLatitude,MultiMaps.markerLongitude,this.radius);}}
MultiMaps.drawMQMap=function(callCallback)
{if(callCallback===undefined)
{callCallback=true;}
$('#'+MultiMaps.domElement).empty();MultiMaps.onMQ=true;var cloudmadeUrl='http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png';var subDomains=['otile1','otile2','otile3','otile4'];var cloudmadeAttrib='Map data &copy; '
+'<a href="http://www.openstreetmap.org">OpenStreetMap</a>'
+' - Map by &copy; <a href="http://open.mapquest.co.uk">MapQuest</a>';var latlng=new L.LatLng(MultiMaps.latitude,MultiMaps.longitude,true);var cloudmade=new L.TileLayer(cloudmadeUrl,{maxZoom:MultiMaps.maxZoom,minZoom:MultiMaps.minZoom,attribution:cloudmadeAttrib,subdomains:subDomains});MultiMaps.map=new L.Map(MultiMaps.domElement,{scrollWheelZoom:false}).addLayer(cloudmade).setView(latlng,MultiMaps.zoom);PaddedThreshold.init(0.01,0);PaddedThreshold.onThresholdExceeded(MultiMaps.refreshJSON);MultiMaps.showProperty();if(MultiMaps.clustering)
{MultiMaps.clusterer=new LeafClusterer(MultiMaps.map);}
MultiMaps.map.on('zoomend',function(e){MultiMaps.pollProperties();});MultiMaps.map.on('dragend',function(e){MultiMaps.pollProperties();});if(callCallback)
{MultiMaps.onDrawCallback();}}
MultiMaps.ZoomControl=function(div,map)
{$(div).css({"margin-left":"10px"});$(div).css({"margin-top":"10px"});$(div).addClass("leaflet-control-container");var zoomDiv=document.createElement("DIV");$(zoomDiv).addClass("leaflet-control-zoom");$(zoomDiv).addClass("leaflet-control");var zoomIn=document.createElement("a");$(zoomIn).addClass("leaflet-control-zoom-in");var zoomOut=document.createElement("a");$(zoomOut).addClass("leaflet-control-zoom-out");zoomDiv.appendChild(zoomIn);zoomDiv.appendChild(zoomOut);div.appendChild(zoomDiv);google.maps.event.addDomListener(zoomIn,'click',MultiMaps.zoomMapIn);google.maps.event.addDomListener(zoomOut,'click',MultiMaps.zoomMapOut);}
MultiMaps.zoomMapIn=function()
{MultiMaps.map.setZoom(MultiMaps.map.getZoom()+1);}
MultiMaps.zoomMapOut=function()
{MultiMaps.map.setZoom(MultiMaps.map.getZoom()-1);}
MultiMaps.drawGMapSatelliteView=function(callCallback)
{if(callCallback===undefined)
{callCallback=true;}
if(MultiMaps.onMQ)
{$('#'+MultiMaps.domElement).empty();}
MultiMaps.onMQ=false;var point=new google.maps.LatLng(MultiMaps.latitude,MultiMaps.longitude);MultiMaps.map=new google.maps.Map(document.getElementById(MultiMaps.domElement),{center:point,mapTypeId:google.maps.MapTypeId.HYBRID,disableDefaultUI:true,zoomControl:true,zoomControlOptions:{style:google.maps.ZoomControlStyle.SMALL},scrollwheel:false,disableDoubleClickZoom:false,zoom:MultiMaps.zoom,maxZoom:MultiMaps.maxZoom,minZoom:MultiMaps.minZoom});MultiMaps.clusterer=new MarkerClusterer(MultiMaps.map,[],{gridSize:60});PaddedThreshold.init(0.01,0);PaddedThreshold.onThresholdExceeded(MultiMaps.refreshJSON);google.maps.event.addListener(MultiMaps.map,"zoom_changed",function(){MultiMaps.pollProperties();});google.maps.event.addListener(MultiMaps.map,"dragend",function(){MultiMaps.pollProperties();});google.maps.event.addListener(MultiMaps.map,'rightclick',function(e){throw'Free exception with every context menu.';});MultiMaps.showProperty();if(callCallback)
{if(MultiMaps.gMapsJustLoaded)
{setTimeout(MultiMaps.onDrawCallback,1000);MultiMaps.gMapsJustLoaded=false;}
else
{MultiMaps.onDrawCallback();}}}
MultiMaps.drawGMapRoadmapView=function(callCallback)
{if(callCallback===undefined)
{callCallback=true;}
if(MultiMaps.onMQ)
{$('#'+MultiMaps.domElement).empty();}
MultiMaps.onMQ=false;var point=new google.maps.LatLng(MultiMaps.latitude,MultiMaps.longitude);MultiMaps.map=new google.maps.Map(document.getElementById(MultiMaps.domElement),{center:point,mapTypeId:google.maps.MapTypeId.ROADMAP,disableDefaultUI:true,zoomControl:true,zoomControlOptions:{style:google.maps.ZoomControlStyle.SMALL},scrollwheel:false,disableDoubleClickZoom:false,zoom:MultiMaps.zoom,maxZoom:MultiMaps.maxZoom,minZoom:MultiMaps.minZoom});if(MultiMaps.multipleAreas.length)
{fitMapToAreas();}
google.maps.event.addListener(MultiMaps.map,'rightclick',function(e){throw'Free exception with every context menu.';});MultiMaps.clusterer=new MarkerClusterer(MultiMaps.map,[],{gridSize:60});PaddedThreshold.init(0.01,0);PaddedThreshold.onThresholdExceeded(MultiMaps.refreshJSON);google.maps.event.addListener(MultiMaps.map,"zoom_changed",function(){MultiMaps.onDragOrZoomCallback();MultiMaps.pollProperties();});google.maps.event.addListener(MultiMaps.map,"dragend",function(){MultiMaps.onDragOrZoomCallback();MultiMaps.pollProperties();});MultiMaps.showProperty();if(callCallback)
{if(MultiMaps.gMapsJustLoaded)
{setTimeout(MultiMaps.onDrawCallback,1000);MultiMaps.gMapsJustLoaded=false;}
else
{MultiMaps.onDrawCallback();}}}
var fitMapToAreas=function()
{var bounds=new google.maps.LatLngBounds();$.each(MultiMaps.multipleAreas,function(index,area){bounds.extend(new google.maps.LatLng(area.lat,area.lng));});MultiMaps.map.fitBounds(bounds);google.maps.event.addListenerOnce(MultiMaps.map,'bounds_changed',function(event){if(this.getZoom()>15)
{this.setZoom(15);}});}
MultiMaps.pollProperties=function()
{if(MultiMaps.map.getBounds()===null)
{return;}
var pos=MultiMaps.normaliseLatLng(MultiMaps.map.getCenter());MultiMaps.zoom=MultiMaps.map.getZoom();MultiMaps.latitude=pos.lat;MultiMaps.longitude=pos.lng;if(MultiMaps.zoom===18)
{MultiMaps.clustering=false;}
else
{MultiMaps.clustering=true;}
PaddedThreshold.testNewPosition(pos,MultiMaps.zoom);}
MultiMaps.refreshJSON=function()
{MultiMaps.onMoveCallback();}
MultiMaps.onMarkerDragend=function(draggableMarker,callback,gMapPopupOptions)
{if(MultiMaps.onMQ)
{draggableMarker.on('dragend',function(e){latLng=e.target.getLatLng();latLng=MultiMaps.normaliseLatLng(latLng);callback(latLng);});}
else
{google.maps.event.addListener(draggableMarker,"dragend",function(e){latLng=e.latLng;latLng=MultiMaps.normaliseLatLng(latLng);gMapPopupOptions.lat=latLng.lat;gMapPopupOptions.lng=latLng.lng;CustomPopup.init(gMapPopupOptions);var popup=new GMapsPopup(CustomPopup,MultiMaps.map,{offX:-140,offY:0,onClick:CustomPopup.onClick});popup.show();MultiMaps.map.panToBounds(popup.getAdEntryBounds());callback(latLng);});}}
MultiMaps.disable=function()
{if(MultiMaps.onMQ)
{MultiMaps.map.doubleClickZoom.disable();MultiMaps.map.scrollWheelZoom.disable();MultiMaps.map.touchZoom.disable();MultiMaps.map.dragging.disable();$('.leaflet-control-zoom').hide();$('#disabled-map').addClass('disabled-map');}
else
{$('.leaflet-control-container').hide();$('#disabled-map').addClass('disabled-map');}}
MultiMaps.enable=function()
{if(MultiMaps.onMQ)
{MultiMaps.map.doubleClickZoom.enable();MultiMaps.map.scrollWheelZoom.enable();MultiMaps.map.touchZoom.enable();MultiMaps.map.dragging.enable();$('.leaflet-control-zoom').show();$('#disabled-map').removeClass('disabled-map');}
else
{$('.leaflet-control-container').show();$('#disabled-map').removeClass('disabled-map');}}
return MultiMaps;}());function pprClosePopups()
{$(".ppr-popup-container").hide();}
function MultiMapCallBackHandler()
{var s=document.createElement("script");s.type="text/javascript";s.src="/jscript/daftie/after_gmaps_loaded.js";$("head").append(s);MultiMaps.checkForStreetview();}
function clustererCallback()
{MultiMaps.CallbackHandler();}