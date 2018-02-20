const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
// const comma = /[,\s]\s*/;

export default (emails) => {
	const invalidEmails = emails.split(',').map((email) => email.trim()).filter((email) => regex.test(email) === false);
	// console.log(invalidEmails)
	if (invalidEmails.length) {
		if (invalidEmails.length === 1) return `This email is invalid: ${invalidEmails}`
		return `These emails are invalid: ${invalidEmails}`
	}
	return
};