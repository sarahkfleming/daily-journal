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

// Dynamically create journal form and render it in the DOM
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

const inputsArray = [ getConcepts, getEntry, getMood ]

// If check evaluates false, that's good
const regexCheck = /[^a-zA-Z0–9\-\.(){}:;'"/!? ]/g

const formValidationChecks = () => {
    let validated
    for (let index = 0; index < inputsArray.length; index++) {
        const input = inputsArray[index]
        const patternCheck = regexCheck.test(input.value)
        if (patternCheck === true || input.value === "") {
            window.alert("Please fill out all of the form fields. Only the following characters are allowed: A-Z a-z 0-9 - . () {} : ; ' \" ! ? ")
            validated = false
            break
        } else {
            validated = true
            break
        }
    }
    return validated
}

// Submission button event listener
submitJournalEntry.addEventListener('click', () => {
    // Form input validation here
    // Pattern to match: pattern="[A-Za-z(){}:;]"
    // formValidationChecks()

    // If validation checks show no issues, create entry
    const createOneEntry = newJournalEntry(getDate,
        getConcepts,
        getEntry,
        getMood)
    // Post new journal entry and then render it in the DOM
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
        // Empty the form fields
        .then(() => {
            getDate.value = ""
            getConcepts.value = ""
            getEntry.value = ""
            getMood.value = ""
        })
})

