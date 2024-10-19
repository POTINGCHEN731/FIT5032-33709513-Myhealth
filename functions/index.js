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
const PDFDocument = require("pdfkit");
const {Buffer} = require("buffer");

admin.initializeApp();
const db = admin.firestore();

sgMail.setApiKey(
    "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");

exports.sendEmail = onRequest(async (req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    const {toEmail, name, date, consultants} = req.body;
    if (!toEmail || !name || !date || !consultants) {
      return res.status(400).send("Recipient email, name, date, " +
        "and consultant information are required");
    }

    const emailText = `
      Hello,

      This is a reminder that your appointment is built.

      Here are the information for your booking:
      Name: ${name}
      Date: ${date}
      Doctor: ${consultants}

      Please attend the consult on time. We are glad to see you soon!

      Best regards,
      Myhealth
    `;

    const emailHtml = `
      <p>Hello,</p>
      <p>This is a reminder that your appointment is built.</p>
      <p>Here are the information for your booking:</p>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Date:</strong> ${date}</li>
        <li><strong>Doctor:</strong> ${consultants}</li>
      </ul>
      <p>Please attend the consult on time. We are glad to see you soon!</p>
      <p>Best regards,<br/>Myhealth</p>
    `;

    const doc = new PDFDocument();
    const buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", async () => {
      const pdfData = Buffer.concat(buffers);

      const msg = {
        to: toEmail,
        from: "myhealth0731@gmail.com",
        subject: "Thanks for booking an appointment!",
        text: emailText,
        html: emailHtml,
        attachments: [
          {
            content: pdfData.toString("base64"),
            filename: "appointment_details.pdf",
            type: "application/pdf",
            disposition: "attachment",
          },
        ],
      };

      try {
        await sgMail.send(msg);
        res.status(200).send("Email with PDF sent successfully!");
      } catch (error) {
        console.error(error);
        res.status(500).send("Failed to send email");
      }
    });

    doc.fontSize(16).text("Appointment Details", {align: "center"});
    doc.moveDown();
    doc.fontSize(12).text(`Name: ${name}`);
    doc.text(`Date: ${date}`);
    doc.text(`Doctor: ${consultants}`);
    doc.text("Please attend the consult on time.");
    doc.end();
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

exports.sendMultipleEmails = onRequest(async (req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    const {recipients} = req.body;
    if (!recipients || !recipients.length) {
      return res.status(400).send("Recipients are required");
    }

    const emailPromises = recipients.map((recipient) => {
      const {toEmail, name, date, consultants} = recipient;
      if (!toEmail || !name || !date || !consultants) {
        return Promise.reject(new Error("Recipient email, name, date," +
          "and consultant information are required"));
      }

      const emailText = `
        Hello,

        This is a reminder that your appointment is built.

        Here are the information for your booking:
        Name: ${name}
        Date: ${date}
        Doctor: ${consultants}

        Please attend the consult on time. We are glad to see you soon!

        Best regards,
        Myhealth
      `;

      const emailHtml = `
        <p>Hello,</p>
        <p>This is a reminder that your appointment is built.</p>
        <p>Here are the information for your booking:</p>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Doctor:</strong> ${consultants}</li>
        </ul>
        <p>Please attend the consult on time. We are glad to see you soon!</p>
        <p>Best regards,<br/>Myhealth</p>
      `;

      const doc = new PDFDocument();
      const buffers = [];
      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", async () => {
        const pdfData = Buffer.concat(buffers);

        const msg = {
          to: toEmail,
          from: "myhealth0731@gmail.com",
          subject: "Thanks for booking an appointment!",
          text: emailText,
          html: emailHtml,
          attachments: [
            {
              content: pdfData.toString("base64"),
              filename: "appointment_details.pdf",
              type: "application/pdf",
              disposition: "attachment",
            },
          ],
        };

        try {
          await sgMail.send(msg);
        } catch (error) {
          console.error(`Failed to send email to ${toEmail}:`, error);
          throw error;
        }
      });

      doc.fontSize(16).text("Appointment Details", {align: "center"});
      doc.moveDown();
      doc.fontSize(12).text(`Name: ${name}`);
      doc.text(`Date: ${date}`);
      doc.text(`Doctor: ${consultants}`);
      doc.text("Please attend the consult on time.");
      doc.end();

      return new Promise((resolve, reject) => {
        doc.on("end", resolve);
        doc.on("error", reject);
      });
    });

    try {
      await Promise.all(emailPromises);
      res.status(200).send("Emails with PDFs sent successfully!");
    } catch (error) {
      console.error("Error sending emails:", error);
      res.status(500).send("Failed to send some emails");
    }
  });
});

