import "./caption.css";

export default function Caption() {
  return (
    <div className="caption">
      <div>
        <div id="high"></div>
        <p>Prioridade alta</p>
      </div>
      <div>
        <div id="medium"></div>
        <p>Prioridade média</p>
      </div>
      <div>
        <div id="low"></div>
        <p>Prioridade baixa</p>
      </div>
      <div>
        <div id="note"></div>
        <p>Anotação</p>
      </div>
    </div>
  );
}
