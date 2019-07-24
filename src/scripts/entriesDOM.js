// Modify the DOM
const journalEntryContainer = document.querySelector(".entryLog")

const renderJournalEntries = (entries) => {
    entries.forEach(entry => {
        const htmlRep = makeJournalEntryComponent(entry)
        journalEntryContainer.innerHTML += htmlRep
    })
}