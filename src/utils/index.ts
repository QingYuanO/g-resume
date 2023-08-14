//getBlankWord
export function bw(word:string) {
  return String(word).replace(/./g, (word) => word + ' ');
}