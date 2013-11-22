#!/bin/bash

MYCOMPONENTS="lib/components/"

dirs=`ls -l $MYCOMPONENTS | egrep '^d' | awk '{print $9}'`;

echo 'Cleaning target.....';
grunt clear;

echo 'Building ikebana.....';
grunt build-all;

for dir in $dirs
do
	echo 'Building '${dir}'.....';
	grunt build-selected --foldername=${dir};
done