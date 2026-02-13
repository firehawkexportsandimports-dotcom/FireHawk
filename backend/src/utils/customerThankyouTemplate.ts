export const customerThankyouTemplate = (enquiry: any) => `
<div style="background:#f5f5f5;padding:30px 0;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">

        <table width="600" cellpadding="0" cellspacing="0"
          style="background:#ffffff;border-radius:10px;overflow:hidden;border:1px solid #eee;">

          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(90deg,#b45309,#f59e0b);padding:20px;text-align:center;">
              <img 
                src="https://res.cloudinary.com/dxziofxst/image/upload/v1770913924/Frame_1597882146_nckozm.png"
                width="160"
                style="display:block;margin:auto;"
              />
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding:25px;">
              <h2 style="margin-top:0;color:#111;">
                Thank You for Contacting Us
              </h2>

              <p style="color:#444;line-height:1.6;">
                Dear ${enquiry.name},
              </p>

              <p style="color:#444;line-height:1.6;">
                Thank you for reaching out to <b>Firehawk Imports & Exports</b>.
                We have received your enquiry successfully.
              </p>

              <p style="color:#444;line-height:1.6;">
                Our export team will review your request and respond within
                <b>24 hours</b>.
              </p>

              <div style="margin-top:20px;padding:15px;background:#fafafa;border-radius:6px;">
                <b>Your Message</b>
                <p style="margin:8px 0 0;">
                  ${enquiry.message}
                </p>
              </div>

              <p style="margin-top:25px;color:#444;">
                Regards,<br/>
                <b>Firehawk Imports & Exports Team</b>
              </p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#111;color:#bbb;padding:15px;font-size:12px;text-align:center;">
              Premium South Indian Spice Exporters
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</div>
`;
