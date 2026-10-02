const BACKEND_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? 'https://interior-webapp-php-backend.onrender.com/api'
).replace(/\/api\/?$/, '');

export const FALLBACK_PRODUCT_IMAGE =
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';

/**
 * Normalizes any image URL:
 * - Fixes legacy dead domain from initial deployment
 * - Prepends backend URL to relative storage paths
 * - Fallbacks safely to luxury architectural placeholder if missing
 */
export function resolveImageUrl(url?: string | null): string {
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return FALLBACK_PRODUCT_IMAGE;
  }

  let cleanUrl = url.trim();

  // Fix legacy dead domain from initial deployment
  if (cleanUrl.includes('interior-webapp-php.onrender.com')) {
    cleanUrl = cleanUrl.replace(
      'interior-webapp-php.onrender.com',
      'interior-webapp-php-backend.onrender.com'
    );
  }

  // Handle local storage paths
  if (cleanUrl.startsWith('/storage/')) {
    return `${BACKEND_URL}${cleanUrl}`;
  }
  if (cleanUrl.startsWith('storage/')) {
    return `${BACKEND_URL}/${cleanUrl}`;
  }

  return cleanUrl;
}
