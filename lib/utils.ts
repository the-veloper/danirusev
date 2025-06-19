import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Extracts plain text from a rich text field
 * @param richText The rich text field from Payload
 * @returns A plain text string
 */
export function getTextFromRichText(richText: any): string {
  if (!richText || !Array.isArray(richText)) {
    return '';
  }

  return richText
    .map((node) => {
      if (node.type === 'text') {
        return node.text || '';
      } else if (node.children && Array.isArray(node.children)) {
        return getTextFromRichText(node.children);
      }
      return '';
    })
    .join(' ')
    .trim();
}

/**
 * Ensures we're using the correct URL for media
 * If it's a Supabase URL, use it directly
 * If it's an API URL, transform it to use the Supabase URL if possible
 */
export function getMediaUrl(url: string | undefined): string {
  if (!url) return '';
  
  // If it's already a Supabase URL, use it
  if (url.includes('supabase.co')) {
    return url;
  }
  
  // Check if it's an API URL that needs to be transformed
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseBucket = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || 'mediabucket';
  
  if (supabaseUrl && url.includes('/api/media/')) {
    // Extract the filename from the URL
    const filename = url.split('/').pop();
    if (filename) {
      return `${supabaseUrl}/storage/v1/object/public/${supabaseBucket}/media/${filename}`;
    }
  }
  
  // Return the original URL if we can't transform it
  return url;
}
