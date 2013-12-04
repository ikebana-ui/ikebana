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
	rm -rf temp.zip
	echo "successfully installed $flavour_component."
elif [[ $response -eq 404 ]]; then
	rm -rf temp.zip
	echo "$1 not found."
	sh help.sh
fi