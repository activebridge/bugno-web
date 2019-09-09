export function sortObjectByDesc(object) {
  return Object.keys(object).sort().reverse().map(
    (a) => { return [a, object[a]]; }
  );
}
