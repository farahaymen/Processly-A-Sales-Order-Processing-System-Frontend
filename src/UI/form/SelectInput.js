const SelectInput = (props) => {
  return (
    <div className="label-and-input">
      <label className="form-label">{props.label}</label>
      <select
        className="input-box"
        {...props.register(props.name, {
          required: props.required,
          onChange: props.onChange, // added onChange here, as we need to bind register() with the onChange function first before obtaining it from spread (...) operator
        })}
      >
        {props.options.map((o) => (
          <option
            value={typeof o !== "string" ? o.value : o}
            key={typeof o !== "string" ? o.value : o}
          >
            {typeof o !== "string" ? o.name : o}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
