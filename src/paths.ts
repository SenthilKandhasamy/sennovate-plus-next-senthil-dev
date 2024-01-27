export const paths = {
  home() {
    return "/";
  },

  admin() {
    return "/admin";
  },

  service(name?: string) {
    let path = "/service";
    if (name) path += `/${name}`;
    return path;
  },

  partnershipRequest(id?: string) {
    let path = "/admin/partnership-request";
    if (id) path += `/${id}`;

    return path;
  },
};
