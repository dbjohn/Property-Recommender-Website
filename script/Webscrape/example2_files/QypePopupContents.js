
(function(){QypePopupContents={};QypePopupContents.init=function(property,type)
{this.name=property.name;this.address=property.address;this.link=property.link;this.point=property.point;this.latitude=property.latitude;this.lat=this.latitude;this.longitude=property.longitude;this.long=this.longitude;this.distance=property.distance;this.average_rating=property.average_rating;this.image=property.image;this.id=property.id;this.type=type;}
var createBox=function()
{return"<div style='color: #000;"
+" border: none; "
+"padding: 0px; "
+"width: 324px; "
+"height: 131px; "
+"background-image: url(//c0.dmstatic.com/i/smimapdivbg.png); "
+"position: relative; "
+"z-index: 10000;'>";}
var closeBox=function()
{return'</div>';}
var createCloseButton=function()
{return"<img src='//c1.dmstatic.com/i/mapdiv_close.gif' "
+"alt='close' "
+"class='map-popup-close-button'"
+"onclick='MultiMaps.closePopup();' />";}
var createImage=function()
{if(QypePopupContents.image===null||QypePopupContents.image==="")
{QypePopupContents.image="http://c0.dmstatic.com/i/m/qype_no_image.png";}
return'<a href="'+QypePopupContents.link+'" '
+'onclick="_gaq.push([\'_trackEvent\', \'daft_from_bubble\', \''
+QypePopupContents.type
+'\', \'qype\']);" '
+'target="_new"'
+'>'
+'<img src="'+QypePopupContents.image+'" '
+"class='map-qype-popup-image'"
+'alt="'+QypePopupContents.name+';"'
+'/>'
+'</a>';}
var createRating=function()
{if(QypePopupContents.average_rating===0)
{QypePopupContents.average_rating="<span style='"
+"color: blue;"
+"'>not yet rated</span>";}
return"Rating: "+QypePopupContents.average_rating;}
var createNameLink=function()
{return'<span style="'
+'font-size:10pt; '
+'margin-top: 20px;"'
+'>'
+'<a '
+'href="'+QypePopupContents.link+'" '
+'onclick="_gaq.push([\'_trackEvent\', \'gp_from_bubble\', \''
+QypePopupContents.type
+'\']);" '
+'target="_new" '
+'style="font-size: 10px; '
+'font-weight: bold; '
+'text-decoration: underline;" '
+'>'+QypePopupContents.name
+'</a>'
+'</span>';}
var createAddress=function()
{return'<span style="'
+'font-size: 10pt; '
+'margin-top: 4px;">'
+QypePopupContents.address
+'</span>';}
var createFooter=function()
{return'<div style="'
+'clear: left; '
+'float: left; '
+'margin-top: 3px; '
+'margin-left: 20px; '
+'width: 200px; '
+'background: #e6f0f9;">'
+'<a href="'+QypePopupContents.link+'" '
+'onclick="_gaq.push([\'_trackEvent\', \'gp_from_bubble\', \''
+QypePopupContents.type
+'\']);" '
+'target="_new"'
+'>view more details &raquo;</a>'
+'</div>';}
var createReferal=function()
{return'Features provided by:'
+'<a href="http://www.qype.co.uk/">'
+'<img '
+'src="//c1.dmstatic.com/i/m/qype_logo.png" '
+'alt="Qype" '
+'height="16" '
+'width="44" '
+'style="'
+'display: inline; '
+'position: relative; '
+'white-space: nowrap; '
+'top: 6px;"'
+'>'
+'</a>';}
QypePopupContents.getHTML=function()
{var text=createBox();text+=createCloseButton();var image="";text+=createImage()
+'<div '
+'style="'
+'font-family: arial; '
+'width: 220px; '
+'min-height: 50px; '
+'line-height: 20px; '
+'font-size: 10px; '
+'white-space: nowrap; '
+'padding-top: 5px;"'
+'>'
+createNameLink()
+'<br />'
+createAddress()
+'<br />'
+createRating()
+'<br />'
+createReferal()
+'</div>'
+createFooter();text+=closeBox();return text;}
return QypePopupContents;}());