import { Product } from "@/sanity.types";
import { sanityFetch } from "../lib/live";
import { PRODUCTS_BY_CATEGORY_QUERY, PRODUCTS_BY_SLUG, PRODUCTS_QUERY, PRODUCTS_SEARCH_QUERY, QATEGORIES_QUERY, SALE_QUERY } from "./queries";

export const getSale = async() => {
    try {
        const products = await sanityFetch({
              query:SALE_QUERY,
        });
        return products?.data || []; 
    } catch (error) {
        console.error("Error fetching Sale data:", error )
        return [];
    }
}

export const getAllProducts = async() => {
    try {
    const products= await sanityFetch({
        query:PRODUCTS_QUERY,
    });
    return products.data || []      
    } catch (error) {
        console.error("all product fetching error", error);
        return [];
    }
}

export const getAllCategories = async () => {
    try {
        const categories = await sanityFetch({
            query:QATEGORIES_QUERY
        })
        return categories.data || []
    } catch (error) {
        console.error("all categories fetching error", error)
        return [];
    }
}


export const getProductBySlug = async (slug: string): Promise<Product | null> => {
  try {
    const product = await sanityFetch({
      query: PRODUCTS_BY_SLUG,
      params: { slug },
    });

    // Sanity'nin data yapısı genelde { data: {...} } şeklindedir
    return product?.data || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null; // ✅ Artık array dönmüyor
  }
};

export const searchProductsByName = async(searchParam:string) => {
        try {
            const products = await sanityFetch({
                query: PRODUCTS_SEARCH_QUERY,
                params: {
                    searchParam: searchParam,
                }
            })
            return products?.data || [];
        } catch (error) {
        console.error("fetching product by name error", error)
        return [];
    }
}


export const  getProductsByCategory = async (categorySlug:string) => {
    try {
        const products = await sanityFetch({
            query: PRODUCTS_BY_CATEGORY_QUERY,
            params:{
                categorySlug
            }
        })
        return products?.data  || [];
    } catch (error) {
        console.error("fetching product categorys name", error)
        return [];
    }
}