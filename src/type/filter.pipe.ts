export interface FilterPipe<D> {
  filter(data: D): boolean | Promise<boolean>;
}
