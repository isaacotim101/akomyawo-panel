# Blog Editor Setup Guide

This guide will help you set up TinyMCE editor and Supabase storage for your blog attachments.

## 1. TinyMCE Setup

### Get a TinyMCE API Key
1. Go to [TinyMCE](https://www.tiny.cloud/)
2. Sign up for a free account
3. Get your API key from the dashboard
4. ✅ **For Development:** Using `no-api-key` (TinyMCE allows this for development)
5. For production, replace with your actual API key in `.env`:

```env
REACT_APP_TINYMCE_API_KEY=your-actual-api-key-here
```

### Features
- Rich text editing with toolbar
- Image upload directly in content
- Media embedding
- Code editing
- Fullscreen mode
- Word count

## 2. Supabase Setup

### Create a Supabase Project
1. Go to [Supabase](https://supabase.com/)
2. Create a new project
3. Wait for the project to be set up

### Configure Storage
1. In your Supabase dashboard, go to "Storage"
2. Create a new bucket called `blog-attachments`
3. Set the bucket to public (uncheck "Private")
4. Configure RLS (Row Level Security) policies if needed

### Get Your Keys
1. In your Supabase dashboard, go to "Settings" > "API"
2. Copy your Project URL and anon/public key
3. Add them to your `.env` file:

```env
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
```

### Storage Bucket Setup
Make sure your `blog-attachments` bucket has the following settings:
- **Public**: Yes (so files can be accessed via URL)
- **File size limit**: Set according to your needs (default 50MB)
- **Allowed MIME types**: Configure as needed

## 3. Environment Variables

Create a `.env` file in your project root with:

```env
# Supabase Configuration
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here

# TinyMCE Configuration
REACT_APP_TINYMCE_API_KEY=your-tinymce-api-key-here
```

## 4. File Upload Features

### Inline Images
- Click the image icon in the TinyMCE toolbar
- Upload images that get embedded directly in the content
- Images are automatically uploaded to Supabase storage

### Featured Images
- Upload a main image for articles/projects
- Stored in Supabase storage

### Attachments
- Upload multiple files (PDFs, docs, images, etc.)
- All stored in Supabase storage
- Downloadable links provided

## 5. Migration from Cloudinary

If you were previously using Cloudinary:
1. Your existing Cloudinary URLs will still work
2. New uploads will go to Supabase
3. You can gradually migrate old files if needed

## 6. Testing

After setup:
1. Try creating a new article/project
2. Upload a featured image
3. Add inline images to content
4. Upload attachments
5. Save and verify everything works

## 7. Troubleshooting

### TinyMCE Issues
- Make sure your API key is correct
- Check browser console for errors
- Verify the editor loads properly

### Supabase Issues
- Check your project URL and keys
- Verify the storage bucket exists and is public
- Check Supabase dashboard for upload errors
- Ensure CORS is properly configured

### File Upload Issues
- Check file size limits
- Verify MIME types are allowed
- Check network connectivity
- Look at browser developer tools for errors