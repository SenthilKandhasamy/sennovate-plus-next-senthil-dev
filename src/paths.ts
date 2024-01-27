export const paths = {
  home() {
    return "/";
  },
  service(name: string) {
    return `/services/${name}`;
  },

  partnershipRequest(id?: string) {
    let path = "/admin/partnership-request";
    if (id) path += `/${id}`;

    return path;
  },
};
