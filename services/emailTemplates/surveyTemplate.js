const { REDIRECT_DOMAIN } = require('../../config/keys')

module.exports = (survey) => {
    return `
        <html>
            <body>
                <div style="text-align:center:">
                    <h3>I'd Like Your Input</h3>
                    <p>Please answer the following qestion:</p>
                    <p>${survey.body}</p>
                    <div>
                        <a href="${REDIRECT_DOMAIN}/api/surveys/${survey.id}/yes">Yes</a>
                    </div>
                    <div>
                        <a href="${REDIRECT_DOMAIN}/api/surveys/${survey.id}/no">No</a>
                    </div>
                </div>
            </body>
        </html>
    `
}