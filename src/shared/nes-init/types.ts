export interface Choice<T> {
  name: string;
  value: T;
}

export interface PackageVersion {
  id?: number;
  name: string;
  version?: string;
  fqns: string;
  origination?: {
    name: string;
    type: string;
    version: string;
  };
  release?: {
    semverVersion: string;
  };
}

export interface Entry {
  ordinal?: number;
  accessible?: boolean;
  packageVersion: PackageVersion;
}

export interface Product {
  id: number;
  key: string;
  name: string;
}

export type ProjectType = 'npm' | 'not configured';

export interface ReleaseTrain {
  id?: number;
  key: string;
  name: string;
  products: Product[];
  entries: Entry[];
}
