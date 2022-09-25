const sendEmail = require("./sendEmail");

const sendNewPassword = async (email, password) => {
  const msg = {
    to: email,
    subject: "New password from Phonebook-app",
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
               Phonebook app welcomes you
            </p>
            <div style="height: 20px; line-height: 20px; font-size: 20px">
              &nbsp;
            </div>
            <p style="font-size: 16px; margin: 0; display: block">
              Your new password: <b>${password}</b>
            </p>
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
};

module.exports = sendNewPassword;
