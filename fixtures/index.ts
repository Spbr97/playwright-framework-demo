import { test as base } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';

type Fixtures = {
  todoPage: TodoPage;
};

/** Extends Playwright's test with ready-to-use page objects (already navigated). */
export const test = base.extend<Fixtures>({
  todoPage: async ({ page }, use) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();
    await use(todoPage);
  },
});

export { expect } from '@playwright/test';
