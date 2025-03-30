import { Client, Account } from "appwrite";

const client = new Client();
client
  .setEndpoint("http://localhost/v1") // Use your server URL
  .setProject("your_project_id"); // Replace with your Appwrite project ID

const account = new Account(client);

export { client, account };
