#!/bin/bash

filename=$1
start_line=$2
end_line=$3

if [ -z "$filename" ] || [ -z "$start_line" ] || [ -z "$end_line" ]
then
    echo "Usage: $0 <filename> <start_line> <end_line>"
    exit 1
fi

if [ ! -f "$filename" ]
then
    echo "Error: $filename does not exist"
    exit 1
fi

if [ "$start_line" -gt "$end_line" ]
then
    echo "Error: start line cannot be greater than end line"
    exit 1
fi

awk "NR >= $start_line && NR <= $end_line" "$filename"
