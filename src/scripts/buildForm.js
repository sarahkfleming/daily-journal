// Get reference to form in DOM
const journalFormContainer = document.querySelector("#journalForm")


// Build form and put it in the HTML
const buildForm = {
    createJournalFormHTML() {
        return `
        <fieldset>
            <label for="journalDate">Date of Entry</label>
            <input type="date" name="journalDate" id="journalDate" required>
        </fieldset>
        <fieldset>
            <label for="conceptsCovered">Concepts Covered</label>
            <input type="text" name="conceptsCovered" size="50" id="conceptsCovered" pattern="[A-Za-z(){}:;]" required>
        </fieldset>
        <fieldset>
            <label for="journalEntry">Journal Entry</label>
            <textarea name="journalEntry" rows="10" cols="50" id="journalEntry" pattern="[A-Za-z(){}:;]" required></textarea>
        </fieldset>
        <fieldset>
            <label for="mood">Mood for the day</label>
            <select name="mood" id="mood" required>
                <option value="Frustrated">Frustrated</option>
                <option value="Happy">Happy</option>
                <option value="OK">OK</option>
                <option value="Sad">Sad</option>
            </select>
        </fieldset>

        <input id="record-entry" type="submit" value="Record Journal Entry">
        `
    },
    renderJournalForm(formHTML) {
            journalFormContainer.innerHTML = formHTML
        }
}

export default buildForm