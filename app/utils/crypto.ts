const CRYPTO_KEY = 'your-secret-key';  // 建议使用环境变量

// 检查字符串是否是有效的 base64 编码
const isBase64 = (str: string): boolean => {
  try {
    return btoa(atob(str)) === str;
  } catch (err) {
    return false;
  }
};

export const encrypt = (text: string): string => {
  try {
    // 使用 encodeURIComponent 处理特殊字符
    const encoded = btoa(encodeURIComponent(text));
    return encoded;
  } catch (error) {
    console.error('Encryption failed:', error);
    return text;
  }
};

export const decrypt = (encoded: string): string => {
  try {
    // 首先检查是否是有效的 base64 编码
    if (!isBase64(encoded)) {
      return encoded;
    }
    // 解码并处理特殊字符
    const decoded = decodeURIComponent(atob(encoded));
    return decoded;
  } catch (error) {
    console.error('Decryption failed:', error);
    return encoded;  // 如果解密失败，返回原始值
  }
};
