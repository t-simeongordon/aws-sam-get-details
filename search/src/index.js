const AWS = require('aws-sdk');
const formatter = require('./formatter');
const { v4 } = require('uuid');
const { getParameter } = require('./ssm')
//Needed for testing
// AWS.config.update({region:'eu-west-2'});

exports.handler = async (event) => {
    const Name = process.env.SSM_NAMES;
    let response = {};
    const contextUid = v4();

    try{
        console.log(`event: ${JSON.stringify(event)}`)
        const result = await getParameter(Name);
        console.log(`new AWS.SSM(options).getParameter({Name}).promise(): ${JSON.stringify(result)}`)
        response = formatter.formatResponse(200, {statusCode: 200, dataSourceUrls: result.split(', ')});
    }catch(error){
        console.error(`Main function caught error: ${error} for contextUid: ${contextUid}`);
        response = formatter.formatError(502, { error })
    }
    
    console.log(`response: ${JSON.stringify(response)}`)

    return response;
}