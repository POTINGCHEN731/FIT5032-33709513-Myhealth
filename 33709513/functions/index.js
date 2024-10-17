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

exports.sendEmail = onRequest(async (req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    const msg = {
      to: "terence07312000@gmail.com",
      from: "felix07312000@gmail.com",
      subject: "Sending with SendGrid is Fun",
      text: "and easy to do anywhere, even with Node.js",
      html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };

    try {
      await sgMail.send(msg);
      res.set("Access-Control-Allow-Origin", "*");
      res.status(200).send("Email sent successfully!");
    } catch (error) {
      console.error(error);
      res.status(500).send("Failed to send email");
    }
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

      const querySnapshot =
      await db.collection(type).where("newsId", "==", newsId).get();

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

      res.status(200).send(`Average rating: ${averageRating.toFixed(2)}`);
    } catch (error) {
      console.error("Error calculating average rating:", error);
      res.status(500).send("Failed to calculate average rating");
    }
  });
});


exports.getAllAppointments = onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const querySnapshot = await db.collection("Appointment").get();
      if (querySnapshot.empty) {
        return res.status(404).send("No appointments found");
      }

      const appointments = [];

      querySnapshot.forEach((doc) => {
        appointments.push({id: doc.id, ...doc.data()});
      });
      res.status(200).json({success: true, data: appointments});
    } catch (error) {
      console.error("Error fetching appointments:", error);
      res.status(500).send("Internal Server Error");
    }
  });
});

exports.deleteAppointment = onRequest(async (req, res) => {
  cors(req, res, async () => {
    const {id: appointmentId} = req.query;

    if (!appointmentId) {
      return res.status(400).json({
        success: false,
        message: "Missing appointment ID",
      });
    }

    try {
      const docRef = db.collection("Appointment").doc(appointmentId);
      const doc = await docRef.get();

      if (!doc.exists) {
        return res.status(404).json({
          success: false,
          message: `No document found with ID ${appointmentId}`,
        });
      }

      await docRef.delete();

      return res.status(200).json({
        success: true,
        message: `Document with ID ${appointmentId} has been deleted.`,
      });
    } catch (error) {
      console.error("Error deleting document:", error);
      return res.status(500).json({
        success: false,
        message: "Error deleting document",
        error: error.message,
      });
    }
  });
});

