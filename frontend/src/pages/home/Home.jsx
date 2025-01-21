import "./home.css";
import Caption from "../../components/caption/Caption";
import Background from "../../components/background/Background";
import InputSelect from "../../components/input-select/Input-select";
import Search from "../../components/search/Search";
import { useState } from "react";
import Card from "../../components/card/Card";

export default function Home() {
  const [selectValues, setSelectValues] = useState({
    selectType: "",
    selectPriority: "",
    selectStatus: "",
  });

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
    return searchTerm;
  };

  const typeOptions = [
    { value: "task", label: "Tarefa" },
    { value: "note", label: "Anotação" },
  ];

  const priorityOptions = [
    { value: "low", label: "Baixa" },
    { value: "medium", label: "Média" },
    { value: "high", label: "Alta" },
  ];

  const statusOptions = [
    { value: "all", label: "Todas" },
    { value: "todo", label: "Pendente" },
    { value: "done", label: "Concluído" },
  ];

  const handleSelectChange = (key, value) => {
    setSelectValues((prevValues) => {
      const selectValues = {
        ...prevValues,
        [key]: value,
      };
      console.log(selectValues);
      return selectValues;
    });
  };

  return (
    <Background>
      <div className="home-container">
        <Caption />
        <div className="filter">
          <InputSelect
            options={typeOptions}
            placeholder={"Tipo"}
            onChange={(value) => handleSelectChange("selectType", value)}
            value={selectValues.selectType}
          />
          <InputSelect
            options={priorityOptions}
            placeholder={"Prioridade"}
            onChange={(value) => handleSelectChange("selectPriority", value)}
            value={selectValues.selectPriority}
          />
          <InputSelect
            options={statusOptions}
            placeholder={"Status"}
            onChange={(value) => handleSelectChange("selectStatus", value)}
            value={selectValues.selectStatus}
          />
          <Search onSearch={(value) => handleSearch(value)} />
        </div>

        <div className="cards-container">
          <Card
            title={"Teste de título"}
            content={
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            }
            priority={"medium"}
            status={"todo"}
            type={"task"}
            date={"19/01/2025"}
          />
          <Card
            title={"Teste de título"}
            content={
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            }
            priority={"high"}
            status={"complete"}
            type={"task"}
            date={"20/01/2025"}
          />
          <Card
            title={"Teste de título"}
            content={
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            }
            priority={""}
            status={""}
            type={"note"}
            date={"20/01/2025"}
          />
        </div>
      </div>
    </Background>
  );
}
