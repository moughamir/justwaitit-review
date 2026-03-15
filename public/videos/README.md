# Hero Video Assets

This directory contains the video assets for the new landing page hero section.

## Required Files

### Video Files (16:9 aspect ratio, recommended 1920x1080)

1. **hero-showcase.mp4** (primary format)
   - Format: MP4 (H.264 codec)
   - Aspect Ratio: 16:9
   - Resolution: 1920x1080 (or higher for retina)
   - Duration: 15-30 seconds recommended
   - File size: < 5MB optimized
   - Loop: Seamless loop recommended
   - Audio: Optional (video plays muted by default)

2. **hero-showcase.webm** (fallback format)
   - Format: WebM (VP9 codec)
   - Same specifications as MP4
   - Provides better compression for supported browsers

### Poster Image

3. **hero-video-poster.webp**
   - Format: WebP (with PNG fallback if needed)
   - Aspect Ratio: 16:9
   - Resolution: 1920x1080
   - File size: < 200KB
   - This is shown as a placeholder while the video loads

## Video Content Guidelines

The hero video should showcase:

- AI-powered fashion photography capabilities
- Before/after transformations
- Background replacement examples
- Lighting adjustment demonstrations
- Lookbook generation previews
- Cinematic fashion moments

## Optimization Tips

1. **Compress video** using HandBrake or FFmpeg
2. **Use constant quality** (CRF 23-28 for H.264)
3. **Remove audio track** if not needed (saves space)
4. **Consider shortening** to 15-20 seconds for better loop
5. **Test loading** on slow connections (3G throttling)

## Example FFmpeg Commands

```bash
# Compress MP4 for web
ffmpeg -i input.mov -c:v libx264 -crf 25 -preset slow -c:a aac -b:a 128k hero-showcase.mp4

# Create WebM version
ffmpeg -i input.mov -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus hero-showcase.webm

# Extract poster frame
ffmpeg -i input.mov -ss 00:00:02 -vframes 1 -vf scale=1920:1080 hero-video-poster.webp
```

## Lazy Loading Behavior

The video component implements lazy loading:

- Loads when 10% visible in viewport
- 200px root margin for early loading
- Shows placeholder poster while loading
- Muted autoplay for better browser compatibility
- User can unmute or pause/play as needed

## Fallback Behavior

If video fails to load:

1. Browser tries WebM format
2. Then tries MP4 format
3. Shows "Your browser does not support the video tag" message
4. Page remains fully functional without video
