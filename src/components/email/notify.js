export const notifyRequestRejection = (recipientEmail) => {
  const emailSettings = {
    Host: 'smtp.elasticemail.com',
    Username: 'labborrowermodule@gmail.com',
    Password: '217B7E56638C825F4D389FA813E260FBB48D',
    To: recipientEmail,
    From: 'labborrowermodule@gmail.com',
    Subject: 'Request Update: REJECTED',
    Body: 'This is an email to notify that your borrow request has been rejected.',
  };

  const script = document.createElement('script');
  script.src = 'https://smtpjs.com/v3/smtp.js';
  document.body.appendChild(script);

  script.onload = () => {
    window.Email.send(emailSettings)
      .then((message) => {
        console.log('Email sent successfully:', message);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  };
};

export const notifyRequestApproval = (recipientEmail) => {
  const emailSettings = {
    Host: 'smtp.elasticemail.com',
    Username: 'labborrowermodule@gmail.com',
    Password: '217B7E56638C825F4D389FA813E260FBB48D',
    To: recipientEmail,
    From: 'labborrowermodule@gmail.com',
    Subject: 'Request Update: APPROVED',
    Body: 'This is an email to notify that your borrow request has been approved. Please proceed to the DCISM Office to get the equipment you need to borrow.',
  };

  const script = document.createElement('script');
  script.src = 'https://smtpjs.com/v3/smtp.js';
  document.body.appendChild(script);

  script.onload = () => {
    window.Email.send(emailSettings)
      .then((message) => {
        console.log('Email sent successfully:', message);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  };
};