export const Item = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="item">
      <p className="label">{label}</p>
      <p className="value">{value}</p>
    </div>
  );
};
