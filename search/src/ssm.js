const AWS = require('aws-sdk');
const options = {
    endpoint: 'https://ssm.eu-west-2.amazonaws.com'
}
const getParameter = async (Name)=>{
    return new AWS.SSM(options).getParameter({Name}).promise()
    .then((data)=>
         data.Parameter.Value
    )
    .catch((err)=>{
        console.error(`Error while retrieving parameter info for Parameter Name = /test/store/names  and reason: ${err}`);
        throw new Error(err);
    })
}

module.exports = {
    getParameter
}