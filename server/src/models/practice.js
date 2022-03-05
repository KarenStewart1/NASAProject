function duplicate(n) {
  return [n, n];
}

console.log([1, 2].flatMap(duplicate));
