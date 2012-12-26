#!/bin/bash

echo "**";
echo "** Bash script to download/install/congigure PostGIS and Geoserver on a pre-existing LAPP stack.";
echo "**";
echo "** Mark Foley, October 2011.  Amended October 2012.";
echo "**";

# Check that script run as root 
if ! [ $UID = 0 ]; then
	echo "**";
	echo "** This script should be run as root. Exiting now.";
	echo "**";
	exit 1;
fi

echo "**";
echo "** Using ... ".$(psql -V);
echo "** Check the script to ensure that you are installing the correct versions of PostGIS and Geoserver";
echo "** This script assumes PostgreSQL 8.4, Geoserver 2.2 and Tomcat 6";
echo "**";

echo "**";
echo "** 1. Install required packages";
echo "**";

apt-get -y update && apt-get -y upgrade		# Make sure that you have an up-to-date sources list and 
						# upgrade to latest versions of everything.

apt-get -y install postgresql-8.4-postgis	# Install appropriate version of PostGIS.

echo "**";
echo "** 2. Download and install Geoserver";
echo "**";

apt-get -y install tomcat6			# Servlet container to run Geoserver as it's written in Java

wget http://downloads.sourceforge.net/geoserver/geoserver-2.2-war.zip
unzip geoserver-2.2-war.zip 
cp -v geoserver.war /var/lib/tomcat6/webapps/
 
echo "**";
echo "** 3. Create test database - 'firstSpatialDB'";
echo "**";

createdb -U postgres firstSpatialDB
createlang -U postgres plpgsql firstSpatialDB

# Add PostGIS functions

psql -U postgres -f /usr/share/postgresql/8.4/contrib/postgis-1.5/postgis.sql myFirstSpatialDB
psql -U postgres -f /usr/share/postgresql/8.4/contrib/postgis-1.5/spatial_ref_sys.sql myFirstSpatialDB

echo "**";
echo "** 4. Clear up any unnecessary rubbish left behind";
echo "**";

apt-get -y update && apt-get -y upgrade && apt-get -y autoremove && apt-get -y autoclean 

echo "**";
echo "** 5. Check that date/time/timezone are set correctly";
echo "**";

dpkg-reconfigure tzdata

echo "**";
echo "** 6. Finished";
echo "**";

