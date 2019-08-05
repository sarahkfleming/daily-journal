// Modify the DOM
const journalEntryContainer = document.querySelector(".entryLog")

const entriesDOM = {
    renderJournalEntries(entriesHTML) {
            journalEntryContainer.innerHTML += entriesHTML
        }
    }

export default entriesDOM