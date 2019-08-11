// Get the data
const API = {
    getJournalEntries() {
        return fetch("http://localhost:3000/entries")
            .then(response => response.json())
    },
    saveJournalEntry(newJournalEntry) {
        return fetch("http://localhost:3000/entries", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newJournalEntry),
        })
    },
    deleteJournalEntry(journalEntryId) {
        return fetch(`http://localhost:3000/entries/${journalEntryId}`, {
            method: "DELETE"
        })
            .then(response => response.json())
    }
}

export default API