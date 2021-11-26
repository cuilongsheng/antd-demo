import { RuleObject } from 'ant-design-vue/es/form/interface';

export const validateString = (rule: RuleObject, value: string) => {
  if (!value.trim()) {
    return Promise.reject(rule.message);
  }
  return Promise.resolve();
}

export const validateEmail = (rule: RuleObject, value: string) => {
  const inputValue: string = value.trim();
  const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  if (!inputValue) {
    return Promise.reject(rule.message);
  }
  if (!reg.test(inputValue)) {
    rule.message = "邮箱格式不正确"
    return Promise.reject(rule.message)
  }
  return Promise.resolve();
}
