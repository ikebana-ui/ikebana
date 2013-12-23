#!/bin/sh

flavour=$(echo $1|cut -f1 -d':')
component=$(echo $1|cut -f2 -d':')
flavour_component=""

if [[ $component == "all" || $component == $flavour ]]; then
	flavour_component=$flavour
else flavour_component=$flavour'_'$component
fi

response=$(curl --write-out %{http_code} --silent --output temp.zip localhost:8000/$flavour_component.zip)

if [[ $response -eq 200 ]]; then
	unzip -q -d $flavour_component/ temp.zip 
	echo "\033[32mSuccessfully installed $flavour_component!!!\033[30m"
	rm -rf temp.zip
elif [[ $response -eq 404 ]]; then
	rm -rf temp.zip
	echo "\033[0;31mERROR: \033[0m \033[1m$1 not found. Make sure you have given a flavour/component served by ikebana.\033[0m	"
	sh help.sh
elif [[ $response -eq 000 ]]; then
	echo "\033[31mERROR: \033[0m \033[1mSorry we are down!!"
fi