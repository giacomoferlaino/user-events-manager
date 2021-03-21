import { User } from './user';
import { PasswordUtils } from '../shared/utils/password-utils';

describe('User', () => {
  let user: User;

  beforeEach(() => {
    user = new User(1, 'username', 'user@test.com', 'password', [], []);
  });

  describe('fromObject', () => {
    it('should return a new user created from a generic object', () => {
      const userData = {
        id: 1,
        username: 'username',
        email: 'user@test.com',
        password: 'password',
        events: [],
        subscribedEvents: [],
      };
      expect(User.fromObject(userData)).toStrictEqual(user);
    });

    it('should return a new user using default values if the data object is missing properties', () => {
      const expectedUser = new User(0, '', '', '', [], []);
      expect(User.fromObject({})).toStrictEqual(expectedUser);
    });
  });

  describe('mergeObject', () => {
    it('should return a new User with its property merged with the passed object', () => {
      const userUpdateData = {
        username: 'newUsername',
        email: 'newUser@test.com',
      };
      const expectedUser = new User(
        user.id,
        userUpdateData.username,
        userUpdateData.email,
        user.password,
        user.events,
        user.subscribedEvents,
      );
      expect(user.mergeObject(userUpdateData)).toStrictEqual(expectedUser);
    });

    it('should preserve the existing id', () => {
      const userUpdateData = {
        id: 1000,
        username: 'newUsername',
        email: 'newUser@test.com',
      };
      const expectedUser = new User(
        user.id,
        userUpdateData.username,
        userUpdateData.email,
        user.password,
        user.events,
        user.subscribedEvents,
      );
      expect(user.mergeObject(userUpdateData)).toStrictEqual(expectedUser);
    });
  });

  describe('comparePassword', () => {
    it('should return true if the passwords hash match', async () => {
      const plainPassword = user.password;
      user.password = await PasswordUtils.hash(plainPassword);
      await expect(user.comparePassword(plainPassword)).resolves.toBe(true);
    });

    it('should return false if the passwords hash do not match', async () => {
      const plainPassword = user.password;
      user.password = await PasswordUtils.hash(plainPassword);
      const wrongPassword = 'wrongPassword';
      await expect(user.comparePassword(wrongPassword)).resolves.toBe(false);
    });
  });

  describe('hasReachedEventsLimit', () => {
    it('should return true if the user created events are equal or greater than EVENTS_LIMIT', () => {
      user.events.push({} as any);
      expect(user.hasReachedEventsLimit()).toBe(true);
    });

    it('should return false if the user created events are less than EVENTS_LIMIT', () => {
      expect(user.hasReachedEventsLimit()).toBe(false);
    });
  });

  describe('hasReachedSubscriptionsLimit', () => {
    it('should return true if the user subscriptions are equal or greater than SUBSCRIPTIONS_LIMIT', () => {
      user.subscribedEvents.push({} as any, {} as any, {} as any);
      expect(user.hasReachedSubscriptionsLimit()).toBe(true);
    });

    it('should return false if the user subscriptions are less than EVENTS_LIMIT', () => {
      expect(user.hasReachedSubscriptionsLimit()).toBe(false);
    });
  });

  describe('isEventOwner', () => {
    let eventId: number = 1;

    it('should return true if the user owns the passed event id', () => {
      user.events.push({ id: eventId } as any);
      expect(user.isEventOwner(eventId)).toBe(true);
    });

    it('should return false if the user does not own the passed event id', () => {
      expect(user.isEventOwner(eventId)).toBe(false);
    });
  });

  describe('isSubscribed', () => {
    let eventId: number = 1;

    it('should return true if the user is subscribed to an event matching the passed eventId', () => {
      user.subscribedEvents.push({ id: eventId } as any);
      expect(user.isSubscribed(eventId)).toBe(true);
    });

    it('should return true if the user is not subscribed to an event matching the passed eventId', () => {
      expect(user.isSubscribed(eventId)).toBe(false);
    });
  });

  describe('toJSON', () => {
    it('should return an object without the password property', () => {
      const userObject = user.toJSON();
      expect(userObject['password']).toBeUndefined();
    });
  });
});
