export function sortObjectByDesc(object) {
  return Object.keys(object).sort().reverse().map(
    (a) => [a, object[a]]
  );
}
