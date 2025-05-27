#!/bin/bash

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "Error: ImageMagick is required but not installed."
    echo "Please install it using:"
    echo "  brew install imagemagick"
    exit 1
fi

# Navigate to public directory
cd public

# Generate favicon.ico (multi-size icon file)
convert favicon.svg -define icon:auto-resize=64,32,24,16 favicon.ico

# Generate PNG versions
convert favicon.svg -resize 192x192 logo192.png
convert favicon.svg -resize 512x512 logo512.png

echo "Icons generated successfully!" 