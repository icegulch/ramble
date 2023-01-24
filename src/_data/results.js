require('dotenv').config();
const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function () {

  const airtableToken = process.env.AIRTABLE_API_KEY;
  const airtableBaseId = "app0PbsOhgNQ5rxz8";
  const airtableTable = "Results";

  let baseUrl = `https://api.airtable.com/v0/${airtableBaseId}/${airtableTable}`;

  const getResults = async (queryOffset) => {

    const url = queryOffset != "" ? baseUrl + "?offset=" + queryOffset : baseUrl;
    
    const response = await EleventyFetch(url, {
      duration: "1h",
      type: "json",
      // Append the Airtable API authorization key to the query
      fetchOptions: {
        headers: {
          authorization: `Bearer ${airtableToken}`
        },
      },
    });

    const data = await response;
    const cleanData = data.records.map(item => {

      let givenTime = item.fields["Time"];
      let dateObj = new Date(givenTime * 1000);
      let hours = dateObj.getUTCHours();
      let minutes = dateObj.getUTCMinutes();
      let seconds = dateObj.getSeconds();

      let timeString = isNaN(givenTime) ? "DNF" :
          hours.toString().padStart(2, "0") +
          ":" +
          minutes.toString().padStart(2, "0") +
          ":" +
          seconds.toString().padStart(2, "0");

      return {
        uuid: item.id,
        position: item.fields["Pos"],
        name: item.fields["Name"],
        year: item.fields["Year"],
        event_date: item.fields["Event Date"][0],
        time: timeString
      };
    });
    if (data.offset && data.offset != "") {
      return cleanData.concat(await getResults(data.offset));
    } else {
      return cleanData;
    }
  }

  const resources = await getResults("");

  return resources;

};
