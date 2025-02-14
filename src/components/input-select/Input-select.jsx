import Select from "react-select";

export default function InputSelect({
  options,
  onChange,
  placeholder,
  value,
  width = "100%",
  isDesabled,
  removeSelection = true,
}) {
  const customStyles = {
    container: (base) => ({
      ...base,
      width: width,
    }),
    control: (base, { isFocused }) => ({
      ...base,
      backgroundColor: "var(--white-transparent)",
      border: "none",
      borderRadius: "0.6rem",
      color: "var(--white)",
      cursor: isDesabled ? "not-allowed" : "pointer",
      height: "2.8rem",
      boxShadow: "none",
      paddingInline: "0.2rem",
      outline: isDesabled
        ? "none"
        : isFocused
        ? "2px solid var(--blue)"
        : "none",
    }),
    dropdownIndicator: (base, { isFocused }) => ({
      ...base,
      color: isDesabled ? "#ffffff80" : isFocused ? "var(--blue)" : "#ffffff80",
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
      outline: "1px solid var(--blue)",
      boxShadow: "0 0.4rem 0.6rem #0000004b",
      padding: "0.5rem",
      display: isDesabled ? "none" : "block",
    }),
    option: (base, { isFocused }) => ({
      ...base,
      backgroundColor: isFocused ? "var(--blue)" : "transparent",
      fontWeight: isFocused ? "500" : "200",
      cursor: "pointer",
      borderRadius: "0.4rem",
      color: "var(--white)",
    }),
    clearIndicator: (base) => ({
      ...base,
      display: !removeSelection ? "none" : "block",
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
