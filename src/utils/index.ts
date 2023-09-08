//getBlankWord
export function bw(word: string) {
  return String(word).replace(/./g, (w) => {
    //检测w是否是数字或字母
    if (/[a-zA-Z0-9]/.test(w)) {
      return w + ' ';
    }
    return w + " ";
  });
}


