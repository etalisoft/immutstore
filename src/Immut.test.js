import Immut from './Immut';

describe('Immut', () => {
  it('should be Immut', () => {
    const immut = new Immut('abc', {});
    expect(immut).toBeInstanceOf(Immut);
  });

  it('immut.value returns value', () => {
    const immut = new Immut('abc', {});
    expect(immut.value).toBe('abc');
  });

  it('immut.value=same does not call parent.set()', () => {
    const parent = { set: jest.fn() };
    const immut = new Immut('a', parent);
    immut.value = 'a';
    expect(parent.set).not.toHaveBeenCalledWith(immut, 'a');
  });

  it('immut.value=different calls parent.set()', () => {
    const parent = { set: jest.fn() };
    const immut = new Immut('a', parent);
    immut.value = 'b';
    expect(parent.set).toHaveBeenCalledWith(immut, 'b');
  });

  it('immut.delete() calls parent.delete()', () => {
    const parent = { delete: jest.fn() };
    const immut = new Immut('abc', parent);
    immut.delete();
    expect(parent.delete).toHaveBeenCalledWith(immut);
  });
});
