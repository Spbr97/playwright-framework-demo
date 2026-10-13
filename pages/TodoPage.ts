import { expect, type Locator, type Page } from '@playwright/test';

/** Page Object for the TodoMVC demo app. Tests talk to this, never to raw selectors. */
export class TodoPage {
  readonly newTodo: Locator;
  readonly items: Locator;
  readonly counter: Locator;
  readonly clearCompleted: Locator;

  constructor(private readonly page: Page) {
    this.newTodo = page.getByPlaceholder('What needs to be done?');
    this.items = page.getByTestId('todo-item');
    this.counter = page.getByTestId('todo-count');
    this.clearCompleted = page.getByRole('button', { name: 'Clear completed' });
  }

  async goto() {
    await this.page.goto('./');
  }

  async add(...titles: string[]) {
    for (const title of titles) {
      await this.newTodo.fill(title);
      await this.newTodo.press('Enter');
    }
  }

  item(title: string): Locator {
    return this.items.filter({ hasText: title });
  }

  async complete(title: string) {
    await this.item(title).getByRole('checkbox').check();
  }

  async remove(title: string) {
    const row = this.item(title);
    await row.hover();
    await row.getByRole('button', { name: 'Delete' }).click();
  }

  async edit(title: string, newTitle: string) {
    const row = this.item(title);
    await row.dblclick();
    const input = row.getByRole('textbox', { name: 'Edit' });
    await input.fill(newTitle);
    await input.press('Enter');
  }

  async filter(name: 'All' | 'Active' | 'Completed') {
    await this.page.getByRole('link', { name }).click();
  }

  async expectTitles(titles: string[]) {
    await expect(this.items).toHaveText(titles);
  }
}
