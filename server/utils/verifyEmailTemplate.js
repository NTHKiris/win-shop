const verifyEmailTemplate = ({name, url}) => {
    return `
    <p>Dear ${name} </p>
    <p>Thank you for your registing our Shop</p>
    <a href="${url}" style = "color: black ; margin-top: 10px; padding:20px; display:block">
        Verify Email
    </a> 
    `
}

export default verifyEmailTemplate