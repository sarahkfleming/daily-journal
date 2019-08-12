// Get reference to form in DOM
const journalFormContainer = document.querySelector("#journalForm")


// Build form and put it in the HTML
const buildForm = {
    createJournalFormHTML() {
        return `
        <input type="hidden" id="journalId" value="" />
        <fieldset class="flex--column">
            <label for="journalDate">Date of Entry</label>
            <input type="date" name="journalDate" id="journalDate">
        </fieldset class="flex--column">
        <fieldset>
            <label for="conceptsCovered">Concepts Covered</label>
            <input type="text" name="conceptsCovered" size="50" id="conceptsCovered">
        </fieldset>
        <fieldset class="flex--column">
            <label for="journalEntry">Journal Entry</label>
            <textarea name="journalEntry" rows="10" cols="50" id="journalEntry"></textarea>
        </fieldset>
        <fieldset class="flex--column">
            <label for="mood">Mood for the day</label>
            <select name="mood" id="mood" required>
                <option value="">Select One</option>
                <option value="Exhausted">Exhausted</option>
                <option value="Frustrated">Frustrated</option>
                <option value="Happy">Happy</option>
                <option value="Meh">Meh</option>
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