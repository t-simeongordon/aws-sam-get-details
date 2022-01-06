const AWS = require('aws-sdk');
const formatter = require('./formatter');
const { v4 } = require('uuid');
AWS.config.update({region:'eu-west-2'});

exports.handler = async (event) => {
    const Name = '/Project/Service/Names';
    const options = { endpoint: 'https://ssm.eu-west-2.amazonaws.com'};
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
        const result = await new AWS.SSM(options).getParameter({Name}).promise();
        console.log(`new AWS.SSM(options).getParameter({Name}).promise(): ${JSON.stringify(result)}`)
        response = formatter.formatResponse(200, {statusCode: 200, dataSourceUrls: result.Parameter.Value.split(', ')});
    }catch(error){
        console.error(`Main function caught error: ${error} for contextUid: ${contextUid}`);
        response = formatter.formatError(502, { error })
    }
    
    return response;
}