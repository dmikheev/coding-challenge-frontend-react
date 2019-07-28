export function areObjectsShallowEqual(a: any, b: any): boolean {
  if (a === b) {
    return true;
  }

  if (!a || !b) {
    return false;
  }

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  const len = aKeys.length;
  if (bKeys.length !== len) {
    return false;
  }

  for (let i = 0; i < len; i++) {
    const key = aKeys[i];

    if (a[key] !== b[key]) {
      return false;
    }
  }

  return true;
}
