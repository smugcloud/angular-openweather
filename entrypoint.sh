#!/bin/bash
#set -e

APPDIR='/var/weather'

if [[ $api_key ]]; then
	sed -i -e "s/^.*var apiKey =.*$/var apiKey = '$api_key'/" ${APPDIR}/app/js/secrets.js
  echo "Done writing key"
else
	echo "You must set API_KEY environment variable to retrieve OpenWeatherApp data."
	#exit 1
fi

#Now start the Server
cd /var/weather
http-server app -p 9090
