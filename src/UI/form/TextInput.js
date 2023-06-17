const TextInput = (props) => {
  if ("setBg" in props) {
  }
  return (
    <div className="label-and-input">
      <label className="form-label">{props.label}</label>
      <input
        className="input-box"
        type={props.type}
        value={props.value}
        {...props.register(props.name, props.validation)}
      />
    </div>
  );
};

export default TextInput;
