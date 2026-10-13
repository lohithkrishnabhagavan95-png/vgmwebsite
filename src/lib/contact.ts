// Single source of truth for how visitors reach VGM Group.
// whatsappNumber is in international format without "+" — wa.me requires that.
export const whatsappNumber = "916303203366";
export const phoneDisplay = "+91 63032 03366";
export const phoneHref = "tel:+916303203366";
export const email = "info@vgmgroup.in";
export const careersEmail = "info@vgmgroup.in";
export const location = "Visakhapatnam, India";

const whatsappGreeting = "Hi VGM Group, I'd like to know more about your services.";

export const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  whatsappGreeting,
)}`;
