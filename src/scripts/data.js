// Get the data
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