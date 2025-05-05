export const formatList = (array: string[]) => {
  if (array.length === 1) {
    return array[0];
  } else if (array.length === 2) {
    return `${array[0]} and ${array[1]}`;
  } else {
    const last = array.pop();
    return `${array.join(', ')} and ${last}`;
  }
};
