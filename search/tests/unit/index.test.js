const index = require('../../src/index');
// const { getParameter } =  require('../../src/ssm')
// const AWS = require('aws-sdk');
// jest.mock('../../src/ssm')
// describe('Test index module', ()=>{
//     beforeEach(() => {
//         jest.resetModules();
//     });

//     test('should return successful response', async ()=>{
//         //given
//         //when
//         const response = await index.handler({});

//         //then
//         expect(response.statusCode).toBe(200);
//         expect(response.body.dataSourceUrls[0]).toBe('name1');
//     });
// });



// const mockedResponseData = {
//   Parameter: {
//     Name: '/Project/Service/Names',
//     Type: 'StringList',
//     Value: 'name1, name2',
//     Version: 1,
//   }
// };

// jest.mock('aws-sdk', () => {
//   const ssm =()=> ({
//     getParameter: (params)=>({
//       promise:()=> {
//         return Promise.resolve(mockedResponseData)
//       }
//     })
//   });
//   const mockedConfig = {
//     update: jest.fn()
//   };
//   return {
//     SSM: jest.fn().mockImplementation(ssm),
//     config: mockedConfig
//   };
// });
  
//   const ssm = new aws.SSM();
  
  describe('Test for index', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    test('success', async () => {
const AWS = require('aws-sdk')
      const expectedResult = {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json"
        },
        "isBase64Encoded": false,
        "body": "{\"statusCode\":200,\"dataSourceUrls\":[\"name1\",\"name2\"]}"
    }
    // let { getParameter } =  require('../../src/ssm')
    // getParameter = jest.fn().mockReturnValueOnce('name1, name2');
    // jest.spyOn('../../src/ssm', 'getParameter').mockReturnValueOnce('name1, name2')
    // getParameter = jest.fn().mockReturnValueOnce('name1, name2')
      // ssm.getParameter().promise.mockResolvedValueOnce(mockedResponseData);
      const result = await index.handler({});
    expect(result.body).toEqual(expectedResult.body)
    expect(AWS.SSM).toHaveBeenCalled();
      // expect(AWS.SSM.getParameter()).toBeCalledWith({ Name: `/Project/Service/Names` });
    //   expect(ssm.getParameter().promise).toBeCalledTimes(1);
    });

    test('fail', async () => {
      const mockedErrorResponseData = Promise.reject('No parameter configured')
  
      // AWS.SSM().jest.mockImplementation(()=>({
      //   getParameter:()=>({
      //     promise:()=>{
      //       return mockedErrorResponseData
      //     }
      //   })
      // }))
      const AWS = require('aws-sdk');
      AWS.SSM.mockImplementation(() => ({
          getParameter: () => ({
              promise: () => Promise.reject(new Error('No parameter configured'))
          })
      }));
      
        // AWS.SSM().getParameter().promise().mockResolvedValueOnce(mockedResponseData);
        const data = await index.handler({});
        expect(data).toStrictEqual({
          "statusCode": 502,
          "headers": {
              "Content-Type": "application/json",
              'x-amzn-ErrorType': 502
          },
          "isBase64Encoded": false,
          "body": "{\"error\":\"No parameter configured\"}"
      });
        // expect(ssm.getParameter).toBeCalledWith({ Name: `/Project/Service/Names` });
      //   expect(ssm.getParameter().promise).toBeCalledTimes(1);
      });
  });