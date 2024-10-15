/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const sgMail = require("@sendgrid/mail");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

admin.initializeApp();
const db = admin.firestore();

sgMail.setApiKey(
    "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");

exports.sendEmail = onRequest((req, res) => {
  const msg = {
    to: "terence07312000@gmail.com",
    from: "felix07312000@gmail.com",
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };

  sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
        res.status(200).send("Email sent successfully!");
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Failed to send email");
      });
});

exports.AverageRating = onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const newsId = parseInt(req.query.newsId, 10);
      const type = req.query.type;

      if (isNaN(newsId) || !type) {
        return res.status(400).send("Invalid newsId or missing type");
      }

      const q = db.collection(type).where("newsId", "==", newsId);
      const querySnapshot = await q.get();

      if (querySnapshot.empty) {
        return res.status(404).send("No ratings found for this newsId");
      }

      let totalRating = 0;
      let count = 0;

      querySnapshot.forEach((doc) => {
        const rating = doc.data().rating;
        if (typeof rating === "number" && !isNaN(rating)) {
          totalRating += rating;
          count++;
        }
      });

      const averageRating = count > 0 ? (totalRating / count) : 0;
      res.status(200).send(averageRating.toString());
    } catch (error) {
      console.error("Error calculating average rating:", error);
      res.status(500).send("Internal Server Error");
    }
  });
});


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
