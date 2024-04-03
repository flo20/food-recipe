import { TIMEOUT_SECONDS } from "./config";

const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };
  


export const getJSON =  async function(url){
    try {
        const response = await Promise.race([fetch(
            url
          ), timeout(TIMEOUT_SECONDS)]);
      const dataFetching = await response.json();
      if (!response.ok) throw new Error(`${response.statusText}`);

      return dataFetching;

    } catch (error) {
        throw error;
    }
}