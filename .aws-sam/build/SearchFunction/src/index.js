const AWS = require('aws-sdk');
const formatter = require('./formatter');
const { v4 } = require('uuid');
//Needed for testing
AWS.config.update({region:'eu-west-2'});

exports.handler = async (event) => {
    // const Name = '/Project/Service/Names';
    const Name = process.env.SSM_NAMES;
    const options = { endpoint: process.env.SSM_ENDPOINT};
    let response = {};
    const contextUid = v4();
    
//    const res = new AWS.SSM({ endpoint: 'https://ssm.eu-west-2.amazonaws.com' })
//         .getParameter('/test/store/names')
//         .promise()
//         .then((result) => result.Parameter.Value)
//         .catch((err) => {
//           console.log(`Error while retrieving parameter info for Parameter Name = /test/store/names  and reason: ${err}`);
//         });

    try{
        console.log(`event: ${JSON.stringify(event)}`)
        const result = await new AWS.SSM(options).getParameter({Name}).promise();
        console.log(`new AWS.SSM(options).getParameter({Name}).promise(): ${JSON.stringify(result)}`)
        response = formatter.formatResponse(200, {statusCode: 200, dataSourceUrls: result.Parameter.Value.split(', ')});
    }catch(error){
        console.error(`Main function caught error: ${error} for contextUid: ${contextUid}`);
        response = formatter.formatError(502, { error })
    }
    console.log(`response: ${JSON.stringify(response)}`)

    return response;
}