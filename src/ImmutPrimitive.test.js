import ImmutPrimitive from './ImmutPrimitive';

describe('ImmutPrimitive', () => {
  ['abc', 123, true, null].forEach(v => {
    describe(v === null ? 'null' : typeof v, () => {
      test('primitive.value returns value', () => {
        const prim = ImmutPrimitive(v, {});
        expect(prim.value).toBe(v);
      });

      test('primivite.value=x calls parent.set()', () => {
        const parent = { set: jest.fn() };
        const prim = ImmutPrimitive(v, parent);
        prim.value = v;
        expect(parent.set).toHaveBeenCalledWith(prim, v);
      });

      test('primitive.delete() calls parent.delete()', () => {
        const parent = { delete: jest.fn() };
        const prim = ImmutPrimitive(v, parent);
        prim.delete();
        expect(parent.delete).toHaveBeenCalledWith(prim);
      });

      test('should be frozen', () => {
        const prim = ImmutPrimitive(v, {});
        const mutate = () => {
          prim.mutate = true;
        };
        expect(mutate).toThrow();
      });
    });
  });
});
