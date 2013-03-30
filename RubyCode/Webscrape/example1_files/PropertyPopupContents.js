
(function(){PropertyPopupContents={};PropertyPopupContents.init=function(property)
{if(property.AdType=='new_development')
{property.AdType='sale';}
this.area=property.area;this.collection=property.collection;this.county=property.county;this.id=property.id;this.is_ni=property.is_ni;this.lat=property.lat;this.lat_orig=property.lat_orig;this.long=property.long;this.long_orig=property.long_orig;this.photo=property.photo;this.photo_backup=property.photo_backup;this.price=property.price;this.rent=property.rent;this.street=property.street;this.summary=property.summary;this.timestamp=property.timestamp;this.AdType=property.AdType;}
var createImage=function()
{var link=createLink();return'<a href="'+link+'">'
+'<img '
+'src="'+PropertyPopupContents.photo+'" '
+'onerror=\'javascript: this.src = '
+'"'+PropertyPopupContents.photo_backup+'"\' '
+'alt="'+PropertyPopupContents.street+'" '
+'style="border: 1px solid #999; '
+'float: left; '
+'margin-left: 20px; '
+'margin-top: 10px; " '
+'width="75px" '
+'height="85px" />'
+'</a>';}
var createLink=function()
{return"/search"+PropertyPopupContents.AdType+".daft"
+"?id="+PropertyPopupContents.id;}
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
+"style='"
+"float: right; "
+"margin-right: 10px; "
+"margin-top: 10px; "
+"cursor: pointer;' "
+"onclick='MultiMaps.closePopup();' />";}
var createDescription=function()
{var text='<div style="'
+'float: left; '
+'margin-left: 10px; '
+'margin-top: 10px; '
+'line-height: 19px;">';if(PropertyPopupContents.street!='')
{text+='<a style="'
+'font-size: 12px; '
+'font-weight:bold; '
+'text-decoration: underline;" '
+'href="'+createLink()+'">'
+PropertyPopupContents.street
+'</a><br /> ';}
if(PropertyPopupContents.area!='')
{text+=PropertyPopupContents.area+', '
+PropertyPopupContents.county+'<br /> ';}
text+=PropertyPopupContents.summary+'<br />';return text;}
var removeComma=function(num)
{if(num.indexOf(',')==-1)
{return num;}
num=num.split(',');return parseInt(''+num[0]+num[1]);}
var createPrice=function()
{var price=0;var price_field="&euro;";var text="";if(PropertyPopupContents.price!=0)
{price=PropertyPopupContents.price;}
else
{price=PropertyPopupContents.rent;}
if(price!=0)
{if(PropertyPopupContents.is_ni)
{price_field='&pound;';}
text+='<strong>'+price_field+price+'</strong>';}
else
{text+='<strong>P.O.A.</strong>';}
if(PropertyPopupContents.price==0&&!isNaN(removeComma(PropertyPopupContents.rent))&&removeComma(PropertyPopupContents.rent)>0&&PropertyPopupContents.collection!=null)
{text+=' '+PropertyPopupContents.collection;}
return text;}
PropertyPopupContents.getHTML=function()
{var text=createBox();text+=createCloseButton();text+=createImage();text+=createDescription();text+=createPrice();text+='</div>';text+='<div style="'
+'clear: left; '
+'float: left; '
+'margin-top: 10px; '
+'margin-left: 20px; '
+'width: 200px;">'
+'<a href="'+createLink()+'" '
+'style="padding-left: 16px;">View this property</a></div>';text+=closeBox();return text;}
return PropertyPopupContents;}());