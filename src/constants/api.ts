/** @format */

// Set the API endpoint based on the hostname or IP address
let api = "https://api.medlifelink.life";
let url = "https://medlife-frontend-ten.vercel.app";

// Check if the current hostname is "localhost" for local development
if (document.location.hostname === "localhost") {
  api = "https://api.medlifelink.life"; // You can customize this for local API if needed
  url = "http://localhost:5174"; // Update the correct port for local frontend
} else if (
  document.location.hostname.startsWith("172") ||
  document.location.hostname.startsWith("192")
) {
  // Handle cases when the IP starts with "172" or "192" (local network IPs)
  api = `http://${document.location.hostname}:2020`; // Local network API
  url = `http://${document.location.hostname}:5174`; // Local network frontend (optional if needed)
}

export const ENDPOINT = api + "/api"; // Export the API endpoint
export const FRONTEND_URL = url; // Export the frontend URL
