import { areObjectsShallowEqual } from './shallowEqual';

describe('shallowEqual util', () => {
  it('returns true on the same object', () => {
    const obj = { a: 1 };
    expect(areObjectsShallowEqual(obj, obj)).toBeTruthy();
  });

  it('returns false if one of input objects is null or undefined', () => {
    const obj1 = { a: 1 };
    expect(areObjectsShallowEqual(obj1, null)).toBeFalsy();
    expect(areObjectsShallowEqual(null, obj1)).toBeFalsy();
    expect(areObjectsShallowEqual(obj1, undefined)).toBeFalsy();
    expect(areObjectsShallowEqual(undefined, obj1)).toBeFalsy();

    expect(areObjectsShallowEqual(null, null)).toBeTruthy();
    expect(areObjectsShallowEqual(undefined, undefined)).toBeTruthy();
  });

  it('returns true on equal objects', () => {
    const func = () => {};
    const arr = [1, 2, 3];
    const obj = { foo: 'bar' };
    expect(areObjectsShallowEqual(
      { a: 1, b: 'b', c: null, d: func, e: arr, f: obj },
      { a: 1, b: 'b', c: null, d: func, e: arr, f: obj },
    )).toBeTruthy();

    expect(areObjectsShallowEqual({}, {})).toBeTruthy();
  });

  it('returns false on different objects', () => {
    expect(areObjectsShallowEqual({}, { a: 1 })).toBeFalsy();
    expect(areObjectsShallowEqual({ a: 2 }, { a: 1 })).toBeFalsy();
    expect(areObjectsShallowEqual({ a: [] }, { a: [] })).toBeFalsy();
    expect(areObjectsShallowEqual({ a: {} }, { a: {} })).toBeFalsy();
  });
});
