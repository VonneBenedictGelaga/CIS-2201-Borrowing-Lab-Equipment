import { db } from '../../config/firebase.js';
import { doc, updateDoc } from 'firebase/firestore';

// Define the function to update the document status
async function updateDocumentStatus(documentId) {
  try {
    const requestRef = doc(db, 'Request', documentId);
    await updateDoc(requestRef, { status: 'verified' });
    console.log('Document status updated successfully.');
  } catch (error) {
    console.error('Error updating document status:', error);
  }
}

export const sendEmail = (recipientEmail, requestId) => {
  const emailSettings = {
    Host: 'smtp.elasticemail.com',
    Username: 'labborrowermodule@gmail.com',
    Password: '217B7E56638C825F4D389FA813E260FBB48D',
    To: recipientEmail,
    From: 'labborrowermodule@gmail.com',
    Subject: 'Verification Email',
    Body: 'If you are reading this then the request has been successfully verified!',
  };

  const script = document.createElement('script');
  script.src = 'https://smtpjs.com/v3/smtp.js';
  document.body.appendChild(script);

  script.onload = () => {
    window.Email.send(emailSettings)
      .then((message) => {
        console.log('Email sent successfully:', message);
        updateDocumentStatus(requestId);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  };
};
