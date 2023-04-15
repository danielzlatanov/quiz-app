import { html, render } from '../../lib.js';

const editorTemplate = (data, index, onSave, onCancel) => html`<div class="layout">
		<div class="question-control">
			<button @click=${onSave} class="input submit action">
				<i class="fas fa-check-double"></i> Save
			</button>
			<button @click=${onCancel} class="input submit action">
				<i class="fas fa-times"></i> Cancel
			</button>
		</div>
		<h3>Question ${index}</h3>
	</div>
	<form>
		<textarea
			class="input editor-input editor-text"
			name="text"
			placeholder="Enter question"
			.value=${data.text}></textarea>

		${data.answers.map((a, answerIndex) =>
			radioEdit(index, answerIndex, a, data.correctIndex == answerIndex)
		)}
		<div class="editor-input">
			<button class="input submit action">
				<i class="fas fa-plus-circle"></i>
				Add answer
			</button>
		</div>
	</form>`;

const radioEdit = (questionIndex, answerIndex, value, checked) => html`<div class="editor-input">
	<label class="radio">
		<input
			class="input"
			type="radio"
			name=${`question-${questionIndex}`}
			value=${answerIndex}
			?checked=${checked} />
		<i class="fas fa-check-circle"></i>
	</label>

	<input class="input" type="text" name=${`answer-${answerIndex}`} .value=${value} />
	<button class="input submit action">
		<i class="fas fa-trash-alt"></i>
	</button>
</div>`;

const viewTemplate = (data, index, onEdit, onDelete) => html`
	<div class="layout">
		<div class="question-control">
			<button @click=${onEdit} class="input submit action">
				<i class="fas fa-edit"></i> Edit
			</button>
			<button @click=${onDelete} class="input submit action">
				<i class="fas fa-trash-alt"></i> Delete
			</button>
		</div>
		<h3>Question ${index}</h3>
	</div>
	<div>
		<p class="editor-input q-saved">${data.text}</p>

		${data.answers.map((a, answerIndex) => radioView(a, data.correctIndex == answerIndex))}
	</div>
`;

const radioView = (value, checked) => html`<div class="editor-input">
	<label class="radio">
		<input class="input" type="radio" disabled ?checked=${checked} />
		<i class="fas fa-check-circle"></i>
	</label>
	<span class="q-saved">${value}</span>
</div>`;

/* <div class="loading-overlay working"></div> */

export function createQuestion(question, index) {
	const element = document.createElement('article');
	element.className = 'editor-question';

	showView();

	return element;

	function onEdit() {
		showEditor();
	}

	async function onDelete() {
		const confirmed = confirm('Are you sure you want to delete this question?');
		if (confirmed) {
			element.remove();
		}
	}

	async function onSave() {
		console.log('saved');
	}

	function onCancel() {
		showView();
	}

	function showView() {
		render(viewTemplate(question, index, onEdit, onDelete), element);
	}
	function showEditor() {
		render(editorTemplate(question, index, onSave, onCancel), element);
	}
}
