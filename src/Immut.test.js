import Immut from './Immut';

describe('Immut', () => {
  it('should return an Immut', () => {
    const immut = new Immut(1);
    expect(immut).toBeInstanceOf(Immut);
  });

  it('should NOT be frozen', () => {
    const immut = new Immut(1);
    const mutate = () => {
      immut.mutated = true;
    };
    expect(mutate).not.toThrow();
  });

  it('immut.get() should return value', () => {
    const immut = new Immut(1);
    expect(immut.get()).toBe(1);
  });

  describe('immut.set()', () => {
    it('should call map function with value', () => {
      const immut = new Immut(1, jest.fn());
      const map = jest.fn();
      immut.set(map);
      expect(map).toHaveBeenCalledWith(1);
    });

    it('should call parent.set() with the new value', () => {
      const change = jest.fn();
      const immut = new Immut(5, change);
      immut.set(v => v * 2);
      expect(change).toHaveBeenCalledWith(immut, 10);
    });
  });
});
