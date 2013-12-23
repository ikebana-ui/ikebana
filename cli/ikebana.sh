#!/bin/sh

if [[ $1 == "" || $1 == "help" ]]; then
	sh help.sh
elif [[ $1 == "install" && $# -gt 2 ]]; then
	echo "Number of parameters more than expected."
	sh help.sh
elif [[ $2 == "" && $1 == "install" ]]; then
	sh install.sh "ikebana"
elif [[ $1 == "install" ]]; then
	sh install.sh $2
else
	echo "command not found."
	sh help.sh	
fi