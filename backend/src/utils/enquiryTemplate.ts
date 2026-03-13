export const enquiryEmailTemplate = (enquiry: any) => `
<div style="background:#f5f1e8;padding:40px 0;font-family:Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center">

<table width="640" cellpadding="0" cellspacing="0"
style="background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e8dcc7;box-shadow:0 10px 40px rgba(0,0,0,0.08);">

<!-- HEADER -->
<tr>
<td style="background:linear-gradient(135deg,#7c2d12,#b45309,#f59e0b);text-align:center;padding:40px 20px;">

<img 
src="https://res.cloudinary.com/ddmqz9gk0/image/upload/v1773163189/LOGO_1_veo5dy.png"
width="190"
style="display:block;margin:auto;filter:drop-shadow(0 3px 12px rgba(0,0,0,0.35));"
/>

<p style="
margin-top:18px;
color:#fde68a;
letter-spacing:3px;
font-size:12px;
text-transform:uppercase;
font-family:Helvetica,Arial,sans-serif;
">
NEW WEBSITE ENQUIRY
</p>

</td>
</tr>

<!-- BODY -->
<tr>
<td style="padding:40px 40px 30px;">

<h2 style="
margin:0 0 25px;
font-family:Georgia,serif;
color:#7c2d12;
font-size:20px;
letter-spacing:1px;
">
Customer Details
</h2>

<table width="100%" cellpadding="10" cellspacing="0"
style="border-collapse:collapse;font-size:14px;">

<tr style="background:#faf8f3;">
<td width="150" style="color:#9a7a4b;"><b>Name</b></td>
<td style="color:#333;">${enquiry.name}</td>
</tr>

<tr>
<td style="color:#9a7a4b;"><b>Email</b></td>
<td style="color:#333;">${enquiry.email}</td>
</tr>

${enquiry.phone ? `
<tr style="background:#faf8f3;">
<td style="color:#9a7a4b;"><b>Phone</b></td>
<td style="color:#333;">${enquiry.phone}</td>
</tr>` : ""}

${enquiry.company ? `
<tr>
<td style="color:#9a7a4b;"><b>Company</b></td>
<td style="color:#333;">${enquiry.company}</td>
</tr>` : ""}

</table>

<h2 style="
margin:35px 0 20px;
font-family:Georgia,serif;
color:#7c2d12;
font-size:20px;
letter-spacing:1px;
">
Enquiry Details
</h2>

<table width="100%" cellpadding="10" cellspacing="0"
style="border-collapse:collapse;font-size:14px;">

<tr style="background:#faf8f3;">
<td width="150" style="color:#9a7a4b;"><b>Type</b></td>
<td style="color:#333;text-transform:capitalize;">${enquiry.type}</td>
</tr>

${enquiry.product?.name ? `
<tr>
<td style="color:#9a7a4b;"><b>Product</b></td>
<td style="color:#333;">${enquiry.product.name}</td>
</tr>` : ""}

</table>

<!-- MESSAGE BOX -->

<div style="
margin-top:30px;
background:#fbfaf6;
border-left:5px solid #f59e0b;
padding:20px 22px;
border-radius:6px;
">

<p style="
margin:0 0 10px;
font-size:12px;
letter-spacing:2px;
text-transform:uppercase;
color:#9a7a4b;
">
Customer Message
</p>

<p style="
margin:0;
font-size:15px;
line-height:1.7;
color:#444;
">
${enquiry.message}
</p>

</div>

</td>
</tr>

<!-- FOOTER -->

<tr>
<td style="
background:#1c0c02;
padding:22px;
text-align:center;
color:#c4a27a;
font-size:12px;
letter-spacing:1px;
">

<b style="color:#fbbf24;">Firehawk Imports & Exports</b><br>
Premium South Indian Spice Exporters

</td>
</tr>

</table>

</td>
</tr>
</table>
</div>
`;