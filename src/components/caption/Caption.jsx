import "./caption.css";

export default function Caption({highPriority, mediumPriority, lowPriority, notes}) {
  return (
    <div className="caption">
      <div>
        <div id="high">
          <p className="amount-tasks">{highPriority}</p>
        </div>
        <p className="description">Prioridade alta</p>
      </div>
      <div>
        <div id="medium">
          <p className="amount-tasks">{mediumPriority}</p>
        </div>
        <p className="description">Prioridade média</p>
      </div>
      <div>
        <div id="low">
          <p className="amount-tasks">{lowPriority}</p>
        </div>
        <p className="description">Prioridade baixa</p>
      </div>
      <div>
        <div id="note">
          <p className="amount-tasks">{notes}</p>
        </div>
        <p className="description">Anotação</p>
      </div>
    </div>
  );
}
