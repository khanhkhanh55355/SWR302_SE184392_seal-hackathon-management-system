export default function Progress({ value }) {
  return (
    <div className="progress">
      <div className="progress-fill" style={{ width: `${value}%` }}>{value}%</div>
    </div>
  );
}
