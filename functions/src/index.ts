import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const shopifyOrderWebhook = functions.https.onRequest(
  async (req, res) => {
    const webhook = req.body;

    // Create a reference to the Firestore "orders" collection
    const ordersCollection = admin.firestore().collection("orders");

    try {
      // Set the document name to webhook.name when creating the document
      await ordersCollection.doc(webhook.name).set(webhook);
      // Respond with a success status
      res.status(200).send("Webhook data saved successfully");
    } catch (error) {
      // Handle any errors that occur during the process
      console.error("Error saving webhook data:", error);
      res.status(500).send("Error saving webhook data");
    }
  }
);

export const shopifyProductWebhook = functions.https.onRequest(
  async (req, res) => {
    const webhook = req.body;
    // Create a reference to the Firestore "products" collection
    const productCollection = admin.firestore().collection("products");

    try {
      // Set the document name to webhook.name when creating the document
      await productCollection.doc(webhook.id.toString()).set(webhook);
      // Respond with a success status
      res.status(200).send("Webhook data saved successfully");
    } catch (error) {
      // Handle any errors that occur during the process
      console.error("Error saving webhook data:", error);
      res.status(500).send("Error saving webhook data");
    }
  }
);

// import twilio from "twilio";
// const accountSid = "ACd5a134fd46c7ab11506aa4109c9d4ea2";
// const authToken = "6eed0b86c45623840f6d79167999a118";

// const client = twilio(accountSid, authToken);

// const name = webhook.customer.first_name + " " + webhook.customer.last_name;

// await client.messages.create({
//   body: `💲💲 ${name} placed and order for $${webhook.total_price} 💲💲`,
//   from: "+18447352798",
//   to: "+17206482708",
// });
