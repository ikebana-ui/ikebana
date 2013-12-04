if [[ $1 == "" ]]; then
	sh help.sh
elif [[ $2 == "" && $1 == "install" ]]; then
	sh install.sh "ikebana"
elif [[ $1 == "install" ]]; then
	sh install.sh $2
else
	echo "command not found."
	sh help.sh	
fi