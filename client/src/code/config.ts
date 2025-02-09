export const config: { serverAddress: string, userEmail: string } =
{
   serverAddress: process.env.REACT_APP_API_URL || "http://localhost:8080",
   userEmail: "user@domain.com"
};