// @ts-nocheck
import React from "react";
import { useState } from "react";
import PlacesAutocomplete, {
    geocodyByAdress
} from 'react-places-autocomplete'


const Location: React.FC = () => {
    const [address, setAddress] = useState("")
    const handleSelect = async (value) => {

    }
    return (
        <>
            <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <input {...getInputProps({placeholder: "type address"})}></input>
                    <div>
                        {loading ? <div>loading... </div> : null}
                        {suggestions.map((suggestion) => {
                            const style = {
                                backgroudc
                            }
                            return <div {...getSuggestionItemProps()}> {suggestion.description} </div>
                        })}
                    </div>
                </div>)}
                
            </PlacesAutocomplete>
        </>
    );
}
export default Location;