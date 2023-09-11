//getBlankWord
export function bw(word: string) {
  return String(word).replace(/./g, (w) => {
    //检测w是否是数字或字母
    if (/[a-zA-Z0-9]/.test(w)) {
      return w + " ";
    }
    return w + " ";
  });
}

export function getA4RatioHeight(w: number) {
  //a4高宽比
  const a4Ratio = 29.7 / 21;
  return Math.floor(w * a4Ratio);
}
