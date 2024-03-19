function InputLocations(props) {
    const handleChange = (e) => {
        props.onChange(e.target.value)
    }

    // Map locations from api to options in select statement, give unique keys in case of duplicates.
    return (
        <div>
            <label htmlFor="location" className="label">
                Location 
            </label>
            <select name="location"
                    id="location"
                    value={props.value}
                    onChange={handleChange}
                    className="input"
                >
                {
                    props.selectLocations.map((val, key) => 
                        <option key={key} value={val}
                        >
                            {val}
                        </option>
                    )
                }
            </select>
        </div>
    )
}

export default InputLocations;