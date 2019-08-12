// Create Journal Entry
const entryComponent = {
    createJournalEntry(journalEntry) {
        return `
        <section class="journalEntry">
        <h1>${journalEntry.id}</h1>
        <h1>Date: ${journalEntry.date}</h1>
        <p>Concepts Covered: ${journalEntry.concepts}</p>
        <p>Journal Entry: ${journalEntry.entry}</p>
        <p>Mood: ${journalEntry.mood}</p>
        <button id="edit-${journalEntry.id}">Edit</button>
        <button id="delete-${journalEntry.id}">Delete</button>
        </section>
        `
    }
}

export default entryComponent