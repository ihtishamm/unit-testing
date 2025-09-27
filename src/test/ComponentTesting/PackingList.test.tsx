import { render as _render } from '../utilities'; // ✅ your custom render (can add store later)
import { screen } from '@testing-library/react';
import PackingList from '../../examples/PackingList';
import { Provider } from 'react-redux';
import { createStore } from '../../store/store';
import { toHaveNoViolations, axe } from 'jest-axe';

expect.extend(toHaveNoViolations);
export const render = (ui: React.ReactElement) => {
  return _render(<Provider store={createStore()}>{ui}</Provider>);
};

test('renders an input field for adding a new item', () => {
  render(<PackingList />);
  const input = screen.getByLabelText(/new item/i);
  expect(input).toBeInTheDocument();
});

test('disables the "Add New Item" button when input is empty', () => {
  render(<PackingList />);
  expect(screen.getByRole('button', { name: /add new item/i })).toBeDisabled();
});

test('enables the "Add New Item" button when input has content', async () => {
  const { user } = render(<PackingList />);
  const input = screen.getByLabelText(/new item/i);
  await user.type(input, 'chill bro');
  expect(screen.getByRole('button', { name: /add new item/i })).toBeEnabled();
});
test('adds a new item to the list when "Add New Item" button is clicked', async () => {
  const { user } = render(<PackingList />);
  const input = screen.getByLabelText(/new item/i);
  await user.type(input, 'chill bro');
  const button = screen.getByRole('button', { name: /add new item/i });
  await user.click(button);
  expect(screen.getByText('chill bro')).toBeInTheDocument();
});
// Hint: type in input, click button, check item appears in the list

test.todo('clears out the input field after adding a new item');
// Hint: after clicking, check textbox value === ''

test.todo('removes an item when delete button is clicked');
// Hint: add an item first, click its delete button, assert it disappears

//
// 🔹 Enterprise-level extras (optional for later)
//
test.todo('allows toggling an item between packed/unpacked');
// Hint: find checkbox or toggle and assert change

test.todo("unpacks all items when 'Unpack All' button is clicked");
// Hint: add packed items, click button, assert all are unpacked

test.todo('ensures store resets between tests (deterministic)');
// Hint: add an item in one test, verify fresh state in next test

// accessablity testing of packinglist

test('packinglsit is accessible', async () => {
  const { container } = render(<PackingList />);
  const result = await axe(container);
  expect(result).toHaveNoViolations();
});
