import ImmutPrimitive from './ImmutPrimitive';

describe('ImmutPrimitive', () => {
  ['abc', 123, true, null].forEach(value => {
    describe(value === null ? 'null' : typeof value, () => {
      it('primitive is frozen', () => {
        const immut = new ImmutPrimitive(value, parent);
        const mutate = () => {
          immut.mutated = true;
        };
        expect(mutate).toThrow();
      });
    });
  });
});
