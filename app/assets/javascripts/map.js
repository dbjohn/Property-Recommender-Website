// extended simple example here http://wiki.openstreetmap.org/wiki/OpenLayers_Simple_Example#A_little_more_extensive_example
//we could use ecmascript 5 setters and getters, but it isn't supported on older browsers
//I am not sure how to do this, I might consider using function closure, getters and setters. see p.183 Java definitive guide for example
//will come back to it.


//doesn't work
//window.map = new OpenLayers.Map("map_canvas");
 
 function mapGenerate() {
			
			//*************
			// Map is being defined as a global variable, this is wrong. need to use var for a local variable
			window.map = new OpenLayers.Map("map_canvas");
	
			var maplayer         = new OpenLayers.Layer.OSM();
			var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
			var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
			var position       = new OpenLayers.LonLat(-6.259460,53.345223).transform(fromProjection, toProjection);						
			var zoom           = 12; 
	 
			map.addLayer(maplayer);
			map.setCenter(position, zoom );
 
 };

 function  initInputMap() {
			
			mapGenerate();
			
			//this is built by extending the examples from here http://docs.openlayers.org/library/overlays.html#marker-overlays
			// and here http://openlayers.org/dev/examples/click-handler.html
			
			//repeatation? move to object namespace - or class or something
			var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
			var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
			var position       = new OpenLayers.LonLat(-6.259460,53.345223).transform(fromProjection, toProjection);						
			
			
			var markers = new OpenLayers.Layer.Markers( "Markers" );
			map.addLayer(markers);

			
			
			var marker = new OpenLayers.Marker(position);
			marker.id = "1";
			//marker.events.register("mousedown", marker, function() {alert(this.id);});
			markers.addMarker(marker);
			
			position.transform(toProjection,fromProjection);						
			$("#commute_destination_val").val(position.lat.toString() + ","+ position.lon.toString());
			
			//new class for control.click
			 // OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {                
						// defaultHandlerOptions: {
							// 'single': true,
							// 'double': false,
							// 'pixelTolerance': 0,
							// 'stopSingle': false,
							// 'stopDouble': false
						// },
						 // initialize: function(options) {
							// this.handlerOptions = OpenLayers.Util.extend(
								// {}, this.defaultHandlerOptions
							// );
							// OpenLayers.Control.prototype.initialize.apply(
								// this, arguments
							// ); 
							// this.handler = new OpenLayers.Handler.Click(
								// this, {
									// 'click': this.trigger
								// }, this.handlerOptions
							// );
						// }, 
						// trigger: function(e) {
							// //var lonlat = map.getLonLatFromPixel(e.xy);
							// var lonlat = map.getLonLatFromViewPortPx(e.xy);
							// alert("You clicked near " + lonlat.lat + " N, " + lonlat.lon + " E + x " + e.x + " + y " + e.y + " e.xy " + e.xy);
						// }
				// });
			// var click = new OpenLayers.Control.Click();
			// map.addControl(click);
			// click.activate();
			
			//help from http://stackoverflow.com/questions/2160725/taking-coordinates-of-points-in-openlayers
			
			map.events.register('click', map, handleMapClick);
			
			function handleMapClick(e)
			{
			   
			   // use lonlat

			   // If you are using OpenStreetMap (etc) tiles and want to convert back 
			   // to gps coords add the following line :-
			   // lonlat.transform( map.projection,map.displayProjection);
			   marker.moveTo(e.xy);
			   //must transform coords http://stackoverflow.com/questions/2601745/how-to-convert-vector-layer-coordinates-into-map-latitude-and-longitude-in-openl
			   var lonlat = map.getLonLatFromViewPortPx(e.xy);
				lonlat.transform(new OpenLayers.Projection("EPSG:900913"), new OpenLayers.Projection("EPSG:4326"));
			   $("#commute_destination_val").val(lonlat.lat.toString() + ","+ lonlat.lon.toString());
			   // Longitude = lonlat.lon
			   // Latitude  = lonlat.lat
			    //alert("You clicked near " + lonlat.lat + " N, " + lonlat.lon + " E + x " + e.x + " + y " + e.y + " e.xy " + e.xy);
			} 
			
			//continue here:
			//view-source:http://openlayers.org/dev/examples/markers.html
			//view-source:http://openlayers.org/dev/examples/click-handler.html
			
    };
	
	 function initResultsMap (coord_array) {
						
						//mapGenerate();
			
			//this is built by extending the examples from here http://docs.openlayers.org/library/overlays.html#marker-overlays
			// and here http://openlayers.org/dev/examples/click-handler.html
			// http://openlayers.org/dev/examples/vector-features-with-text.html
			//http://docs.openlayers.org/library/introduction.html#adding-a-vector-marker-to-the-map
			
			
			//see what would happen if you comment these lines out:
			var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
			var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
			
			//var markers = new OpenLayers.Layer.Markers( "Markers" );
			
			var lat;
			var lon;
			var point;
			var pointFeature;
			// var vectorLayer = new OpenLayers.Layer.Vector("Overlay", {
                // styleMap: new OpenLayers.StyleMap({                    
                    // fillColor: "#666666"
                // })});
				
			//************
			//the statements for declaring the renderer and vector layer is based on modifying an example here: http://openlayers.org/dev/examples/vector-features-with-text.html
			 var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
            renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;
            
            var propertyLayer = new OpenLayers.Layer.Vector("Simple Geometry", {
                styleMap: new OpenLayers.StyleMap({'default':{
                    strokeColor: "#000000",
                    strokeOpacity: 1,
                    strokeWidth: 2,
                    fillColor: "#FF5500",
                    fillOpacity: 0.9,
                    pointRadius: 15,
                    // label with \n linebreaks
                    label : "${number}",
                    
                    fontColor: "${favColor}",
                    fontSize: "12px",
                    fontFamily: "Courier New, monospace",
                    fontWeight: "bold",
                    labelAlign: "${align}",
                    labelXOffset: "${xOffset}",
                    labelYOffset: "${yOffset}",
                    labelOutlineColor: "white",
                    labelOutlineWidth: 3
                }}),
                renderers: renderer
            });
			//************
				
			
			var i =1;
			
			for (element in coord_array){
				lon = coord_array[element][0];
				lat =coord_array[element][1];
				point = new OpenLayers.Geometry.Point(lon,lat);
				point.transform(fromProjection, toProjection);		
				pointFeature = new OpenLayers.Feature.Vector(point);
				pointFeature.attributes = { number: i};
				i += 1;
				//position  = new OpenLayers.LonLat(lon,lat).transform(fromProjection, toProjection);		
				//markers.addMarker(new OpenLayers.Marker(position));
				propertyLayer.addFeatures([pointFeature]);
			}
			
			map.addLayer(propertyLayer);			
			
			// map.addLayer(markers);
			
			
			// var marker = new OpenLayers.Marker(position);
			// marker.id = "1";
			// marker.events.register("mousedown", marker, function() {alert(this.id);});
			// markers.addMarker(marker);						
			
};
			

	//enable layer naming, with ["string"] as a property of this. each layer will be named according to the property.
	function amenitiesPlot (coord_array) {
		
			//see what would happen if you comment these lines out:
			var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
			var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
			
			//var markers = new OpenLayers.Layer.Markers( "Markers" );
			
			var lat;
			var lon;
			var point;
			var pointFeature;
				
			//************
			//the statements for declaring the renderer and vector layer is based on modifying an example here: http://openlayers.org/dev/examples/vector-features-with-text.html
			 var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
            renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;
            
            var vectorLayer = new OpenLayers.Layer.Vector("Simple Geometry", {
                styleMap: new OpenLayers.StyleMap({'default':{
                    strokeColor: "#000000",
                    strokeOpacity: 1,
                    strokeWidth: 2,
                    fillColor: "#00FFFF",
                    fillOpacity: 0.9,
                    pointRadius: 15,
                    // label with \n linebreaks
                    label : "${number}",
                    
                    fontColor: "${favColor}",
                    fontSize: "12px",
                    fontFamily: "Courier New, monospace",
                    fontWeight: "bold",
                    labelAlign: "${align}",
                    labelXOffset: "${xOffset}",
                    labelYOffset: "${yOffset}",
                    labelOutlineColor: "white",
                    labelOutlineWidth: 3
                }}),
                renderers: renderer
            });
			//************
				
			
			var i =1;
			
			for (element in coord_array){
				lon = coord_array[element][0];
				lat =coord_array[element][1];
				point = new OpenLayers.Geometry.Point(lon,lat);
				point.transform(fromProjection, toProjection);		
				pointFeature = new OpenLayers.Feature.Vector(point);
				// pointFeature.attributes = { number: i};
				// i += 1;
				//position  = new OpenLayers.LonLat(lon,lat).transform(fromProjection, toProjection);		
				//markers.addMarker(new OpenLayers.Marker(position));
				vectorLayer.addFeatures([pointFeature]);
			}
			
			map.addLayer(vectorLayer);			
			
			// map.addLayer(markers);
			
			
			// var marker = new OpenLayers.Marker(position);
			// marker.id = "1";
			// marker.events.register("mousedown", marker, function() {alert(this.id);});
			// markers.addMarker(marker);						
			
};
			