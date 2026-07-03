export default function Card({ title, value, subtitle, children, className = "" }) {
  return (
    <div className={`card ${className}`}>
      {title && <div className="card-title">{title}</div>}
      {value !== undefined && <div className="card-value">{value}</div>}
      {subtitle && <p className="muted">{subtitle}</p>}
      {children}
    </div>
  );
}
