var
  https = require('https'),

  // http base url
  BASE_URL = `/api/3/action/datastore_search`,

  // Default query parameters
  params = {
    // The "root" dataset id
    "resource_id": `329282b8-b287-4302-9fbb-59d06f2f2e24`,
    // Default limit
    "limit": 100,
    "include_total": true,
    "send_analytics_event": true,
    "offset": 0
  };

/*
  ** DEMO data for query
{
  "resource_id": "329282b8-b287-4302-9fbb-59d06f2f2e24",
  "filters": {
    "מונגש בDataGov": "TRUE"
  },
  "include_total": true,
  "send_analytics_event": true,
  "limit": 100,
  "offset": 0,
  "sort": "Package ID asc"
}
*/


// http default options
options = {
  port: 443,
  method: 'GET',
  path: `${BASE_URL}`,
  hostname: 'data.gov.il'
};

/**
 * Query dataset by Id
 */
function queryDataSet(config) {

  return new Promise((resolve, reject) => {
    let
      // Collect the results
      reply = '',
      // Merge default params with config
      requestOptions = Object.assign({}, options),
      requestPath = Object.assign({}, params, config);

    // Set the base url
    requestOptions.path = `${BASE_URL}?${new URLSearchParams(requestPath).toString()}`;

    // Debug messages
    // console.log(`Query Parameters: ${JSON.stringify(requestOptions, null, 4)}`);

    // Send the http request
    const httpsRequest = https.request(requestOptions,
      response => {

        // Register the handler to the data event
        response.on('data', data => {
          // Add the chunk reply
          reply += data.toString()
          // Debug messages
          // process.stdout.write(data);
        })
        // Register the handler to the data event
        response.on('end', data => {
          resolve(JSON.parse(reply));
        })
      })

    // Register error handler
    httpsRequest.on('error', error => {
      console.error(error)
      reject(error);
    })

    // send the request
    httpsRequest.end()

  }); // Promise
}


/** */
module.exports = {
  queryDataSet
}  