export type SessionStatus = 'active' | 'completed' | 'future';

export interface Session {
  id: number;
  userId: number;
  status: SessionStatus;
  startTime: Date | null;
  endTime: Date | null;
  createdAt: Date;
  updatedAt: Date;
}