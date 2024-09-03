/** @format */

let api =
  document.location.hostname == "localhost"
    ? "https://api.medlifelink.life"
    : "https://api.medlifelink.life";

if (document.location.hostname.startsWith("172")) {
  api = "http://" + document.location.hostname + ":2020";
} else if (document.location.hostname.startsWith("192")) {
  api = "http://" + document.location.hostname + ":2020";
}

export const ENDPOINT = "https://api.medlifelink.life";

export default api + "/api";
