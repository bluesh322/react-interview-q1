import './Input.css'

// props.error - Toggle display of error text from props.error.
function InputName({onChange, ...props}) {
    return (
        <div>
            <label htmlFor="name" className="label">
                Name
            </label>
            <input 
                    type="text"
                    name="name"
                    id="name"
                    onChange={(e) => onChange(e.target.value)}
                    className="input"
                />
                {props.error ? <p 
                    className="error-text">
                        This name has already been taken
                </p> : ''}
        </div>
    )
}

export default InputName;