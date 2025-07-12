
import { supabase } from '@/integrations/supabase/client';

/**
 * Generates a dynamic sitemap XML string
 * @returns Promise<string> The XML sitemap content
 */
export async function generateSitemap(baseUrl: string = 'https://autosog.com'): Promise<string> {
  // Start XML document
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  // Add static routes
  const staticRoutes = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/search', priority: '0.9', changefreq: 'daily' },
    { path: '/about', priority: '0.8', changefreq: 'monthly' },
    { path: '/auth', priority: '0.7', changefreq: 'monthly' },
  ];
  
  const currentDate = new Date().toISOString().split('T')[0];
  
  for (const route of staticRoutes) {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}${route.path}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += '  </url>\n';
  }
  
  // Get dynamic listing pages if connected to Supabase
  try {
    const { data: listings } = await supabase
      .from('car_listings')
      .select('id, updated_at')
      .eq('status', 'active');
    
    if (listings && listings.length > 0) {
      for (const listing of listings) {
        const lastMod = listing.updated_at 
          ? new Date(listing.updated_at).toISOString().split('T')[0]
          : currentDate;
        
        xml += '  <url>\n';
        xml += `    <loc>${baseUrl}/listing/${listing.id}</loc>\n`;
        xml += `    <lastmod>${lastMod}</lastmod>\n`;
        xml += '    <priority>0.8</priority>\n';
        xml += '    <changefreq>weekly</changefreq>\n';
        xml += '  </url>\n';
      }
    }
  } catch (error) {
    console.error('Error fetching listings for sitemap:', error);
    // Continue without dynamic listings if there's an error
  }
  
  // Close XML document
  xml += '</urlset>';
  
  return xml;
}

/**
 * Serves a dynamic sitemap as an XML response
 * Can be used in an API route
 */
export function serveSitemap(baseUrl: string = 'https://autosog.com'): Promise<Response> {
  return generateSitemap(baseUrl)
    .then(sitemap => {
      return new Response(sitemap, {
        headers: {
          'Content-Type': 'application/xml',
          'Cache-Control': 'public, max-age=86400'
        }
      });
    })
    .catch(error => {
      console.error('Error generating sitemap:', error);
      return new Response('Error generating sitemap', { status: 500 });
    });
}
