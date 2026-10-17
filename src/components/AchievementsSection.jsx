import { Trophy } from "lucide-react";
import { cscv2026 } from "../data/achievements";
import { Reveal } from "./motion/Reveal";
import { SectionTitle } from "./motion/SectionTitle";

const imageUrl = `${import.meta.env.BASE_URL}${cscv2026.image}`;

export const AchievementsSection = () => {
  return (
    <section id="achievements" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <SectionTitle lead="Thành Tích" accent="Thi Đấu" className="mb-6" />

        <Reveal
          as="p"
          delay={0.3}
          className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          CSCV 2026 là cuộc thi an ninh mạng theo thể thức Capture The Flag,
          nơi các đội giải các thử thách về khai thác lỗ hổng, dịch ngược, mật
          mã và điều tra số trong thời gian giới hạn.
        </Reveal>

        <div className="space-y-8">
          <Reveal delay={0.15}>
            <a
              href={imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-card rounded-lg overflow-hidden shadow-xs card-hover"
            >
              <img
                src={imageUrl}
                alt="Bảng xếp hạng vòng chung kết CSCV 2026, đội CMC.CBS xếp hạng 10"
                loading="lazy"
                width="1917"
                height="777"
                className="w-full h-auto"
              />
            </a>
            <p className="text-xs text-muted-foreground text-center mt-3">
              Bảng xếp hạng chung kết bảng B — CMC.CBS xếp hạng 10
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="gradient-border p-6 text-left grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-full bg-primary/10 shrink-0">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{cscv2026.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {cscv2026.team}
                    </p>
                  </div>
                </div>

                <dl className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 gap-4">
                  {cscv2026.stats.map((stat, i) => (
                    <div key={stat.label}>
                      <dt className="sr-only">{stat.label}</dt>
                      <dd
                        className={
                          i === 0
                            ? "text-2xl font-bold text-primary text-primary-glow"
                            : "text-2xl font-bold"
                        }
                      >
                        {stat.value}
                      </dd>
                      <dd className="text-sm text-muted-foreground">
                        {stat.label}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="md:border-l md:border-border md:pl-10 flex flex-col justify-center">
                <ul className="space-y-2 mb-6">
                  {cscv2026.milestones.map((m) => (
                    <li key={m.date} className="flex gap-3 text-sm">
                      <span className="text-primary font-medium shrink-0">
                        {m.date}
                      </span>
                      <span className="text-muted-foreground">{m.text}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {cscv2026.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
