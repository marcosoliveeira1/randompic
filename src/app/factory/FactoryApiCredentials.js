import ApiCredential from '../models/ApiCredential';

function getApiCredentials(api_name) {
  return {
    get: async () => {
      const credentials = await ApiCredential.findAll({
        where: { api_name },
      });
      return credentials;
    },
  };
}
export default getApiCredentials;

// getCredentials(apiName){
//   return new ApiCredentials(apiName);
// };
