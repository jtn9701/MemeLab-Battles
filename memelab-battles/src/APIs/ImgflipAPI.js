import axios from "axios";

const IMGFLIP_URL = "https://api.imgflip.com/get_memes";

/**
 * Fetch memes from Imgflip and print/return the results on success.
 * @returns {Promise<Array|null>} Array of meme objects on success, or null on failure
 */
export async function get_imgflip_meme() {
  try {
    const response = await axios.get(IMGFLIP_URL);

    // axios responses contain the body at response.data
    if (response && response.data && response.data.success) {
      const memes = response.data.data.memes || [];
      console.log(
        "✓ Imgflip request succeeded. Retrieved",
        memes.length,
        "memes."
      );
      return memes;
    } else {
      console.error("✗ Imgflip request failed or returned success=false");
      console.error("Response data:", response && response.data);
      return null;
    }
  } catch (err) {
    console.error("✗ Error fetching Imgflip memes:", err.message);
    if (err.response) {
      console.error("Status:", err.response.status);
      console.error("Data:", err.response.data);
    }
    return null;
  }
}

// Optional runner when executed directly with node (works in CommonJS). Uncomment if needed.
// if (require && require.main === module) {
//   get_imgflip_meme();
// }
