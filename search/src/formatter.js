function formatResponse(statusCode, body){
    let response = {
        statusCode,
        headers: {
            'Content-Type': 'application/json'
        },
        'isBase64Encode': false,
        body
    }
    return response;
}

function formatError(statusCode, error){
    let response = {
        statusCode,
        headers: {
            'Content-Type': 'application/json',
            'x-amzn-ErrorType': statusCode
        },
        'isBase64Encoded': false,
        body: error
    }
    return response;
}

module.exports = {
    formatResponse,
    formatError
}