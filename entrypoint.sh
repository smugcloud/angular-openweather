#!/bin/bash
#set -e

APPDIR='/var/weather'

if [[ $API_KEY ]]; then
	sed -i -e "s/^.*var apiKey =.*$/var apiKey = '$API_KEY'/" ${APPDIR}/app/js/secrets.js
  echo "Done writing key"
else
	echo "You must set API_KEY environment variable to retrieve OpenWeatherApp data."
	#exit 1
fi

#Now start the Server
node /var/weather/scripts/web-server.js
