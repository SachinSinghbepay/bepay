import Link from "next/link";
import MaxWidthWrapper from "./max-width-wrapper";
import { Calendar, Mail, Phone, Send } from "lucide-react";
import { IconBrandX } from "@tabler/icons-react";

const Footer = () => {
  const contactInfo = [
    {
      icon: <Mail size={24} className="text-black" />,
      text: "partner@investdigitalassetsforum.com",
      href: "mailto:partner@investdigitalassetsforum.com",
    },
    {
      icon: <Send size={24} className="text-black" />,
      text: "@omikadubey",
      href: "https://t.me/omikadubey",
    },
    {
      icon: <Phone size={24} className="text-black" />,
      text: <><span className="font-inter">+91 74899 76927</span></>,
      href: "tel:+917489976927",
    },
    {
      icon: <Calendar size={24} className="text-black" />,
      text: "BOOK A CALL",
      href: "https://calendly.com/omika-giakaacapital/invests-digital-assets-forum-intro-meet",
    },
  ];

  const socialLinks = [
    {
      name: "Telegram",
      icon: <Send size={24} className="text-white lg:w-[40px] lg:h-[40px]" />,
      href: "https://t.me/omikadubey",
    },
    {
      name: "LinkedIn",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white lg:w-[40px] lg:h-[40px]"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      ),
      href: "https://www.linkedin.com/company/investdigitalassets/",
    },
    {
      name: "Twitter",
      icon: (
        <IconBrandX size={24} className="text-white lg:w-[40px] lg:h-[40px]" />
      ),
      href: "https://x.com/Investdigital7?t=H-FttbswTUAbFvLZ--GiVw&s=09",
    },
  ];

  return (
    <footer className="bg-black mt-20 py-12 md:py-16">
      <MaxWidthWrapper>
        <div className="flex flex-col md:flex-row justify-between">
          {/* Contact Section */}
          <div className="mb-10 md:mb-0">
            <h3 className="text-white text-2xl md:text-3xl lg:text-6xl font-bold mb-6">
              CONTACT
            </h3>
            <div className="space-y-4 grid-cols-1 grid gap-3 lg:gap-8 md:grid-cols-2">
              {contactInfo.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  target="_blank"
                  className="flex items-center gap-4 hover:opacity-80 transition-opacity"
                >
                  <div className=" p-2 w-10 bg-white h-10 flex items-center justify-center">
                    <div className="text-black">{item.icon}</div>
                  </div>
                  <span className="text-white lg:text-2xl font-bold text-lg">{item.text}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-white whitespace-nowrap text-2xl md:text-3xl lg:text-6xl font-bold mb-6">
              SOCIAL MEDIA
            </h3>
            <div className="flex items-center space-x-6">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  aria-label={social.name}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
