const TextAreaInput = (props) => {
  return (
    <div className="label-and-input">
      <label
        className={`form-label${props.centerLabel ? " center-label" : ""}`}
      >
        {props.label}
      </label>
      <textarea
        className="rounded-lg min-w-[250px] p-2"
        value={props.value}
        {...props.register(props.name, { onChange: props.onChange })}
      />
    </div>
  );
};

export default TextAreaInput;
