function DecodeImageUrl(url) {
  if (!url) return "";

  try {
    // Remove any unwanted prefixes like "/https%3A"
    let correctedUrl = url.replace(/^\/https%3A/, "https:/");

    // Ensure there are two slashes after "https:"
    correctedUrl = correctedUrl.replace(/^https:\/([^/])/, "https://$1");

    // Decode URI components (fix %2F, %3A, etc.)
    correctedUrl = decodeURIComponent(correctedUrl);

    // If it doesn't start with "http", prepend "https://"
    if (!correctedUrl.startsWith("http")) {
      correctedUrl = "https://" + correctedUrl;
    }

    // Fix cases where "https:/" appears (missing a slash)
    correctedUrl = correctedUrl.replace(/https:\/([^/])/, "https://$1");

    return correctedUrl;
  } catch (error) {
    console.error("Failed to decode image URL:", error);
    return ""; // Return empty string or a fallback image
  }
}


export default DecodeImageUrl