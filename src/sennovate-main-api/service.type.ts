export type ServicePoints = {
  title: string;
  description?: string;
  essential?: string;
  advance?: string;
};

export type ServiceOffering = {
  heading: string;
  description: string;
  has_points: boolean;
  points?: ServicePoints[];
  children?: ServiceOffering[];
};

export type ServiceTable = {
  heading: string;
  subHeading?: string;
  offerings: ServiceOffering[];
};

export type Service = {
  title: string;
  slug: string;
  tables: ServiceTable[];
};
