const { v4: uuid } = require("uuid");
const sendEmail = require("./sendEmail");

const sendVerifyEmail = async (email, verificationToken = uuid()) => {
  const { BASE_URL } = process.env;
  const msg = {
    to: email,
    subject: "Confirm email from Phonebook-app",
    html: `
<table
  cellpadding="0"
  cellspacing="0"
  border="0"
  width="100%"
  style="
    background: #f5f5f5;
    min-width: 320px;
    font-size: 1px;
    line-height: normal;
  "
>
  <tr>
    <td align="center" valign="top">
      <table
        cellpadding="0"
        cellspacing="0"
        border="0"
        width="650"
        class="table650"
        style="max-width: 650px; min-width: 320px; background: #ffffff"
      >
        <tr>
          <td width="30" style="width: 30px; max-width: 30px; min-width: 30px">
            &nbsp;
          </td>
          <td align="center" valign="top">
            <div style="height: 20px; line-height: 20px; font-size: 20px">
              &nbsp;
            </div>
            <p
              style="
                font-size: 24px;
                font-weight: 700;
                margin: 0;
                display: block;
                color: #2c32d4;
              "
            >
              Hello, ${email}
            </p>
            <div style="height: 20px; line-height: 20px; font-size: 20px">
              &nbsp;
            </div>
            <p
              style="
                font-size: 24px;
                font-weight: 700;
                margin: 0;
                display: block;
                color: #2c32d4;
              "
            >
              Welcome to Phonebook app
            </p>
            <div style="height: 20px; line-height: 20px; font-size: 20px">
              &nbsp;
            </div>
            <p style="font-size: 16px; margin: 0; display: block">
              Click the button to confirm your email address to get started on
              Phonebook
            </p>
            <div style="height: 20px; line-height: 20px; font-size: 20px">
              &nbsp;
            </div>
            <a
              style="
                text-decoration: none;
                text-transform: uppercase;
                font-size: 16px;
                padding: 20px;
                width: 150px;
                display: block;
                color: #f7f8fc;
                background-color: #2c32d4;
                border-radius: 5px;
              "
              href="${BASE_URL}/users/verify/${verificationToken}"
              target="_blank"
            >
              Click here
            </a>
            <div style="height: 20px; line-height: 20px; font-size: 20px">
              &nbsp;
            </div>
                        <p style="font-size: 12px; margin: 0; display: block">
              If you didn’t request this email, there’s nothing to worry about —
              you can safely ignore it.
            </p>
            <div style="height: 5px; line-height: 5px; font-size: 5px">
              &nbsp;
            </div>
            <p style="font-size: 12px; margin: 0; display: block">
              Note: This is an automated response, so please do not reply to
              this email.
            </p>
            <div style="height: 20px; line-height: 20px; font-size: 20px">
              &nbsp;
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
`,
  };
  await sendEmail(msg);
  return verificationToken;
};

module.exports = sendVerifyEmail;
