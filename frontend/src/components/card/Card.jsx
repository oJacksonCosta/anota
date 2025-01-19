import "./card.css";

export default function Card({ title, content, priority, status, type, date }) {
  return (
    <div className="card">
      <div className="card-priority"></div>
      <h2>{title}</h2>
      <p className="content">{content}</p>
      <p className="date">
        <i class="bi bi-calendar2-fill"> </i>
        {date}
      </p>
      <p className="type">
        <i class="bi bi-file-earmark-text-fill"></i>
        {type}
      </p>
    </div>
  );
}
