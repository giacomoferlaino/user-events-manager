import { EventStates } from './event-states';
import { Event } from './event';

describe('Event', () => {
  let event: Event;

  beforeEach(() => {
    event = new Event(
      1,
      'Nice event',
      'Really interesting stuff',
      new Date(Date.now()),
      'Milan',
      EventStates.Draft,
      {} as any,
      [],
    );
    jest.spyOn(Date, 'now').mockReturnValue(0); // prevents timing errors
  });

  describe('fromObject', () => {
    it('should return a new Event instance created from a generic object', () => {
      const eventData = {
        id: event.id,
        headline: event.headline,
        description: event.description,
        startDate: event.startDate,
        location: event.location,
        state: event.state,
        author: event.author,
        subscribers: event.subscribers,
        hasBeenNotified: event.hasBeenNotified,
      };
      expect(Event.fromObject(eventData)).toStrictEqual(event);
    });

    it('should return a new event using default value if the data object is missing properties', () => {
      const expectedEvent = new Event(
        0,
        '',
        '',
        new Date(0),
        '',
        EventStates.Private,
        {} as any,
        [],
      );
      const eventData = {
        author: {}, // author property is mandatory
      };
      expect(Event.fromObject(eventData)).toStrictEqual(expectedEvent);
    });
  });

  describe('mergeObject', () => {
    it('should return a new Event with its property merged with the passed object', () => {
      const eventUpdateData = {
        location: 'Rome',
        state: EventStates.Public,
      };
      const expectedEvent = new Event(
        1,
        'Nice event',
        'Really interesting stuff',
        new Date(Date.now()),
        'Rome',
        EventStates.Public,
        {} as any,
        [],
      );
      expect(event.mergeObject(eventUpdateData)).toStrictEqual(expectedEvent);
    });

    it('should preserve the existing id', () => {
      const eventUpdateData = {
        id: 1000,
        location: 'Rome',
        state: EventStates.Public,
      };
      const expectedEvent = new Event(
        1,
        'Nice event',
        'Really interesting stuff',
        new Date(Date.now()),
        'Rome',
        EventStates.Public,
        {} as any,
        [],
      );
      expect(event.mergeObject(eventUpdateData)).toStrictEqual(expectedEvent);
    });
  });

  describe('toObject', () => {
    it('should put all the Event properties in a generic object', () => {
      const eventObject = event.toObject();
      expect(Object.keys(event).length).toBe(Object.keys(eventObject).length);
    });
  });

  describe('toJSON', () => {
    it('should return an object without the author property', () => {
      expect(event.toJSON()['author']).toBeUndefined();
    });

    it('should return an object without the subscribers property', () => {
      expect(event.toJSON()['subscribers']).toBeUndefined();
    });
  });
});
