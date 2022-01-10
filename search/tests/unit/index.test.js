const index = require('../../src/index')

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

jest.mock('aws-sdk', () => {
    const mockedSSM = {
      getParameter: jest.fn().mockReturnThis(),
      promise: jest.fn()
    };
    const mockedConfig = {
      update: jest.fn()
    };
    return {
      SSM: jest.fn(() => mockedSSM),
      config: mockedConfig
    };
  });
  
  const aws = require('aws-sdk');
  const ssm = new aws.SSM();
  
  describe('Test for index', () => {
    test('success', async () => {
      const mockedResponseData = {
        Parameter: {
          Name: '/Project/Service/Names',
          Type: 'StringList',
          Value: 'name1, name2',
          Version: 1,
        }
      };
  
      ssm.getParameter().promise.mockResolvedValueOnce(mockedResponseData);
      const data = await index.handler({});
      expect(data).toEqual({
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json"
        },
        "isBase64Encoded": false,
        "body": "{\"statusCode\":200,\"dataSourceUrls\":[\"name1\",\"name2\"]}"
    });
      expect(ssm.getParameter).toBeCalledWith({ Name: `/Project/Service/Names` });
    //   expect(ssm.getParameter().promise).toBeCalledTimes(1);
    });

    test('fail', async () => {
        const mockedResponseData = Promise.reject('No parameter configured')
    
        ssm.getParameter().promise.mockResolvedValueOnce(mockedResponseData);
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
        expect(ssm.getParameter).toBeCalledWith({ Name: `/Project/Service/Names` });
      //   expect(ssm.getParameter().promise).toBeCalledTimes(1);
      });
  });