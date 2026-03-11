export const customerThankyouTemplate = (enquiry: any) => `
<div style="background:#f0ece4;padding:30px 0;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">

        <table width="600" cellpadding="0" cellspacing="0"
          style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10);border:1px solid #e5d9c8;">

          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,#7c2d12 0%,#b45309 40%,#f59e0b 100%);padding:0;text-align:center;">
              <!-- Top accent line -->
              <div style="height:4px;background:linear-gradient(90deg,#fbbf24,#fff8e1,#fbbf24);"></div>
              <!-- Logo container with dark semi-transparent pill -->
              <div style="padding:28px 20px 24px;">
                <div style="display:inline-block;background:rgba(0,0,0,0.28);border-radius:50px;padding:14px 36px;box-shadow:0 2px 16px rgba(0,0,0,0.25);border:1px solid rgba(255,255,255,0.12);">
                  <img 
                    src="https://res.cloudinary.com/ddmqz9gk0/image/upload/v1773163189/LOGO_1_veo5dy.png"
                    alt="Firehawk Imports & Exports"
                    width="180"
                    style="display:block;margin:auto;filter:drop-shadow(0 2px 8px rgba(0,0,0,0.4));"
                  />
                </div>
              </div>
              <!-- Tagline -->
              <div style="padding:0 20px 20px;">
                <span style="display:inline-block;background:rgba(251,191,36,0.18);border:1px solid rgba(251,191,36,0.4);border-radius:20px;padding:5px 18px;font-size:11px;letter-spacing:2px;color:#fde68a;font-family:Arial,sans-serif;text-transform:uppercase;">Premium South Indian Spice Exporters</span>
              </div>
            </td>
          </tr>

          <!-- GOLD DIVIDER -->
          <tr>
            <td style="height:3px;background:linear-gradient(90deg,#b45309,#fbbf24,#b45309);"></td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding:32px 30px 28px;">
              <h2 style="margin-top:0;color:#7c2d12;font-family:Arial,Helvetica,sans-serif;font-size:22px;border-bottom:2px solid #fde68a;padding-bottom:12px;">
                Thank You for Contacting Us
              </h2>

              <p style="color:#444;line-height:1.7;font-size:15px;">
                Dear <b>${enquiry.name}</b>,
              </p>

              <p style="color:#444;line-height:1.7;font-size:15px;">
                Thank you for reaching out to <b style="color:#b45309;">Firehawk Imports &amp; Exports</b>.
                We have received your enquiry successfully.
              </p>

              <p style="color:#444;line-height:1.7;font-size:15px;">
                Our export team will review your request and respond within
                <b style="color:#b45309;">24 hours</b>.
              </p>

              <div style="margin-top:22px;padding:18px 20px;background:#fafaf7;border-radius:8px;border-left:4px solid #f59e0b;">
                <b style="color:#7c2d12;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Your Message</b>
                <p style="margin:10px 0 0;color:#555;line-height:1.7;font-size:14px;">
                  ${enquiry.message}
                </p>
              </div>

              <p style="margin-top:28px;color:#444;font-size:15px;line-height:1.7;">
                Warm regards,<br/>
                <b style="color:#b45309;">Firehawk Imports &amp; Exports Team</b>
              </p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#1a0a00;color:#a07850;padding:18px 20px;font-size:12px;text-align:center;font-family:Arial,sans-serif;letter-spacing:1px;">
              &copy; Firehawk Imports &amp; Exports &nbsp;|&nbsp; Premium South Indian Spice Exporters
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</div>
`;