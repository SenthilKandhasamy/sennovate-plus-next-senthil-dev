import { Service } from "./service.type";
import { Servicefalse } from "./service.type";
export async function getService({ slug }: { slug?: string } = {}) {
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
export async function getServicefalse() {
  let url = `${process.env.SENNOVATE_MAIN_WEBSITE_URL}/wp-json/sennovate/v1/servicesfalse?slug=common-document`;
  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      Cookie: "wordpress_=hack-no-cache",
    },
  });
  return res.json() as Promise<Servicefalse[]>;
}
