const mockedResponseData = {
    Parameter: {
      Name: '/Project/Service/Names',
      Type: 'StringList',
      Value: 'name1, name2',
      Version: 1,
    }
  };
  
const ssm =()=> ({
    getParameter: (params)=>({
    promise:()=> {
        return Promise.resolve(mockedResponseData)
    }
    })
});
const mockedConfig = {
    update: jest.fn()
};
let AWS =  {
    SSM: jest.fn().mockImplementation(ssm),
    config: mockedConfig
};

module.exports = AWS
