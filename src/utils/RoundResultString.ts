const NumberOfDecimals = 3;

export const roundResultString = (
  value: number,
  numberDecimals: number = NumberOfDecimals,
) => {
  if (value) {
    const res: string = value.toFixed(numberDecimals);
    return Number(res);
  } else return value;
};
