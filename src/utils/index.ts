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


//判断当前环境是否是手机
export const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );