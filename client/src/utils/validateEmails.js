const validator = require('email-validator')

export default (emails) => {
    const invalidEmails = emails.split(',').map((email) => {
        return email.trim();
    }).filter((email) => {
        // if(email.charAt(email.length-1) === ','){
        //     email = email.replace(',','')
        // }
        return validator.validate(email) === false
    });

    if (invalidEmails.length) {
        return `These emails are invalid ${invalidEmails}`
    }
}