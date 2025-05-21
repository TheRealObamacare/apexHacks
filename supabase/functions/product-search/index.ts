import { createClient } from "npm:@supabase/supabase-js@2.39.7";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const GOOGLE_API_KEY = Deno.env.get("GOOGLE_API_KEY");
const GOOGLE_CX = "017576662512468239146:omuauf_lfve";

async function searchSimilarProducts(query: string) {
  if (!GOOGLE_API_KEY) {
    console.error("Google API key is not configured");
    return [];
  }

  // Create a more specific search query for tennis rackets
  const searchQuery = `${query} tennis racket alternatives site:tennis-warehouse.com OR site:wilson.com OR site:babolat.com OR site:yonex.com OR site:dunlopsports.com -site:head.com`;
  
  const searchUrl = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX}&q=${encodeURIComponent(searchQuery)}`;
  
  try {
    const response = await fetch(searchUrl);
    
    if (!response.ok) {
      console.error(`Google API error: ${response.status} - ${await response.text()}`);
      return [];
    }
    
    const data = await response.json();
    
    if (!data.items || !Array.isArray(data.items)) {
      console.log("No search results found or invalid response format");
      return [];
    }
    
    // Filter for product URLs from major tennis brands
    const productUrls = data.items
      .filter((item: any) => {
        const domain = new URL(item.link).hostname;
        const isProductPage = item.link.toLowerCase().includes("racquet") || 
                            item.link.toLowerCase().includes("racket");
        return isProductPage && (
          domain.includes("tennis-warehouse.com") ||
          domain.includes("wilson.com") ||
          domain.includes("babolat.com") ||
          domain.includes("yonex.com") ||
          domain.includes("dunlopsports.com")
        );
      })
      .map((item: any) => item.link)
      .slice(0, 3);

    // Ensure we have unique brands
    const uniqueBrands = new Set();
    return productUrls.filter(url => {
      const domain = new URL(url).hostname;
      const brand = domain.split('.')[0];
      if (!uniqueBrands.has(brand)) {
        uniqueBrands.add(brand);
        return true;
      }
      return false;
    });
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { 
      headers: corsHeaders,
      status: 204
    });
  }

  try {
    if (req.method !== "POST") {
      throw new Error("Method not allowed");
    }

    const contentType = req.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Invalid content type. Expected application/json");
    }

    const { searchQuery } = await req.json();
    
    if (!searchQuery || typeof searchQuery !== "string") {
      throw new Error("Invalid or missing search query");
    }

    const productUrls = await searchSimilarProducts(searchQuery);

    return new Response(
      JSON.stringify({ productUrls }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 200
      }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        productUrls: [] 
      }),
      {
        status: error.message === "Method not allowed" ? 405 : 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});