// extended simple example here http://wiki.openstreetmap.org/wiki/OpenLayers_Simple_Example#A_little_more_extensive_example
//we could use ecmascript 5 setters and getters, but it isn't supported on older browsers
//I am not sure how to do this, I might consider using function closure, getters and setters. see p.183 Java definitive guide for example
//will come back to it.



//TODO
//need to add a clear all checkbox. see trigger event
var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator P
 
function mapGenerate() {

        //*************
        // Map is being defined as a global variable, this seems to be the recommended practice
        window.map = new OpenLayers.Map("map_canvas");

        var maplayer = new OpenLayers.Layer.OSM();
		
        // var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
        // var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
        var position       = new OpenLayers.LonLat(-6.259460,53.345223).transform(fromProjection, toProjection);						
        var zoom           = 14; 

        map.addLayer(maplayer);
        map.setCenter(position, zoom);

};
 
function addDestinationMarker(pos){
			
	var markers = new OpenLayers.Layer.Markers( "Markers" );
	map.addLayer(markers);		

	marker = new OpenLayers.Marker(pos);
	
	
	markers.addMarker(marker);
				
	$("#commute_locate").click(function() {
		map.setCenter(marker.lonlat, 15); 
	});
};
			
 function  initInputMap() {
			
			mapGenerate();
			
			//this is built by extending the examples from here http://docs.openlayers.org/library/overlays.html#marker-overlays
			// and here http://openlayers.org/dev/examples/click-handler.html
			
			//TODO: repeatation? move to object namespace - or class or something
			// var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
			// var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
			var position       = new OpenLayers.LonLat(-6.259460,53.345223).transform(fromProjection, toProjection);						
			
			
			addDestinationMarker(position);
			
			position.transform(toProjection,fromProjection);						
			$("#commute_destination_val").val(position.lat.toString() + ","+ position.lon.toString());						
			
			//help from http://stackoverflow.com/questions/2160725/taking-coordinates-of-points-in-openlayers				
            
            map.events.register('click', map, function(e) {
                // If you are using OpenStreetMap (etc) tiles and want to convert back 
                // to gps coords add the following line :-
                // lonlat.transform( map.projection,map.displayProjection);
                marker.moveTo(e.xy);
                //must transform coords http://stackoverflow.com/questions/2601745/how-to-convert-vector-layer-coordinates-into-map-latitude-and-longitude-in-openl
                var lonlat = map.getLonLatFromViewPortPx(e.xy);
                lonlat.transform(new OpenLayers.Projection("EPSG:900913"), new OpenLayers.Projection("EPSG:4326"));
                $("#commute_destination_val").val(lonlat.lat.toString() + ","+ lonlat.lon.toString());			  
            });
						
    };
	
	 function initResultsMap (coords_hash, commute_destination) {
						
			//this is built by extending the examples from here http://docs.openlayers.org/library/overlays.html#marker-overlays
			// and here http://openlayers.org/dev/examples/click-handler.html
			// http://openlayers.org/dev/examples/vector-features-with-text.html
			//http://docs.openlayers.org/library/introduction.html#adding-a-vector-marker-to-the-map
					
            //TODO: make some of these variable declarations on one line.
			var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
			var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
			var zoom           = 12; 									
			var lat;
			var lon;
			var point;
			var pointFeature;			
			var i =1;
			var properties_obj = {};
			
			//add this outside the loop because it only needs to be done once.
			var coordinates = commute_destination.split(',');
			lat =  coordinates[0]
			lon =  coordinates[1]
			var position       = new OpenLayers.LonLat(lon,lat).transform(fromProjection, toProjection);			
			addDestinationMarker(position);
							
			for (prop in coords_hash){
				if(coords_hash.hasOwnProperty(prop)){
                    //************
                    //the statements for declaring the renderer and vector layer is based on modifying an example here: http://openlayers.org/dev/examples/vector-features-with-text.html
                     var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
                    renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;
                    
                    properties_obj[prop] = new OpenLayers.Layer.Vector("Simple Geometry", {
                        styleMap: new OpenLayers.StyleMap({'default':{
                            strokeColor: "#000000",
                            strokeOpacity: 1,
                            strokeWidth: 2,
                            fillColor: "#FF5500",
                            fillOpacity: 0.9,
                            pointRadius: 15,
                            // label with \n linebreaks
                            label : "${number}",                            
                            fontColor: "black",
                            fontSize: "12px",
                            fontFamily: "Courier New, monospace",
                            fontWeight: "bold",                            
                            labelOutlineColor: "white",
                            labelOutlineWidth: 3
                        }}),
                        renderers: renderer
                    });
                    //************
                                            
                    lon = coords_hash[prop][0];
                    lat =coords_hash[prop][1];
                    point = new OpenLayers.Geometry.Point(lon,lat);
                    point.transform(fromProjection, toProjection);		
                    pointFeature = new OpenLayers.Feature.Vector(point, {"property_id": prop, number: i});						                    
                    properties_obj[prop].addFeatures(pointFeature);
					i += 1;
                        
                    //commute_destination is actually a string in the order of latitude and longitude because that order was suited by OTP. We need to extract the long and lat values to create the marker.							
                    
                    map.addLayer(properties_obj[prop]);			
                    
                    $("#"+prop).click(function() {                                                                                                                                    
						var feature = properties_obj[this.id].getFeaturesByAttribute("property_id", this.id)[0];
						var x_coord = feature.geometry.x; 
						var y_coord = feature.geometry.y; 
						map.setCenter([x_coord, y_coord], zoom); 
                    });
                    
		}
	}
};
			
