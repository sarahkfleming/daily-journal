import buildForm from "./buildForm.js"
import API from "./data.js"
import entryComponent from "./entryComponent.js"
import entriesDOM from "./entriesDOM.js"

// Reference to journal entry container
const journalEntryContainer = document.querySelector(".entryLog")

// Dynamically create journal form and render it in the DOM
const formHTML = buildForm.createJournalFormHTML()
buildForm.renderJournalForm(formHTML)

// Sort journal entries in descending order by ID
const sortEntriesByID = (entriesArray) => {
    const descendingEntries = entriesArray.sort((a, b) => b.id - a.id)
    return descendingEntries
}

// Clone the entries array, sort in descending order by ID, and then render to the DOM
const cloneAndDisplayEntries = (entries) => {
    const clonedEntriesArray = [...entries]
    const sortedClonedEntries = sortEntriesByID(clonedEntriesArray)
    sortedClonedEntries.forEach(entry => {
        const HTMLVersion = entryComponent.createJournalEntry(entry)
        entriesDOM.renderJournalEntries(HTMLVersion)
    })
}

// Get journal entries from JSON file then render them in the DOM
API.getJournalEntries()
    .then(entries => {
        cloneAndDisplayEntries(entries)
    })

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
        date: date.value,
        concepts: concepts.value,
        entry: entry.value,
        mood: mood.value,
    }
}

// Clear out the input fields once an entry is saved or edited
const clearFormFields = () => {
    hiddenJournalId.value = ""
    getDate.value = ""
    getConcepts.value = ""
    getEntry.value = ""
    getMood.value = ""
}

// Store inputs in array for validation check loop
const inputsArray = [getConcepts, getEntry, getMood]

// If check evaluates false, that's good
const regexCheck = /[^a-zA-Z0-9\-\.(){}:;'"\/!?\, ]/g

// Still need to add blank fields to form validation
const formValidationChecks = () => {
    let validated
    for (let index = 0; index < inputsArray.length; index++) {
        const input = inputsArray[index]
        const emptyFieldCheck = /^\s+$/
        const patternCheck = regexCheck.test(input.value)
        if (emptyFieldCheck.test(input.value) || input.value === "" || getDate.value === "") {
            validated = false
            alert("Please fill out all of the form fields.")
            break
        } else if (patternCheck) {
            validated = false
            alert("Only the following characters are allowed: A-Z a-z 0-9 - . () {} : ; ' \" ! ? ,")
            break
        } else {
            validated = true
        }
    }
    return validated
}

const hiddenJournalId = document.querySelector("#journalId")

// Submission button event listener
submitJournalEntry.addEventListener("click", () => {
    // Form input validation here
    const resultOfValidation = formValidationChecks()
    if (resultOfValidation && hiddenJournalId.value === "") {
        // If validation checks show no issues, create entry
        const createOneEntry = newJournalEntry(getDate, getConcepts, getEntry, getMood)
        // Post new journal entry and then render it in the DOM
        API.saveJournalEntry(createOneEntry)
            .then(API.getJournalEntries)
            .then(entries => {
                // Clear the entries log
                journalEntryContainer.innerHTML = ""
                cloneAndDisplayEntries(entries)
            })
            // Empty the form fields
            .then(clearFormFields)
    } else {
        const journalEntry = {
            date: getDate.value,
            concepts: getConcepts.value,
            entry: getEntry.value,
            mood: getMood.value,
            id: hiddenJournalId.value
        }
        // Save it as an edit with the Put method
        API.editJournalEntry(journalEntry)
            .then(API.getJournalEntries)
            .then(entries => {
                journalEntryContainer.innerHTML = ""
                cloneAndDisplayEntries(entries)
            })
            .then(clearFormFields)
    }
})

/* ----------------- Edit and Delete Event Listener ------------------------*/

journalEntryContainer.addEventListener("click", () => {
    if (event.target.id.startsWith("delete")) {
        // Ask user to confirm deletion request before executing
        const confirmDeletion = confirm("Do you want to delete this entry?")
        if (confirmDeletion) {
            const entryToDelete = event.target.id.split("-")[1]
            API.deleteJournalEntry(entryToDelete)
            .then(API.getJournalEntries)
            .then(entries => {
                journalEntryContainer.innerHTML = ""
                cloneAndDisplayEntries(entries)
            })
        }
    } else if (event.target.id.startsWith("edit")) {
        submitJournalEntry.value = "Save Entry"
        const entryToEdit = event.target.id.split("-")[1]
        API.getSingleJournalEntry(entryToEdit)
        .then(entry => {
            hiddenJournalId.value = entry.id
            getDate.value = entry.date
            getConcepts.value = entry.concepts
            getEntry.value = entry.entry
            getMood.value = entry.mood
        })
    }
    event.stopPropagation()
})

// Get reference to container of mood radio buttons
const moodSearch = document.querySelector("#search-by-mood")

// Mood Radio Buttons event listener
moodSearch.addEventListener("click", () => {
    if (event.target.tagName === "INPUT") {
        const moodFilter = event.target.value
        API.getJournalEntries()
        .then(entries => {
            const filteredEntries = entries.filter(entry => entry.mood.toLowerCase() === moodFilter)
            journalEntryContainer.innerHTML = ""
            const filteredAndSortedEntries = sortEntriesByID(filteredEntries)
            filteredAndSortedEntries.forEach(entry => {
                const HTMLVersion = entryComponent.createJournalEntry(entry)
                entriesDOM.renderJournalEntries(HTMLVersion)
            })
        })
    }
    event.stopPropagation()
})