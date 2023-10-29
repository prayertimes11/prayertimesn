export const Number = ({ value = 0 }) => {
  function zeroPad(value: number, length: number): string {
    let valueStr = value.toString();
    while (valueStr.length < length) {
      valueStr = "0" + valueStr;
    }
    return valueStr;
  }

  const result = zeroPad(value, 2);
  return (
    <div className="digital">
      <p>88</p>
      <p>{result}</p>
    </div>
  );
};
