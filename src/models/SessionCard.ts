export interface SessionCard {
  id: number;
  sessionId: number;
  cardId: number;
  correct: boolean;
  reviewTime: Date;
  createdAt: Date;
  updatedAt: Date;
}
