
const InputField = (props) => {
    return (
        <input
            className="input--field"
            id={props.id}
            type={props.type}
            value={props.value}
            placeholder={props.placeholder}
        // onChange={props.onChangeHandler}
        />
    )
}

export default InputField