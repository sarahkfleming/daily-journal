const journalEntries = [
    {
        date: "07/17/2019",
        concepts: "Building the DOM using JavaScript",
        entry: "We learned how to use JavaScript to build HTML instead of writing it manually into the index.html file. It involced a lot of functions and loops. My brain went blank towards the end of the day. I'll need more time to process what I learned.",
        mood: "OK"
    },
    {
        date: "07/16/2019",
        concepts: "JavaScript Functions",
        entry: "Today we had lab time most of the day to work on exercises related to JavaScript functions. I practiced for...in loops and the forEach method.",
        mood: "OK"
    },
    {
        date: "07/15/2019",
        concepts: "JavaScript Functions",
        entry: "Today we covered Book 2, Chapter 4 'Functions & Logic.' We practiced writing functions that involved iterations through arrays and objects",
        mood: "OK"
    },
    {
        date: "07/12/2019",
        concepts: "JavaScript Objects",
        entry: `Today we covered Book 2, Chapter 2 "JavaScript Objects." We practiced accessing values within various combinations of objects and arrays.",
    mood: "OK"`
    },
    {
        date: "07/11/2019",
        concepts: "DOM Manipulation with JavaScript",
        entry: "Today we covered Book 2, Chapter 1 'Fun with Manipulating DOM.' We practiced using document.querySelector() and document.querySelectorAll() to target HTML elements in order to add and/or remove classes from them.",
        mood: "OK"
    },
    {
        date: "07/10/2019",
        concepts: "Celebrity Tribute Group Project: Practice using Git, GitHub, and Flexbox",
        entry: "Today we completed and presented our first group projects. My group did a celebrity tribute page for Rihanna. We had to practice pushing and merging on GitHub as well as CSS styling using Flexbox.",
        mood: "OK"
    }]

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
renderJournalEntries(journalEntries)