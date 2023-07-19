export const noticeReturn = (recipientEmail) => {
  const emailSettings = {
    Host: 'smtp.elasticemail.com',
    Username: 'labborrowermodule@gmail.com',
    Password: '217B7E56638C825F4D389FA813E260FBB48D',
    To: recipientEmail,
    From: 'labborrowermodule@gmail.com',
    Subject: 'Request Return Notice',
    Body: 'This is an email to notify that your borrowed equipment needs to be returned in 24 hours.',
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

export const noticeMissing = (recipientEmail) => {
  const emailSettings = {
    Host: 'smtp.elasticemail.com',
    Username: 'labborrowermodule@gmail.com',
    Password: '217B7E56638C825F4D389FA813E260FBB48D',
    To: recipientEmail,
    From: 'labborrowermodule@gmail.com',
    Subject: 'Request Return Notice',
    Body: 'This is an email to notify that your borrowed equipment has not been returned for a day past its return date.',
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