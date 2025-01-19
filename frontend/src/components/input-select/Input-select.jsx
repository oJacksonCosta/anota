import Select from "react-select";

export default function InputSelect({ options, onChange, placeholder, value }) {
  const customStyles = {
    control: (base, { isFocused }) => ({
      ...base,
      backgroundColor: "var(--white-transparent)",
      border: "none",
      borderRadius: "0.6rem",
      color: "var(--white)",
      cursor: "pointer",
      height: "2.8rem",
      boxShadow: "none",
      paddingInline: "0.2rem",
      outline: isFocused ? "2px solid var(--blue)" : "none",
    }),
    dropdownIndicator: (base, { isFocused }) => ({
      ...base,
      color: isFocused ? "var(--blue)" : "#ffffff80",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#ffffff80",
    }),
    singleValue: (base) => ({
      ...base,
      color: "var(--white)",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "var(--dark-blue)",
      borderRadius: "0.6rem",
      padding: "0.5rem",
    }),
    option: (base, { isFocused }) => ({
      ...base,
      backgroundColor: isFocused ? "var(--blue)" : "transparent",
      cursor: "pointer",
      borderRadius: "0.4rem",
      color: "var(--white)",
    }),
  };

  const handleChange = (selectedOption) => {
    const newValue = selectedOption ? selectedOption.value : "";
    if (onChange) {
      onChange(newValue); // Notifica o valor selecionado para o componente pai
    }
  };

  return (
    <div className="input-select">
      <Select
        options={options}
        placeholder={placeholder}
        value={options.find((option) => option.value === value) || null}
        onChange={handleChange}
        styles={customStyles}
        isClearable
      />
    </div>
  );
}
