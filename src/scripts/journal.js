/*
    Main application logic that uses the functions and objects
    defined in the other JavaScript files.

    Change the fake variable names below to what they should be
    to get the data and display it.

    objectWithGetterMethod.methodToGetData().then(functionThatRendersData)
*/
API.getJournalEntries().then(entries => { entriesDOM.renderJournalEntries(entries)})

// Get reference to Record Journal Entry button
const submitJournalEntry = document.querySelector("#record-entry")

// Get references to input fields
const getDate = document.querySelector("#journalDate")
const getConcepts = document.querySelector("#conceptsCovered")
const getEntry = document.querySelector("#journalEntry")
const getMood = document.querySelector("#mood")

submitJournalEntry.addEventListener('click', () => {
    let practice = getDate.value
    console.log(practice)
})

