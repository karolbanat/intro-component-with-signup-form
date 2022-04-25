const formInputs = document.querySelectorAll('.form__input');
const email = document.querySelector('#email');
const submitBtn = document.querySelector('.form__submit-btn');

const emailRegex =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const checkForErrors = (e) => {
	//prevents from reloading page
	e.preventDefault();

	formInputs.forEach((input) => checkInputError(input));
	validateEmail();
};

const checkInputError = (input) => {
	if (!input.value) {
		addError(input);
	} else {
		removeError(input);
	}
};

const validateEmail = () => {
	if (!email.value) {
		addError(email);
	} else if (!email.value.match(emailRegex)) {
		email.classList.add('error');
		email.nextElementSibling.innerText = 'Looks like this is not an email';
	} else {
		removeError(email);
	}
};

const addError = (input) => {
	input.classList.add('error');
	input.nextElementSibling.innerText = `${input.placeholder} cannot be empty`;
};

const removeError = (input) => {
	input.classList.remove('error');
	input.nextElementSibling.innerText = '';
};

//event listeners
submitBtn.addEventListener('click', checkForErrors);

// removes error class and styling when user is focusing input
formInputs.forEach((input) => {
	input.addEventListener('focus', () => {
		input.classList.remove('error');
	});
});

formInputs.forEach((input) => {
	input.addEventListener('focusout', () => checkInputError(input));
});

email.addEventListener('focusout', validateEmail);
