import getAllCategories from "@/utils/getAllCategories";
import getAllProducts from "@/utils/getAllProducts";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const homepage = "https://www.orionhome.nl";

function generateSiteMap(data: any) {
  const urls = data?.map((item: any) => {
    return {
      url: item?.slug,
    };
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${homepage}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
      <url>
        <loc>${homepage}/contact</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
      ${urls
        ?.map((item: any) => {
          return (
            item &&
            `<url>
              <loc>${item?.url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>daily</changefreq>
            </url>
          `
          );
        })
        .join("")}
    </urlset>
  `;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const products = await getAllProducts(1);

    const totalItems = [...products.data];

    const totalPages = products.meta?.pagination?.pageCount;

    const promise = await Promise.all(
      new Array(totalPages - 1).fill(0).map((_, index) => {
        return getAllProducts(index + 2);
      })
    );

    promise.forEach((res) => {
      totalItems.push(...res.data);
    });

    // categories
    const categories = await getAllCategories();

    const formatProducts = totalItems.map((item: any) => {
      return {
        slug:
          homepage +
          "/product/" +
          (item?.id + "?" + item.attributes?.title).replaceAll("&", "&amp;"),
      };
    });

    const formatCategories = categories?.data.map((item: any) => {
      return {
        slug:
          homepage +
          "/category/" +
          item.attributes?.title.replaceAll("&", "&amp;"),
      };
    });
    const sitemap = generateSiteMap([...formatProducts, ...formatCategories]);

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();
  } catch (error: any) {
    console.log(error);
    res.statusCode = 500;
    res.end();
  }
}

export default handler;
