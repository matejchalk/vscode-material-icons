import { sayHello } from '.';

describe('example test suite', () => {
  it('example test', () => {
    expect(sayHello('Harry Potter')).toBe('Hello, Harry Potter!');
  });
});
