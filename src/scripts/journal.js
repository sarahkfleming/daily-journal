/*
    Main application logic that uses the functions and objects
    defined in the other JavaScript files.

    Change the fake variable names below to what they should be
    to get the data and display it.

    objectWithGetterMethod.methodToGetData().then(functionThatRendersData)
*/

import buildForm from "./buildForm.js"
import API from "./data.js"
import entryComponent from "./entryComponent.js"
import entriesDOM from "./entriesDOM.js"

// Dynamically create journal form
const formHTML = buildForm.createJournalFormHTML()
buildForm.renderJournalForm(formHTML)

// Get journal entries from JSON file then render them in the DOM
API.getJournalEntries()
    .then(entries => {
        const clonedEntriesArray = [...entries]
        const sortedClonedEntries = sortEntriesByID(clonedEntriesArray)
        sortedClonedEntries.forEach(entry => {
            const HTMLVersion = entryComponent.createJournalEntry(entry)
            entriesDOM.renderJournalEntries(HTMLVersion)
        })
    })

const sortEntriesByID = (entriesArray) => {
    const descendingEntries = entriesArray.sort((a, b) => b.id - a.id)
    return descendingEntries
}

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
    // Form input validation here

    // If validation checks show no issues, create entry
    const createOneEntry = newJournalEntry(getDate,
        getConcepts,
        getEntry,
        getMood)
    // Post new journal entry then render it in the DOM
    API.saveJournalEntry(createOneEntry)
        .then(API.getJournalEntries)
        .then(entries => {
            document.querySelector(".entryLog").innerHTML = ""
            const clonedEntriesArray = [...entries]
            const sortedClonedEntries = sortEntriesByID(clonedEntriesArray)
            sortedClonedEntries.forEach(entry => {
                const HTMLVersion = entryComponent.createJournalEntry(entry)
                entriesDOM.renderJournalEntries(HTMLVersion)
            })
        })
        .then(() => {
            getDate.value = ""
            getConcepts.value = ""
            getEntry.value = ""
            getMood.value = ""
        })
})

