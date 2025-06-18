import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Extracts plain text from a rich text object or returns the original string
 */
export function getTextFromRichText(content: any): string {
  if (!content) return '';
  if (typeof content === 'string') return content;
  if (content.root && content.root.children) {
    return content.root.children
      .map((child: any) => {
        if (child.text) return child.text;
        if (child.children) {
          return child.children.map((c: any) => c.text || '').join('');
        }
        return '';
      })
      .join('');
  }
  return '';
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
