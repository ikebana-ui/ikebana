if [[ $1 -eq "" ]]; then
	flavour_component="ikebana"
else
	flavour=$(echo $1|cut -f1 -d':')
	component=$(echo $1|cut -f2 -d':')
	if [ $component -eq "all" -o $component -eq $flavour]; then
		flavour_component=$flavour
	else flavour_component=$flavour'_'$component
	fi
fi

response=$(curl --write-out %{http_code} --silent --output temp.zip localhost:8000/$flavour_component.zip)

if [[ $response -eq 200 ]]; then
	unzip -q -d $flavour_component/ temp.zip 
	rm -rf temp.zip
elif [[ $response -eq 404 ]]; then
	echo "$1 not found"
	echo "SYNTAX: ikebana <flavour_name>:<component_name>"
	echo -e "\t\tOR"
	echo -e "\tikebana <flavour_name>:all"
	echo -e "\t\tOR"
	echo -e "\tikebana <flavour_name>"
fi