import { render } from '../utilities';
import Counter from '../../examples/Counter';
import { toHaveNoViolations, axe } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('counter component should be accessible', async () => {
  const { container } = render(<Counter />);
  const result = await axe(container);
  expect(result).toHaveNoViolations();
});
