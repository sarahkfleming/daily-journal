const makeJournalEntryComponent = (journalEntry) => {
    return `
    <section class="journalEntry">
    <h1>Date: ${journalEntry.date}</h1>
    <p>Concepts Covered: ${journalEntry.concepts}</p>
    <p>Journal Entry: ${journalEntry.entry}</p>
    <p>Mood: ${journalEntry.mood}</p>
    </section>
    `
}

const journalEntryContainer = document.querySelector(".entryLog")

const renderJournalEntries = (entries) => {
    entries.forEach(entry => {
        const htmlRep = makeJournalEntryComponent(entry)
        journalEntryContainer.innerHTML += htmlRep
    })
}

fetch("http://localhost:3000/entries")
    .then(journalEntries => journalEntries.json())
    .then(myParsedEntries => {
        myParsedEntries.forEach(entry => {
            if ("date" in entry) {
                entry.date = `${entry.date}`
            } else {
                entry.date = "(Information not found)"
            }

            const htmlRep = makeJournalEntryComponent(entry)
            journalEntryContainer.innerHTML += htmlRep
        })
    })