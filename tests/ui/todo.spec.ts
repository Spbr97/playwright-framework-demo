import { test, expect } from '../../fixtures';

test.describe('Todo list', () => {
  test('adds items in order', async ({ todoPage }) => {
    await todoPage.add('buy milk', 'write tests');
    await todoPage.expectTitles(['buy milk', 'write tests']);
    await expect(todoPage.counter).toContainText('2');
  });

  test('completes an item and updates the counter', async ({ todoPage }) => {
    await todoPage.add('buy milk', 'write tests');
    await todoPage.complete('buy milk');
    await expect(todoPage.item('buy milk')).toHaveClass(/completed/);
    await expect(todoPage.counter).toContainText('1');
  });

  test('edits an item', async ({ todoPage }) => {
    await todoPage.add('buy milk');
    await todoPage.edit('buy milk', 'buy oat milk');
    await todoPage.expectTitles(['buy oat milk']);
  });

  test('removes an item', async ({ todoPage }) => {
    await todoPage.add('buy milk', 'write tests');
    await todoPage.remove('buy milk');
    await todoPage.expectTitles(['write tests']);
  });

  test('filters active and completed items', async ({ todoPage }) => {
    await todoPage.add('a', 'b', 'c');
    await todoPage.complete('b');

    await todoPage.filter('Active');
    await todoPage.expectTitles(['a', 'c']);

    await todoPage.filter('Completed');
    await todoPage.expectTitles(['b']);
  });

  test('clears completed items', async ({ todoPage }) => {
    await todoPage.add('a', 'b');
    await todoPage.complete('a');
    await todoPage.clearCompleted.click();
    await todoPage.expectTitles(['b']);
  });
});
