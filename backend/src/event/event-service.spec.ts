import { Connection } from 'typeorm';
import { EventService } from './event-service';
import { EventRepository } from './event-repository';
import { Event } from './event';
import { EventNotFoundException } from './exceptions/event-not-found-exception';

describe('EventService', () => {
  let dbConnectionMock: Connection;
  let eventService: EventService;
  let eventRepositoryMock: { [key: string]: jest.Mock };

  beforeEach(() => {
    eventRepositoryMock = {
      save: jest.fn(),
      findOne: jest.fn(),
    } as any;
    jest
      .spyOn(EventRepository, 'fromConnection')
      .mockReturnValue(eventRepositoryMock as any);
    dbConnectionMock = {} as Connection;
    eventService = new EventService(dbConnectionMock);
  });

  describe('create', () => {
    it('should save an event object', async () => {
      await eventService.create({}, {} as any);
      const savedEvent = eventRepositoryMock.save.mock.calls[0][0];
      expect(savedEvent).toBeInstanceOf(Event);
    });

    it('should set the event author to the passed user', async () => {
      const user = { name: 'user' } as any;
      await eventService.create({}, user);
      const savedEvent = eventRepositoryMock.save.mock.calls[0][0];
      expect(savedEvent.author).toStrictEqual(user);
    });
  });

  describe('findByID', () => {
    it('should throw an error if the user is not found', async () => {
      eventRepositoryMock.findOne = jest.fn().mockResolvedValue(undefined);
      await expect(eventService.findByID(1)).rejects.toThrow(
        EventNotFoundException,
      );
    });
  });
});
