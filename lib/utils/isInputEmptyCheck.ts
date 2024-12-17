export const isInputEmptyCheck = (value: string) => {
  return value.trim() === "" ? "Field cannot be empty" : true;
};
