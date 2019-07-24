// Modify the DOM
const journalEntryContainer = document.querySelector(".entryLog")

const entriesDOM = {
    renderJournalEntries(entries) {
        entries.forEach(entry => {
            const htmlRep = entryComponent.makeJournalEntryComponent(entry)
            journalEntryContainer.innerHTML += htmlRep
        })
    }
}