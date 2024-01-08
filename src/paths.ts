export const paths = {
  home() {
    return "/";
  },
  servicesArchive() {
    return "/services";
  },
  serviceCategory(category: string) {
    return `/services/${category}`;
  },
  service(category: string, name: string) {
    return `/services/${category}/${name}`;
  },
};
