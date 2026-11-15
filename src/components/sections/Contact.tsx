import { Mail, MessageCircle, Instagram } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ContactDataService, ContactChannel } from "../../services/ContactDataService";

const iconMap = { Mail, MessageCircle, Instagram };

const Contact = () => {
  const service = useMemo(() => new ContactDataService(), []);
  const [header, setHeader] = useState({ title: "", description: "" });
  const [channels, setChannels] = useState<ContactChannel[]>([]);

  useEffect(() => {
    Promise.all([service.getHeaderData(), service.getChannels()]).then(([h, c]) => {
      setHeader(h); setChannels(c);
    });
  }, [service]);

  return (
    <section id="contact" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">{header.title}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{header.description}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {channels.map((c) => {
            const Icon = iconMap[c.icon as keyof typeof iconMap] ?? Mail;
            return (
              <a key={c.id} href={c.href} target={c.href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer"
                className="group rounded-2xl border border-border bg-card p-8 text-center transition hover:-translate-y-1 hover:border-signal">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-signal/15 text-signal">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-1">{c.title}</h3>
                <p className="text-muted-foreground break-all">{c.label}</p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Contact;
