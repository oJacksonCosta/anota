import "./caption.css";

export default function Caption() {

  return (
    <div className="caption" onMouseEnter>
      <div>
        <div id="green"></div>
        <p className="caption-description">Tarefa com prioridade baixa</p>
      </div>
      <div>
        <div id="orange"></div>
        <p className="caption-description">Tarefa com prioridade média</p>
      </div>
      <div>
        <div id="red"></div>
        <p className="caption-description">Tarefa com prioridade alta</p>
      </div>
      <div>
        <div id="blue"></div>
        <p className="caption-description">Anotação</p>
      </div>
    </div>
  );
}
