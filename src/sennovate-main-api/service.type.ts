type WordpressACFTable = {
  use_header: boolean;
  header: {
    c: string;
  }[];
  caption: boolean;
  body: {
    c: string;
  }[][];
};

export type UserType = "reseller" | "directSales";

export type ServicePoints1 = {
  title: string;
  description?: string;
  essential?: string;
  advance?: string;
};

export type ServicePoints2 = {
  title: string;
  description?: string;
  onprem_essential?: string;
  onprem_advance?: string;
  cloud_essential?: string;
  cloud_advance?: string;
};

export type ServiceOffering1 = {
  heading: string;
  description: string;
  has_points: boolean;
  points?: ServicePoints[];
  children?: ServiceOffering[];
};

export type ServiceOffering2 = {
  heading: string;
  description: string;
  has_points_b: boolean;
  points_b?: ServicePoints[];
  children?: ServiceOffering[];
};

export type ServiceTable = {
  heading: string;
  subHeading?: string;
  offerings: ServiceOffering[];
};
export type Pricing = {
  name: string;
  description: string;
  amount: string;
  suffix: string;
  for: "reseller" | "referral" | "directSales";
  active: boolean;
  plan: string;
};

export type SalesDoc = {
  title: string;
  media: string;
  for: "reseller" | "directSales" | "all";
};

export type PreferredLogo = {
  title: string;
  logo: string;
};

export type ByoLogo = {
  title: string;
  logo: string;
};

export type Service = {
  title: string;
  grouping: string;
  slug: string;
  excerpt: string;
  tables: ServiceTable[];
  pricing?: Pricing[];
  salesDocs: SalesDoc[];
  preferredLogos: PreferredLogo[];
  byoLogos: ByoLogo[];
  priceTables: {
    for: UserType;
    table: WordpressACFTable;
  }[];
};
export type Servicefalse = {
  title: string;
  slug: string;
  excerpt: string;
  flag : boolean;
  salesDocs: SalesDoc[];
};
