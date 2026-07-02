import { Magnetic } from "@/components/ui/Magnetic";

function SocialIcon({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" aria-hidden>
      <path d={path} />
    </svg>
  );
}

const ICON_PATHS = {
  instagram:
    "M12 2.2c3.2 0 3.6 0 4.85.07 1.17.06 2.02.25 2.75.54.75.29 1.36.68 1.98 1.3.62.62 1 1.23 1.3 1.98.28.73.47 1.58.53 2.75.07 1.25.07 1.65.07 4.85s0 3.6-.07 4.85c-.06 1.17-.25 2.02-.53 2.75-.3.75-.68 1.36-1.3 1.98-.62.62-1.23 1-1.98 1.3-.73.28-1.58.47-2.75.53-1.25.07-1.65.07-4.85.07s-3.6 0-4.85-.07c-1.17-.06-2.02-.25-2.75-.53-.75-.3-1.36-.68-1.98-1.3-.62-.62-1-1.23-1.3-1.98-.28-.73-.47-1.58-.53-2.75C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.85c.06-1.17.25-2.02.53-2.75.3-.75.68-1.36 1.3-1.98.62-.62 1.23-1 1.98-1.3.73-.29 1.58-.48 2.75-.54C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.52 0-4.76.07-.96.04-1.48.2-1.83.34-.46.18-.79.39-1.13.74-.35.34-.56.67-.74 1.13-.14.35-.3.87-.34 1.83C3.13 9.15 3.13 9.52 3.13 12s0 2.85.07 4.09c.04.96.2 1.48.34 1.83.18.46.39.79.74 1.13.34.35.67.56 1.13.74.35.14.87.3 1.83.34 1.24.07 1.61.07 4.76.07s3.52 0 4.76-.07c.96-.04 1.48-.2 1.83-.34.46-.18.79-.39 1.13-.74.35-.34.56-.67.74-1.13.14-.35.3-.87.34-1.83.07-1.24.07-1.61.07-4.09s0-2.85-.07-4.09c-.04-.96-.2-1.48-.34-1.83-.18-.46-.39-.79-.74-1.13a3.06 3.06 0 0 0-1.13-.74c-.35-.14-.87-.3-1.83-.34C15.52 4 15.15 4 12 4zm0 3.4a4.6 4.6 0 1 1 0 9.2 4.6 4.6 0 0 1 0-9.2zm0 1.8a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6zm5.85-1.98a1.08 1.08 0 1 1-2.15 0 1.08 1.08 0 0 1 2.15 0z",
  linkedin:
    "M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM3.2 8.5h3.5V21H3.2V8.5zm6.3 0h3.35v1.7h.05c.47-.88 1.6-1.8 3.3-1.8 3.53 0 4.18 2.32 4.18 5.34V21h-3.5v-6.34c0-1.5-.03-3.44-2.1-3.44-2.1 0-2.42 1.64-2.42 3.33V21H9.5V8.5z",
  facebook:
    "M13.5 21v-7.9h2.65l.4-3.08h-3.05V8.05c0-.89.25-1.5 1.53-1.5h1.63V3.8C15.9 3.72 15 3.65 13.96 3.65c-2.35 0-3.96 1.43-3.96 4.06v2.27H7.3v3.08h2.7V21h3.5z",
};

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="group relative inline-block text-bone/60 transition-colors hover:text-bone">
      {children}
      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
    </a>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-gold/20 bg-ink px-6 pb-10 pt-16 md:px-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl tracking-[0.1em] text-bone">
              MAA SATTI <span className="text-gold">JEWELS</span>
            </p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-bone/60">
              A B2B manufacturing atelier in Jaipur, forging Polki, diamond, and
              real-gold jewellery for retailers and brands since 2003.
            </p>
            <div className="mt-6 flex gap-4 text-bone/50">
              {[
                { href: "https://www.instagram.com/maasattijewels/", label: "Instagram", path: ICON_PATHS.instagram },
                { href: "https://www.linkedin.com/company/maa-satti-jewels-pvt-ltd/", label: "LinkedIn", path: ICON_PATHS.linkedin },
                { href: "https://www.facebook.com/maasattijewels7", label: "Facebook", path: ICON_PATHS.facebook },
              ].map((social) => (
                <Magnetic key={social.label} strength={0.6}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="block transition hover:text-gold"
                  >
                    <SocialIcon path={social.path} />
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gold">Studio</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li><FooterLink href="#heritage">Heritage</FooterLink></li>
              <li><FooterLink href="#craft">Craftsmanship</FooterLink></li>
              <li><FooterLink href="#team">Leadership</FooterLink></li>
              <li><FooterLink href="#collection">Collection</FooterLink></li>
              <li><FooterLink href="#faq">FAQ</FooterLink></li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gold">Categories</p>
            <ul className="mt-5 space-y-3 text-sm text-bone/60">
              <li>Necklaces</li>
              <li>Earrings</li>
              <li>Bangles</li>
              <li>Bridal Sets</li>
            </ul>
          </div>

          <div id="contact">
            <p className="text-xs uppercase tracking-[0.25em] text-gold">Visit the Atelier</p>
            <ul className="mt-5 space-y-3 text-sm text-bone/60">
              <li>F-60, EPIP, Sitapura,<br />Jaipur, Rajasthan 302022</li>
              <li><FooterLink href="mailto:maasattijewels@gmail.com">maasattijewels@gmail.com</FooterLink></li>
              <li><FooterLink href="tel:+911414517725">+91 141 451 7725</FooterLink></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-gold/10 pt-6 text-xs text-bone/40 md:flex-row">
          <p>© {new Date().getFullYear()} Maa Satti Jewels Pvt. Ltd. All rights reserved.</p>
          <p>Concept redesign by Blueblood Studio</p>
        </div>
      </div>

      <p
        aria-hidden
        className="pointer-events-none mt-10 select-none text-center font-display text-[16vw] leading-none tracking-tighter text-bone/[0.04] md:text-[9vw]"
      >
        MAA SATTI JEWELS
      </p>
    </footer>
  );
}
