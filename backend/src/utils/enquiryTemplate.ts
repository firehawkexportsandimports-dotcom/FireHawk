export const enquiryEmailTemplate = (enquiry: any) => `
  <div style="background:#f5f5f5;padding:30px 0;font-family:Arial,Helvetica,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">

          <!-- MAIN CONTAINER -->
          <table width="600" cellpadding="0" cellspacing="0"
            style="background:#ffffff;border-radius:10px;overflow:hidden;border:1px solid #eee;">

            <!-- HEADER -->
            <tr>
              <td style="background:linear-gradient(90deg,#b45309,#f59e0b);padding:20px;color:#ffffff;">
                <tr>
                <td style="background:linear-gradient(90deg,#b45309,#f59e0b);padding:20px;text-align:center;">

                    <img 
                    src="https://res.cloudinary.com/ddmqz9gk0/image/upload/v1773163189/LOGO_1_veo5dy.png"
                    alt="Firehawk Imports & Exports"
                    width="160"
                    style="display:block;margin:auto;"
                    />

                    <p style="margin:10px 0 0;font-size:13px;color:#ffffff;opacity:0.9;">
                    New Enquiry Received
                    </p>

                </td>
                </tr>
                <p style="margin:5px 0 0;font-size:13px;opacity:0.9;">
                  New Enquiry Received
                </p>
              </td>
            </tr>

            <!-- BODY -->
            <tr>
              <td style="padding:25px;">

                <h3 style="margin-top:0;color:#111;">Customer Details</h3>

                <table width="100%" cellpadding="8" cellspacing="0"
                  style="border-collapse:collapse;font-size:14px;">
                  <tr>
                    <td width="140" style="color:#666;"><b>Name</b></td>
                    <td>${enquiry.name}</td>
                  </tr>
                  <tr>
                    <td style="color:#666;"><b>Email</b></td>
                    <td>${enquiry.email}</td>
                  </tr>
                  ${enquiry.phone ? `
                  <tr>
                    <td style="color:#666;"><b>Phone</b></td>
                    <td>${enquiry.phone}</td>
                  </tr>` : ""}

                  ${enquiry.company ? `
                  <tr>
                    <td style="color:#666;"><b>Company</b></td>
                    <td>${enquiry.company}</td>
                  </tr>` : ""}
                </table>

                <hr style="border:none;border-top:1px solid #eee;margin:20px 0;" />

                <h3 style="margin-top:0;color:#111;">Enquiry Details</h3>

                <table width="100%" cellpadding="8" cellspacing="0"
                  style="border-collapse:collapse;font-size:14px;">
                  <tr>
                    <td width="140" style="color:#666;"><b>Type</b></td>
                    <td style="text-transform:capitalize;">${enquiry.type}</td>
                  </tr>

                  ${enquiry.product?.name ? `
                  <tr>
                    <td style="color:#666;"><b>Product</b></td>
                    <td>${enquiry.product.name}</td>
                  </tr>` : ""}
                </table>

                <div style="margin-top:15px;padding:15px;background:#fafafa;border-radius:6px;">
                  <b>Message</b>
                  <p style="margin:8px 0 0;line-height:1.6;">
                    ${enquiry.message}
                  </p>
                </div>

              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td style="background:#111;color:#bbb;padding:15px;font-size:12px;text-align:center;">
                Firehawk Imports & Exports<br/>
                Premium South Indian Spice Exporters
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>
  </div>
`;
