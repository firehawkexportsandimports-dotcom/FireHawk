export const enquiryEmailTemplate = (enquiry: any) => `
  <div style="background:#f0ece4;padding:30px 0;font-family:Arial,Helvetica,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">

          <!-- MAIN CONTAINER -->
          <table width="600" cellpadding="0" cellspacing="0"
            style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10);border:1px solid #e5d9c8;">

            <!-- HEADER -->
            <tr>
              <td style="background:linear-gradient(135deg,#7c2d12 0%,#b45309 40%,#f59e0b 100%);padding:0;text-align:center;">
                <!-- Top accent line -->
                <div style="height:4px;background:linear-gradient(90deg,#fbbf24,#fff8e1,#fbbf24);"></div>
                <!-- Logo container with dark semi-transparent pill -->
                <div style="padding:28px 20px 20px;">
                  <div style="display:inline-block;background:rgba(0,0,0,0.28);border-radius:50px;padding:14px 36px;box-shadow:0 2px 16px rgba(0,0,0,0.25);border:1px solid rgba(255,255,255,0.12);">
                    <img 
                      src="https://res.cloudinary.com/ddmqz9gk0/image/upload/v1773163189/LOGO_1_veo5dy.png"
                      alt="Firehawk Imports &amp; Exports"
                      width="180"
                      style="display:block;margin:auto;filter:drop-shadow(0 2px 8px rgba(0,0,0,0.4));"
                    />
                  </div>
                </div>
                <!-- Badge -->
                <div style="padding:0 20px 22px;">
                  <span style="display:inline-block;background:rgba(251,191,36,0.18);border:1px solid rgba(251,191,36,0.4);border-radius:20px;padding:5px 18px;font-size:11px;letter-spacing:2px;color:#fde68a;font-family:Arial,sans-serif;text-transform:uppercase;">&#128228; New Enquiry Received</span>
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

                <h3 style="margin-top:0;color:#7c2d12;font-family:Arial,Helvetica,sans-serif;font-size:16px;text-transform:uppercase;letter-spacing:1.5px;border-bottom:1px solid #fde68a;padding-bottom:10px;">Customer Details</h3>

                <table width="100%" cellpadding="9" cellspacing="0"
                  style="border-collapse:collapse;font-size:14px;font-family:Arial,sans-serif;">
                  <tr style="background:#fafaf7;">
                    <td width="140" style="color:#888;border-bottom:1px solid #f0ece4;"><b>Name</b></td>
                    <td style="color:#222;border-bottom:1px solid #f0ece4;">${enquiry.name}</td>
                  </tr>
                  <tr>
                    <td style="color:#888;border-bottom:1px solid #f0ece4;"><b>Email</b></td>
                    <td style="color:#222;border-bottom:1px solid #f0ece4;">${enquiry.email}</td>
                  </tr>
                  ${enquiry.phone ? `
                  <tr style="background:#fafaf7;">
                    <td style="color:#888;border-bottom:1px solid #f0ece4;"><b>Phone</b></td>
                    <td style="color:#222;border-bottom:1px solid #f0ece4;">${enquiry.phone}</td>
                  </tr>` : ""}

                  ${enquiry.company ? `
                  <tr>
                    <td style="color:#888;border-bottom:1px solid #f0ece4;"><b>Company</b></td>
                    <td style="color:#222;border-bottom:1px solid #f0ece4;">${enquiry.company}</td>
                  </tr>` : ""}
                </table>

                <h3 style="margin-top:24px;color:#7c2d12;font-family:Arial,Helvetica,sans-serif;font-size:16px;text-transform:uppercase;letter-spacing:1.5px;border-bottom:1px solid #fde68a;padding-bottom:10px;">Enquiry Details</h3>

                <table width="100%" cellpadding="9" cellspacing="0"
                  style="border-collapse:collapse;font-size:14px;font-family:Arial,sans-serif;">
                  <tr style="background:#fafaf7;">
                    <td width="140" style="color:#888;border-bottom:1px solid #f0ece4;"><b>Type</b></td>
                    <td style="color:#222;text-transform:capitalize;border-bottom:1px solid #f0ece4;">${enquiry.type}</td>
                  </tr>

                  ${enquiry.product?.name ? `
                  <tr>
                    <td style="color:#888;border-bottom:1px solid #f0ece4;"><b>Product</b></td>
                    <td style="color:#222;border-bottom:1px solid #f0ece4;">${enquiry.product.name}</td>
                  </tr>` : ""}
                </table>

                <div style="margin-top:20px;padding:18px 20px;background:#fafaf7;border-radius:8px;border-left:4px solid #f59e0b;font-family:Arial,sans-serif;">
                  <b style="color:#7c2d12;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Message</b>
                  <p style="margin:10px 0 0;line-height:1.7;color:#555;font-size:14px;">
                    ${enquiry.message}
                  </p>
                </div>

              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td style="background:#1a0a00;color:#a07850;padding:18px 20px;font-size:12px;text-align:center;font-family:Arial,sans-serif;letter-spacing:1px;">
                Firehawk Imports &amp; Exports &nbsp;|&nbsp; Premium South Indian Spice Exporters
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>
  </div>
`;
