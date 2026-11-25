import { useLanguage } from "@/i18n/LanguageProvider";
import { useEffect, useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";
import { ContactDataService, whatsappUrl } from "@/services/ContactDataService";

const WhatsAppBubble = () => {
  const { t } = useLanguage();
  const service = useMemo(() => new ContactDataService(), []);
  const [href, setHref] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => { service.getWhatsApp().then((w) => setHref(whatsappUrl(w))); }, [service]);

  useEffect(() => {
    const target = document.getElementById("contact");
    if (!target) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.2 });
    obs.observe(target);
    return () => obs.disconnect();
  }, []);

  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={t.whatsapp.aria}
      className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-signal text-signal-foreground shadow-lg transition-all duration-500 motion-reduce:transition-none hover:scale-110 ${
        visible ? "opacity-100 scale-100" : "pointer-events-none opacity-0 scale-75"}`}>
      <MessageCircle className="h-7 w-7" />
    </a>
  );
};

export default WhatsAppBubble;
