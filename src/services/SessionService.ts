import { SessionRepository } from '../repositories/SessionRepository';
import { CardRepository } from '../repositories/CardRepository';
import pool from '../db';

const sessionRepo = new SessionRepository(pool);
const cardRepo = new CardRepository(pool);

export const sessionService = {
  async createSessionForUser(userId: number) {
    const hasSession = await sessionRepo.findActiveSessionByUserId(userId);
    if (hasSession) {
      const cards = await sessionRepo.getCardsBySessionId(hasSession.id);
      return { sessionId: hasSession.id, cards };
    }

    const sessionId = await sessionRepo.create(userId);
    const cards = await cardRepo.getLowestPriority(20);

    if (cards) {
      for (const card of cards) {
        await sessionRepo.addCardToSession(sessionId, card.id);
      }
    }

    const cardsCreated = await sessionRepo.getCardsBySessionId(hasSession.id);
    return { sessionId, cards: cardsCreated };
  },

  async finishSession(
    sessionId: number,
    responses: {
      cardId: number;
      type: 'answer' | 'flashcard';
      correct?: boolean;
      difficulty?: 'easy' | 'medium' | 'hard' | 'dont know';
    }[],
  ) {
    for (const response of responses) {
      let increment = 1;
      if (response.type === 'answer') {
        increment = response.correct ? 10 : 1;
        await sessionRepo.storeCardResponse(sessionId, response.cardId, response.correct ?? false);
      } else {
        switch (response.difficulty) {
          case 'easy':
            increment = 10;
            break;
          case 'medium':
            increment = 5;
            break;
          case 'hard':
            increment = 3;
            break;
          case 'dont know':
            increment = 1;
            break;
        }
        await sessionRepo.storeCardResponse(sessionId, response.cardId, false, response.difficulty);
      }
      await cardRepo.updatePriority(response.cardId, increment);
    }

    const allAnswered = await sessionRepo.areAllCardsAnswered(sessionId);
    if (allAnswered) {
      await sessionRepo.finish(sessionId);
    }
  },
};
