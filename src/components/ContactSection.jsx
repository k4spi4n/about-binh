import {
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import {
  Instagram,
  Facebook,
  Twitch,
  Twitter,
  Github,
} from "./BrandIcons";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Reveal } from "./motion/Reveal";
import { SectionTitle } from "./motion/SectionTitle";
import { AstralButton } from "./motion/AstralButton";

const EMAIL = "thaibinhakashi2@gmail.com";

const socials = [
  { icon: Github, href: "https://github.com/k4spi4n", label: "GitHub" },
  {
    icon: Facebook,
    href: "https://www.facebook.com/binh.thai.60194/",
    label: "Facebook",
  },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitch, href: "#", label: "Twitch" },
];

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // FormSubmit relays the form to this inbox, so the static site needs no
  // backend. The first message ever sent triggers an activation email to
  // EMAIL; nothing is delivered until that link is clicked.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setIsSubmitting(true);

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await res.json();
      if (!res.ok || String(data.success) !== "true") {
        throw new Error(data.message);
      }
      toast({
        title: "Đã gửi tin nhắn",
        description: "Cảm ơn bạn đã liên hệ. Tôi sẽ phản hồi sớm nhất có thể.",
      });
      form.reset();
    } catch {
      toast({
        title: "Chưa gửi được tin nhắn",
        description: `Vui lòng thử lại, hoặc email trực tiếp tới ${EMAIL}.`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section id="contact" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <SectionTitle lead="Sẵn Sàng" accent="Hợp Tác" className="mb-6" />

        <Reveal
          as="p"
          delay={0.3}
          className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          Cảm ơn bạn đã dành thời gian theo dõi hồ sơ của tôi. Nếu bạn đang tìm
          kiếm cộng sự cho dự án công nghệ hoặc có cơ hội hợp tác phù hợp, tôi
          luôn sẵn sàng trao đổi.
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Reveal className="space-y-8" delay={0.15}>
            <h3 className="text-2xl font-semibold mb-6"> Thông tin liên hệ</h3>

            <div className="space-y-6 justify-center">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />{" "}
                </div>
                <div>
                  <h4 className="font-medium"> Email</h4>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {EMAIL}
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Phone className="h-6 w-6 text-primary" />{" "}
                </div>
                <div>
                  <h4 className="font-medium"> Số điện thoại</h4>
                  <a
                    href="tel:+84904098225"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    0904098225
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />{" "}
                </div>
                <div>
                  <h4 className="font-medium"> Địa chỉ</h4>
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Hà Đông, Hà Nội, Việt Nam
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <h4 className="font-medium mb-4"> Kết nối với tôi </h4>
              <div className="flex space-x-4 justify-center">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-foreground/80 hover:text-primary hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 transition-[color,translate] duration-300"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal
            delay={0.3}
            className="bg-card p-8 rounded-lg shadow-xs"
          >
            <h3 className="text-2xl font-semibold mb-6">
              {" "}
              Gửi lời nhắn cho tôi{" "}
            </h3>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  {" "}
                  Tên của bạn
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-md border bg-background transition-[border-color,box-shadow] duration-300 focus:outline-hidden focus:border-primary/60 focus:ring-2 focus:ring-primary/40"
                  placeholder=""
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  {" "}
                  Email của bạn
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-md border bg-background transition-[border-color,box-shadow] duration-300 focus:outline-hidden focus:border-primary/60 focus:ring-2 focus:ring-primary/40"
                  placeholder=""
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  {" "}
                  Lời nhắn
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  className="w-full px-4 py-3 rounded-md border bg-background transition-[border-color,box-shadow] duration-300 focus:outline-hidden focus:border-primary/60 focus:ring-2 focus:ring-primary/40 resize-none"
                  placeholder="Xin chào, ..."
                />
              </div>

              <AstralButton
                as="button"
                type="submit"
                disabled={isSubmitting}
                className="w-full gap-2 px-6 py-2"
              >
                {isSubmitting ? "Đang gửi..." : "Gửi tin nhắn"}
                <Send size={16} />
              </AstralButton>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
