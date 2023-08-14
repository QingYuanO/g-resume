// 是否是有效的url链接
export const isUrlLink = (url: string) => {
  // eslint-disable-next-line no-useless-escape
  const rep = /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/;
  return rep.test(url);
};

// 正则表达式验证手机号码
export const isPhone = (phone: string) => {
  const phoneReg = /^1[3456789]\d{9}$/;
  return phoneReg.test(phone);
};

// 正则表达式验证身份证号码
export const isIdCard = (idCard: string) => {
  const idCardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return idCardReg.test(idCard);
};

// 正则表达式验证邮箱
export const isEmail = (email: string) => {
  // eslint-disable-next-line no-useless-escape
  const emailReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  return emailReg.test(email);
};

// 判断输入是否是字符串
export const isString = (str: any) => Object.prototype.toString.call(str) === '[object String]';

// 判断输入是否是数字
export const isNumber = (num: any) => Object.prototype.toString.call(num) === '[object Number]';

// 判断输入是否是数组
export const isArray = (arr: any) => Object.prototype.toString.call(arr) === '[object Array]';

// 判断输入是否是对象
export const isObject = (obj: any) => Object.prototype.toString.call(obj) === '[object Object]';

// 判断输入是否是函数
export const isFunction = (fun: any) => Object.prototype.toString.call(fun) === '[object Function]';

// 判断输入是否是布尔值
export const isBoolean = (boo: any) => Object.prototype.toString.call(boo) === '[object Boolean]';

// 判断输入是否是JSON
export const isJSON = (json: string) => {
  try {
    if (isObject(JSON.parse(json))) {
      return true;
    }
  } catch (e) {
    throw new Error('JSON 格式错误!');
  }
  return false;
};
