import axios from "axios";

const TENOR_URL = "https://g.tenor.com/v1/search?key=";

// function to call the seach endpoint
async function grab_data(search_term = "smile") {
  // set apikey and limit
  var apikey = "AIzaSyC7pCJGBOGYrAuwWH5n6kCWrtxE_fVlL8Ms";
  var limit = "3";

  const response = await axios.get(TENOR_URL + apikey, {
    params: {
      q: search_term,
      limit: limit,
      content_filter: "medium",
      media_filter: "minimal",
    },
  });

  // data will be loaded by each call's callback
  return response.data.results.map((gif) => gif.media_formats.gif.url);
}

export { grab_data };
