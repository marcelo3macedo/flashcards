export interface User {
  id: number;
  externalId: string;
  name?: string;
  state?: string;
  createdAt: Date;
  updatedAt: Date;
}
