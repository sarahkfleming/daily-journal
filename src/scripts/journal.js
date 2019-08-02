/*
    Main application logic that uses the functions and objects
    defined in the other JavaScript files.

    Change the fake variable names below to what they should be
    to get the data and display it.

    objectWithGetterMethod.methodToGetData().then(functionThatRendersData)
*/

// Get journal entries from JSON file then render them in the DOM
API.getJournalEntries().then(entries => { entriesDOM.renderJournalEntries(entries)})

// Get reference to Record Journal Entry button
const submitJournalEntry = document.querySelector("#record-entry")

// Get references to input fields
const getDate = document.querySelector("#journalDate")
const getConcepts = document.querySelector("#conceptsCovered")
const getEntry = document.querySelector("#journalEntry")
const getMood = document.querySelector("#mood")

// Factory function to create an object
const newJournalEntry = (date, concepts, entry, mood) => {
    return {
        "date": date.value,
        "concepts": concepts.value,
        "entry": entry.value,
        "mood": mood.value,
        }
}

// Submission button event listener
submitJournalEntry.addEventListener('click', () => {
    const createOneEntry = newJournalEntry(getDate,
        getConcepts,
        getEntry,
        getMood)
    // Post new journal entry then render it in the DOM
    API.saveJournalEntry(createOneEntry)
        .then(API.getJournalEntries)
        .then(entries => {
            entriesDOM.renderJournalEntries(entries)
        })
        .then( () => {
            getDate.value = ""
            getConcepts.value = ""
            getEntry.value = ""
            getMood.value = ""
        })
})

