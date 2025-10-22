import os
from PIL import Image

# Step 1: Load the image
image_path = "static/img/logos/openart-image_qO-Dx6fV_1761043842924_raw (1).jpg"
img = Image.open(image_path)

# Step 2: Resize image (adjust width to fit terminal)
width = 50  # adjust as needed
aspect_ratio = img.height / img.width
height = int(width * aspect_ratio)
img = img.resize((width, height))

# Step 3: Convert image to RGB
img_rgb = img.convert("RGB")

# Step 4: Map each pixel to a single emoji based on brightness
def pixel_to_emoji(r, g, b):
    brightness = (r + g + b) // 3
    # Choose a single emoji for all pixels (here using 🟩 as example)
    # You can use a mapping with multiple emojis if you want shading
    return "🟩" if brightness > 128 else "⬛"

# Step 5: Create emoji mosaic
mosaic = ""
for y in range(img.height):
    for x in range(img.width):
        r, g, b = img_rgb.getpixel((x, y))
        mosaic += pixel_to_emoji(r, g, b)
    mosaic += "\n"

# Step 6: Save mosaic to file
output_file = "emoji_mosaic.txt"
output_path = os.path.abspath(output_file)
with open(output_path, "w", encoding="utf-8") as f:
    f.write(mosaic)

# Step 7: Print mosaic in terminal and path
print(mosaic)
print(f"✅ Emoji mosaic saved to: {output_path}")
