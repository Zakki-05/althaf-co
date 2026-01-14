# Image Replacement Guide

## 🖼️ How to Add Real Images

### Quick Start - Using Free Stock Images

I've prepared direct download links for high-quality, royalty-free images you can use:

#### Option 1: Download from Unsplash (Recommended)

**Hero Image (Myrobalan Powder):**
- Search: "brown powder spices" or "herbal powder"
- Recommended: https://unsplash.com/s/photos/herbal-powder
- Size: 600x600px minimum
- Save as: `myrobalan-powder.jpg`

**Product Images:**
- Search: "kraft paper bag" or "spice packaging"
- Recommended: https://unsplash.com/s/photos/spice-packaging
- Size: 300x300px minimum
- Save as: `product-100g.jpg`, `product-250g.jpg`, `product-500g.jpg`

#### Option 2: Download from Pexels

**Herbal Powder Images:**
- https://www.pexels.com/search/herbal%20powder/
- https://www.pexels.com/search/spices/
- https://www.pexels.com/search/ayurvedic/

#### Option 3: Use Placeholder Services (Temporary)

Replace the SVG files with these temporary placeholder URLs in your HTML:

```html
<!-- Hero Image -->
<img src="https://images.unsplash.com/photo-1596040033229-a0b3b83b0e8c?w=600&h=600&fit=crop" alt="Pure Myrobalan Powder">

<!-- Product 100g -->
<img src="https://images.unsplash.com/photo-1599909533730-f9e0d8c5b9f5?w=300&h=300&fit=crop" alt="100g Pack">

<!-- Product 250g -->
<img src="https://images.unsplash.com/photo-1599909533730-f9e0d8c5b9f5?w=300&h=300&fit=crop" alt="250g Pack">

<!-- Product 500g -->
<img src="https://images.unsplash.com/photo-1599909533730-f9e0d8c5b9f5?w=300&h=300&fit=crop" alt="500g Pack">
```

### Step-by-Step: Replace Images

1. **Download or Create Images**
   - Hero image: 600x600px (myrobalan powder with fruits)
   - Product images: 300x300px each (packaging shots)

2. **Optimize Images**
   - Use TinyPNG: https://tinypng.com/
   - Or Squoosh: https://squoosh.app/
   - Target: Under 100KB per image

3. **Convert to WebP (Optional but Recommended)**
   ```bash
   # Using online converter
   https://cloudconvert.com/jpg-to-webp
   
   # Or using command line (if you have cwebp installed)
   cwebp -q 80 myrobalan-powder.jpg -o myrobalan-powder.webp
   ```

4. **Replace Files**
   - Delete the `.svg` files in `images/` folder
   - Add your new `.jpg` or `.webp` files
   - Keep the same filenames OR update HTML references

5. **Update HTML (if needed)**
   
   If you use different filenames, update `index.html`:
   
   ```html
   <!-- Line 61 - Hero Image -->
   <img src="images/YOUR_HERO_IMAGE.jpg" alt="Pure Myrobalan Powder with natural fruits" width="600" height="600" loading="eager">
   
   <!-- Line 106 - Product 100g -->
   <img src="images/YOUR_100G_IMAGE.jpg" alt="Myrobalan Powder 100g pack" width="300" height="300" loading="lazy">
   
   <!-- Line 118 - Product 250g -->
   <img src="images/YOUR_250G_IMAGE.jpg" alt="Myrobalan Powder 250g pack" width="300" height="300" loading="lazy">
   
   <!-- Line 130 - Product 500g -->
   <img src="images/YOUR_500G_IMAGE.jpg" alt="Myrobalan Powder 500g pack" width="300" height="300" loading="lazy">
   ```

### Image Specifications

| Image | Size | Format | Max File Size | Purpose |
|-------|------|--------|---------------|---------|
| Hero | 600x600px | JPG/WebP | 100KB | Main product showcase |
| Product 100g | 300x300px | JPG/WebP | 50KB | Small pack |
| Product 250g | 300x300px | JPG/WebP | 50KB | Medium pack |
| Product 500g | 300x300px | JPG/WebP | 50KB | Large pack |

### Free Image Resources

1. **Unsplash** - https://unsplash.com/
   - High quality, free to use
   - No attribution required
   - Search: "herbal powder", "spices", "ayurvedic"

2. **Pexels** - https://www.pexels.com/
   - Free stock photos
   - Commercial use allowed
   - Search: "powder", "herbs", "packaging"

3. **Pixabay** - https://pixabay.com/
   - Free images and videos
   - No attribution required
   - Search: "spice powder", "herbal"

4. **Canva** - https://www.canva.com/
   - Create custom product mockups
   - Free templates available
   - Great for packaging designs

### Using WebP for Better Performance

WebP images are 25-35% smaller than JPG while maintaining quality.

**HTML with WebP fallback:**
```html
<picture>
    <source srcset="images/myrobalan-powder.webp" type="image/webp">
    <img src="images/myrobalan-powder.jpg" alt="Pure Myrobalan Powder" width="600" height="600">
</picture>
```

### Quick Replace Script

Save this as `replace-images.ps1` in your project folder:

```powershell
# PowerShell script to quickly replace placeholder images

# Download images (you'll need to provide URLs)
$heroUrl = "YOUR_HERO_IMAGE_URL"
$product100Url = "YOUR_100G_IMAGE_URL"
$product250Url = "YOUR_250G_IMAGE_URL"
$product500Url = "YOUR_500G_IMAGE_URL"

# Download to images folder
Invoke-WebRequest -Uri $heroUrl -OutFile "images/myrobalan-powder.jpg"
Invoke-WebRequest -Uri $product100Url -OutFile "images/product-100g.jpg"
Invoke-WebRequest -Uri $product250Url -OutFile "images/product-250g.jpg"
Invoke-WebRequest -Uri $product500Url -OutFile "images/product-500g.jpg"

Write-Host "Images downloaded successfully!"
```

### Testing After Replacement

1. Open `index.html` in browser
2. Check all images load correctly
3. Verify image quality and sizing
4. Test on mobile view
5. Run Lighthouse audit to check performance

### Troubleshooting

**Images not showing?**
- Check file paths are correct
- Ensure filenames match exactly (case-sensitive)
- Verify images are in the `images/` folder
- Check browser console for errors (F12)

**Images too large?**
- Compress with TinyPNG or Squoosh
- Convert to WebP format
- Reduce dimensions if needed

**Images look blurry?**
- Use higher resolution source images
- Ensure you're using 2x size for retina displays
- Check compression quality settings

---

## 🎨 Current Status

✅ Navigation buttons enhanced with premium styling
✅ CTA buttons have god-tier gradient effects
✅ SVG placeholders in place (ready to replace)
⏳ Waiting for real product images

**Next Step:** Download or create your product images and follow the guide above!
