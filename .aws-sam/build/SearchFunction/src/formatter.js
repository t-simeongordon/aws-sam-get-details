function formatResponse(statusCode, responseBody){
    const response = {
        "statusCode": statusCode,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(responseBody),
        "isBase64Encoded": false
    };
    return response;
}

function formatError(statusCode, error){
    let response = {
        "statusCode": statusCode,
        "headers": {
            "Content-Type": "application/json",
            "x-amzn-ErrorType": statusCode
        },
        "isBase64Encoded": false,
        "body": JSON.stringify(error)
    }
    return response;
}

module.exports = {
    formatResponse,
    formatError
}