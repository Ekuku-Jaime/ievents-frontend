export function status(eventDate) {
  const endDate = new Date();
  const startDate = new Date(eventDate);
  if (startDate.getTime() > endDate.getTime()) {
    return <span style={{ color: 'blue' }}>Pendente</span>;
  }
  if (startDate.getTime() >= endDate.getTime() && startDate.getTime >= endDate.getTime()) {
    return <span style={{ color: 'green' }}>Acontencendo</span>;
  }
  return <span style={{ color: 'red' }}>Realizado</span>;
}
export function truncate(str, n) {
  return str.length > n ? `${str.substr(0, n - 1)}...` : str;
}
