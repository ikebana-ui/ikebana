#!/bin/bash

MYCOMPONENTS="lib/components/"

dirs=`ls -l $MYCOMPONENTS | egrep '^d' | awk '{print $9}'`;

grunt clear;

for dir in $dirs 
do
	echo 'Building all files.....';
	grunt build --foldername=${dir};
done