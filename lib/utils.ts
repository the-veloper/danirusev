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
