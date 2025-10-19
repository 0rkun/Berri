import { defineQuery } from "next-sanity";

export const SALE_QUERY=defineQuery(`*[_type == "sale"] | order(name asc ) `)

export const PRODUCTS_QUERY=defineQuery(`*[_type == "product"] | order(name asc)`)

export const QATEGORIES_QUERY=defineQuery(`*[_type == "category"] | order(name asc ) `)

export const PRODUCTS_BY_SLUG = defineQuery(`*[_type == "product" && slug.current== $slug  ] | order(name asc)[0]`)

export const PRODUCTS_SEARCH_QUERY = defineQuery(`*[_type == "product" && name match $searchParam  ] | order(name asc)`)

export const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`
  *[_type == "product" && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(name asc){
    _id,
    name,
    "slug": slug.current,
    price,
    discount,
    stock,
    label,
    status,
    description,
    image, 
  }
`);