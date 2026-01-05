#!/bin/bash
# This is my first Bash script
echo "Hello, Bash!"

# check even or odd numbers
read -p "Enter a number: " num

if (( num % 2 == 0 )); then
    echo "$num is even"
else
    echo "$num is odd"
fi
# addition of two numbers
read -p "Enter first number: " a
read -p "Enter second number: " b

sum=$((a + b))

echo "The sum of $a and $b is $sum"