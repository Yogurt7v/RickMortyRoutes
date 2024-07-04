export function Sort(array, key) {
  if (key === "ASC") {
    return array.sort((a, b) => Date.parse(a.created) - Date.parse(b.created));
  }

  if (key === "DESC") {
    return array.sort((a, b) => Date.parse(b.created) - Date.parse(a.created));
  }
}
