import { createUser, getUserById } from '../src/servicios/userService';

describe('User service', () => {
  test('create and get user', async () => {
    const user = await createUser({ name: 'Test', email: `test${Date.now()}@example.com` });
    const fetched = await getUserById(user.id);
    expect(fetched).not.toBeNull();
    expect(fetched?.email).toBe(user.email);
  });
});
