/*
    Main application logic that uses the functions and objects
    defined in the other JavaScript files.

    Change the fake variable names below to what they should be
    to get the data and display it.

    objectWithGetterMethod.methodToGetData().then(functionThatRendersData)
*/
API.getJournalEntries()
    .then(entries => {
        entriesDOM.renderJournalEntries(entries)
    }
    )

const submitJournalEntry = document.querySelector("#record-entry")

submitJournalEntry.addEventListener('click', () => {

})