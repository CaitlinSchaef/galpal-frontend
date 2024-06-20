// a page for users to view and update their interest inventory
import { useState, useContext, useEffect } from "react";
import { getInterestInventory, updateInterestInventory, getInterests } from "../api";
import { Context } from "../Context";

function UserInterestInventory() {
    const { context } = useContext(Context);
    const [interestInventory, setInterestInventory] = useState([])
    const [selectedInterests, setSelectedInterests] = useState([])
    const [interestList, setInterestList] = useState([])
    const maxSelections = 10

    useEffect(() => {
        const fetchInterestInventory = async () => {
            try {
                const response = await getInterestInventory({ context })
                const interests = response.data.map(item => item.interest.interests)
                setInterestInventory(response.data)
                setSelectedInterests(interests)
                console.log('INTEREST INVENTORY:', response.data)
            } catch (error) {
                console.error('Failed to get interest inventory:', error)
            }
        }
        fetchInterestInventory()
    }, [context])


    // we're always going to call getInterests so that users can update their interests with the newest list of availble interests 
    useEffect(() => {
        const fetchInterests = async () => {
            try {
                const response = await getInterests({ context })
                setInterestList(response.data)
                console.log('INTEREST LIST:', response.data)
            } catch (error) {
                console.error('Failed to get interests:', error)
            }
        };
        fetchInterests()
    }, [context])

    const handleCheckboxChange = (interest) => {
        setSelectedInterests((prevSelected) => {
            if (prevSelected.includes(interest)) {
                return prevSelected.filter((i) => i !== interest)
            } else if (prevSelected.length < maxSelections) {
                return [...prevSelected, interest]
            } else {
                return prevSelected
            }
        })
    }

    const handleSubmit = async () => {
        try {
            await updateInterestInventory({ context, interests: selectedInterests })
            console.log('Interests updated successfully');

            // Fetch updated interest inventory after submission
            const response = await getInterestInventory({ context });
            setInterestInventory(response.data)
            setSelectedInterests(response.data.map(item => item.interest.interests))
        } catch (error) {
            console.error('Failed to update interests:', error)
        }
    }
    // need to put in a no interest found thing for the users who didn't go through the demo
    
    return (
        <div>
            <h1>Your Current Interests</h1>
            {interestInventory.length > 0 ? (
                <ul>
                    {interestInventory.map((item, index) => (
                        <li key={index}>{item.interest.interests}</li>
                    ))}
                </ul>
            ) : (
                <p>No interests found</p>
            )}
            <h2>Update Your Interests</h2>
            {interestList.length > 0 ? (
                <form>
                    {interestList.map((interest) => (
                        <div key={interest.id}>
                            <input
                                type="checkbox"
                                id={`interest-${interest.id}`}
                                value={interest.interests}
                                onChange={() => handleCheckboxChange(interest.interests)}
                                checked={selectedInterests.includes(interest.interests)}
                                disabled={!selectedInterests.includes(interest.interests) && selectedInterests.length >= maxSelections}
                            />
                            <label htmlFor={`interest-${interest.id}`}>{interest.interests}</label>
                        </div>
                    ))}
                    <button type="button" onClick={handleSubmit} disabled={selectedInterests.length === 0}>
                        Update Interests
                    </button>
                </form>
            ) : (
                <div>No interests found</div>
            )}
        </div>
    )
}

export default UserInterestInventory