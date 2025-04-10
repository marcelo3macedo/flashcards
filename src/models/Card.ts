export type CardType = 'flashcard' | 'question';

export interface Card {
  id: number;
  notebookId: number;
  type: CardType;
  front: string;
  back?: string;
  alternatives?: string;
  correctAnswer?: string;
  priority: number;
  createdAt: Date;
  updatedAt: Date;
}