// class = 'changeMap'
// $('.changeMap').click(function () {
// lat = $(this).data('latitude')
// map.setCenter(lat,long);
// })
	
	function amenitiesPlot (coords_hash) {
		
			var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
			var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection						
			var zoom           = 12; 
			var amenity_obj = {}
			for(prop in coords_hash){
					if(coords_hash.hasOwnProperty(prop)){
							//a little help from http://stackoverflow.com/questions/8423217/jquery-checkbox-checked-state-changed-event

								var lat;
								var lon;
								var point;
								var pointFeature;
									
								//************
								//the statements for declaring the renderer and vector layer is based on modifying an example here: http://openlayers.org/dev/examples/vector-features-with-text.html
								 var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
								renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;
								
								amenity_obj[prop] = new OpenLayers.Layer.Vector("Simple Geometry", {
									styleMap: new OpenLayers.StyleMap({'default':{
										strokeColor: "#000000",
										strokeOpacity: 1,
										strokeWidth: 2,
										fillColor: "#00FFFF",
										fillOpacity: 0.9,
										pointRadius: 15,																				
										fontSize: "12px",
										fontFamily: "Courier New, monospace",
										fontWeight: "bold",										
										labelOutlineColor: "white",
										labelOutlineWidth: 3
									}}),
									renderers: renderer
								});
								//************

									lon = Number(coords_hash[prop][0]);
									lat =Number(coords_hash[prop][1]);
									var position = new OpenLayers.LonLat(lon,lat).transform(fromProjection, toProjection);
									point = new OpenLayers.Geometry.Point(lon,lat);
									point.transform(fromProjection, toProjection);		
									pointFeature = new OpenLayers.Feature.Vector(point, {"amenity_id": prop});
									amenity_obj[prop].addFeatures(pointFeature);
																		
									amenity_obj[prop].setVisibility(false);
									map.addLayer(amenity_obj[prop]);												
								
									$("#"+prop).change(function() {
									
										if(this.checked){
											amenity_obj[this.id].setVisibility(true);																					
											 console.log(amenity_obj[ this.id].getFeaturesByAttribute("amenity_id", this.id)[0].geometry.getVertices());
											 console.log(amenity_obj[ this.id].getFeaturesByAttribute("amenity_id", this.id)[0].geometry);
											 var feature = amenity_obj[ this.id].getFeaturesByAttribute("amenity_id", this.id)[0];
											 var x_coord = feature.geometry.x; 
											 var y_coord = feature.geometry.y; 
											 map.setCenter([x_coord, y_coord], zoom); 										
										}
										else{
											amenity_obj[this.id].setVisibility(false);										
										}
									});								
					}
			}
			
};
			