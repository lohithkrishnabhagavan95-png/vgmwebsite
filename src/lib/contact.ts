// Single source of truth for how visitors reach VGM Group.
// whatsappNumber is in international format without "+" — wa.me requires that.
export const whatsappNumber = "919710343366";
export const phoneDisplay = "+91 97103 43366";
export const phoneHref = "tel:+919710343366";
export const email = "connect@vgmgroup.in";
export const careersEmail = "connect@vgmgroup.in";
export const location = "Hyderabad, India";

const whatsappGreeting = "Hi VGM Group, I'd like to know more about your services.";

export const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  whatsappGreeting,
)}`;
