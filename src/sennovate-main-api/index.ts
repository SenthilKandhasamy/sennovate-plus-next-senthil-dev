import { Service } from "./service.type";

export async function getService({ slug }: { slug?: string }) {
  let url = `${process.env.SENNOVATE_MAIN_WEBSITE_URL}/wp-json/sennovate/v1/services`;
  if (slug) {
    url +=
      "?" +
      new URLSearchParams({
        slug,
      });
  }

  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      Cookie: "wordpress_=hack-no-cache",
    },
  });
  return res.json() as Promise<Service[]>;
}
