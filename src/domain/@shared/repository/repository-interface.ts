export default interface RepositoryInterface<T> {
  create(entity: T): Promise<void>;
  update(entity: T | null): Promise<void>;
  find(id: string): Promise<T>;
  findAll(): Promise<T[]>;
}

// export default interface RepositoryInterfaceUser<T> {
//   create(entity: T): Promise<void>;
//   update(entity: T | null): Promise<void>;
//   find(id: string): Promise<T>;
//   findAll(): Promise<T[]>;
//   findByTaxId(tax_id: string): Promise<User>;
// }
