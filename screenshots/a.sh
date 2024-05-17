for file in *.{jpg,jpeg,png}; do
  convert "$file" -resize 1290x2796\> "${file%.{jpg,jpeg,png}}-resized.${file##*.}"
done
