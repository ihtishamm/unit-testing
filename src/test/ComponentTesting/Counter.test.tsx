import { screen } from '@testing-library/react';
import Counter from '../../examples/Counter';
import { render } from '../utilities';

test('it should render the component', () => {
  render(<Counter />);
  const currentcount = screen.getByLabelText('count');
  expect(currentcount).toHaveTextContent('0');
});

test('renders with custom initial value', () => {
  render(<Counter initial={5} />);
  const currentcount = screen.getByLabelText('count');
  expect(currentcount).toHaveTextContent('5');
});

//
// 🔹 Core Interactions
//
test('increments the count when "Increment" button is clicked', async () => {
  const { user } = render(<Counter />);
  const currentCount = screen.getByLabelText('count');
  const button = screen.getByRole('button', { name: 'Increment' });
  await user.click(button);
  expect(currentCount).toHaveTextContent('1');
});

test('decrements the count when "Decrement" button is clicked', async () => {
  const { user } = render(<Counter initial={5} />);
  const currentCount = screen.getByLabelText('count');
  const button = screen.getByRole('button', { name: 'Decrement' });
  await user.click(button);
  expect(currentCount).toHaveTextContent('4');
});
test('resets the count back to initial value when "Reset" button is clicked', async () => {
  const { user } = render(<Counter />);
  const currentCount = screen.getByLabelText('count');
  const IncrementValue = screen.getByRole('button', { name: 'Increment' });
  await user.click(IncrementValue);
  const button = screen.getByRole('button', { name: 'Reset' });
  await user.click(button);
  expect(currentCount).toHaveTextContent('0');
});

//
// 🔹 Edge Cases / Defensive Checks

test('handles large numbers without crashing', async () => {
  const { user } = render(<Counter initial={Number.MAX_SAFE_INTEGER} />);
  screen.getByLabelText('count');
  const button = screen.getByRole('button', { name: 'Increment' });
  await user.click(button);
});

//
// 🔹 Accessibility & Usability
//
test('provides accessible label for the count', () => {
  render(<Counter />);
  const currentcount = screen.getByLabelText('count');
  expect(currentcount).toHaveTextContent('0');
});
test('buttons are reachable via keyboard (tab order)', async () => {
  const { user } = render(<Counter />);
  await user.tab();
  const incrementButton = screen.getByRole('button', { name: 'Increment' });
  expect(incrementButton).toHaveFocus();
  await user.tab();
  const decrementButton = screen.getByRole('button', { name: 'Decrement' });
  expect(decrementButton).toHaveFocus();
});
