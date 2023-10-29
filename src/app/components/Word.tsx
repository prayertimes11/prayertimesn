// @ts-ignore
export const Word = ({ value, hidden = false }) => {
  const getStyle = () => {
    return {
      visibility: hidden ? "hidden" : "visible",
    };
  };
  return (
    <div className="digital">
      <p>{value}</p>
      <p style={getStyle() as any}>{value}</p>
    </div>
  );
};
