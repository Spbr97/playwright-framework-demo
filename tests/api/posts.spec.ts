import { test, expect } from '@playwright/test';

// Public JSONPlaceholder API: writes are faked by the server, so these are safe to run anywhere.
test.describe('Posts API', () => {
  test('GET /posts/1 returns the expected shape', async ({ request }) => {
    const res = await request.get('/posts/1');
    expect(res.status()).toBe(200);
    expect(await res.json()).toMatchObject({
      id: 1,
      userId: expect.any(Number),
      title: expect.any(String),
      body: expect.any(String),
    });
  });

  test('GET /posts filtered by userId only returns that user', async ({ request }) => {
    const res = await request.get('/posts', { params: { userId: 3 } });
    expect(res.ok()).toBeTruthy();
    const posts: { userId: number }[] = await res.json();
    expect(posts.length).toBeGreaterThan(0);
    for (const p of posts) expect(p.userId).toBe(3);
  });

  test('POST /posts echoes the payload with a new id', async ({ request }) => {
    const payload = { title: 'hello', body: 'world', userId: 1 };
    const res = await request.post('/posts', { data: payload });
    expect(res.status()).toBe(201);
    expect(await res.json()).toMatchObject({ ...payload, id: expect.any(Number) });
  });

  test('GET unknown post returns 404', async ({ request }) => {
    const res = await request.get('/posts/999999');
    expect(res.status()).toBe(404);
  });
});
