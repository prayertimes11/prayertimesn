import axios from "axios";

export async function getAzanTimes(address: string) {
  const res = await axios.get(
    `https://api.aladhan.com/v1/timingsByAddress?address=${address}`
  );

  if (!res.data) {
    throw new Error("Failed to fetch data");
  }

  return res.data;
}

export async function getTime() {
  const res = await axios.get(
    `http://api.timezonedb.com/v2.1/get-time-zone?key=${process.env.API_KEY}&format=xml&by=zone&zone=America/Chicago`
  );

  if (!res.data) {
    throw new Error("Failed to fetch data");
  }

  return res.data;
}
