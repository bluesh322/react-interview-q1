import React, { useEffect, useState } from 'react';
import InputName from './InputName';
import InputLocations from './InputLocation';
import NameLocationTable from './NameLocationTable';
import { isNameValid } from '../mock-api/apis';
import { getLocations } from '../mock-api/apis';
import { useDebounce } from '../hooks/useDebounce';

/*
    Main component of the form. 

    When creating any form, I will break down the individual inputs into like components, and distribute business logic to each component as necessary.
    I chose to have both API calls in one useEffect as they had no interlocking dependencies, but I would generally only make one API call per component.
*/

function NameLocationForm() {
    // Control the text name input, have separate state for determining valid names, and implement useDebounce to prevent repeat calls to api.
    const [nameValue, setNameValue] = useState("");
    const [validName, setValidName] = useState(true);
    const debouncedNameValue = useDebounce(nameValue);
    // Control the locations values from the api as though they were updated per page load, separate state for current selected option. 
    const [selectLocations, setSelectLocations] = useState([]);
    const [formSelect, setFormSelect] = useState('');
    // [ { Name | Location } ] state for filling up the table from inputs.
    const [nameLocation, setNameLocation] = useState([])

    useEffect(() => {
        const validateName = async () => {
            const isValidName = await isNameValid(debouncedNameValue);
            setValidName(isValidName);
        };
        validateName();

        const fetchLocations = async () => {
            try {
                const locations = await getLocations();
                setSelectLocations([...locations]);
                // Initialize formSelect to have first option selected on component load.
                setFormSelect(locations[0]);
            } catch (error) {
                // Catastrophic disconnection from my own file system
                setSelectLocations(["Locations error"])
            }
        };
        fetchLocations();
    }, [debouncedNameValue])

    // Determine if Add button is enabled.
    const buttonIsEnabled = nameValue !== '' && validName;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validName) {
            setNameLocation([
                ...nameLocation,
                { name: nameValue, location: formSelect }
            ])

            // Clear form, also clear state of name.
            e.target.reset();
            setNameValue('')
        }
    }

    // Empty table on clear.
    const handleClear = (e) => {
        e.preventDefault();

        setNameLocation([]);
    }

    // <InputName> Pass error handling to text Name Input for red text.
    // <InputLocations> Pass collected locations as props for building options.
    // <Buttons> Disable button when needed, handle clear or submit.
    // <NameLocationTable> Pass [ { Name | Location }] to have options mapped.
    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="form">
                <InputName
                    error={!validName}
                    onChange={setNameValue}
                />
                <InputLocations
                    selectLocations={selectLocations}
                    onChange={(val) => setFormSelect(val)}
                />
                <div className="button-group">
                    <button onClick={handleClear}>Clear</button>
                    <button disabled={!buttonIsEnabled} type="submit">Add</button>
                </div>
            </form>
            <div className='table'>
                <NameLocationTable
                    nameLocation={nameLocation}
                />
            </div>
        </div>
    )
}

export default NameLocationForm;