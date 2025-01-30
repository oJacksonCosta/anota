import "./caption.css";

export default function Caption() {
  return (
    <div className="caption">
      <div>
        <div id="green"></div>
        <p>Tarefa com prioridade baixa</p>
      </div>
      <div>
        <div id="orange"></div>
        <p>Tarefa com prioridade média</p>
      </div>
      <div>
        <div id="red"></div>
        <p>Tarefa com prioridade alta</p>
      </div>
      <div>
        <div id="blue"></div>
        <p>Anotação</p>
      </div>
    </div>
  );
}
