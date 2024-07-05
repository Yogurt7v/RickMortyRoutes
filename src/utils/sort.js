export function sort(array, key) {
    switch (key) {
        case "ASC":
          return array.sort(
            (a, b) => Date.parse(a.created) - Date.parse(b.created)
          );
  
        case "DESC":
          return array.sort(
            (a, b) => Date.parse(b.created) - Date.parse(a.created)
          );
  
        default:
          return array;
      }
    }