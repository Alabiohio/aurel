import React, { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { FRAGRANCES } from '../../data/fragrances';
import { BlurText } from '../reactbits/BlurText';
import { FadeContent } from '../reactbits/FadeContent';

export function Footer() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState(FRAGRANCES[0].name);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <footer
      id="contact"
      className="border-t border-white/[0.12] bg-[#0D0D0B] text-[#F4F0E8]"
    >
      {/* Upper Concierge & Atelier Contact Band */}
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-20 md:py-28 border-b border-white/[0.12]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <p className="mb-3 text-xs font-medium tracking-[0.22em] uppercase text-[#B58A55]">
              03 · Atelier &amp; Private Concierge
            </p>
            <BlurText
              as="h2"
              text="Request a Private Olfactory Consultation"
              className="font-serif text-[clamp(2rem,3.4vw,3rem)] font-normal leading-[1.1] text-[#F4F0E8] text-balance"
            />
            <FadeContent delay={0.12}>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-[#A9A49A]">
                Book an intimate salon session at our Rue Saint-Honoré archive in
                Paris, or request bespoke sample dispatches delivered in amber
                glass vials.
              </p>
            </FadeContent>

            <FadeContent delay={0.2} className="mt-8">
              <div className="grid grid-cols-2 gap-6 border-t border-white/[0.1] pt-6 text-xs text-[#A9A49A]">
                <div>
                  <p className="uppercase tracking-[0.16em] text-[#F4F0E8]">
                    Paris Salon
                  </p>
                  <p className="mt-1.5 leading-relaxed">
                    14 Rue Saint-Honoré
                    <br />
                    75001 Paris, France
                  </p>
                </div>
                <div>
                  <p className="uppercase tracking-[0.16em] text-[#F4F0E8]">
                    Grasse Atelier
                  </p>
                  <p className="mt-1.5 leading-relaxed">
                    8 Traverse des Parfumeurs
                    <br />
                    06130 Grasse, France
                  </p>
                </div>
              </div>
            </FadeContent>
          </div>

          <FadeContent delay={0.12} className="lg:col-span-7">
            {submitted ? (
              <div className="border border-[#B58A55]/45 bg-[#151412] p-8 md:p-10">
                <div className="inline-flex h-10 w-10 items-center justify-center border border-[#B58A55] text-[#B58A55]">
                  <Check className="h-5 w-5 stroke-[1.5]" />
                </div>
                <h3 className="mt-5 font-serif text-2xl text-[#F4F0E8]">
                  Concierge Request Received
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#A9A49A]">
                  Thank you{name ? `, ${name}` : ''}. Our archivist will respond
                  to <span className="text-[#F4F0E8]">{email}</span> regarding{' '}
                  <span className="text-[#B58A55]">{interest}</span> within one
                  business day.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                  }}
                  className="mt-6 text-xs font-medium tracking-[0.16em] uppercase text-[#B58A55] hover:text-[#F4F0E8] transition-colors cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="border border-white/[0.12] bg-[#141310] rounded-xl p-6 md:p-9 space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-[11px] font-medium tracking-[0.18em] uppercase text-[#A9A49A]"
                    >
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Camille Laurent"
                      className="mt-2 w-full border-b border-white/[0.18] bg-transparent py-2.5 text-sm text-[#F4F0E8] placeholder:text-[#A9A49A]/45 focus:border-[#B58A55] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-[11px] font-medium tracking-[0.18em] uppercase text-[#A9A49A]"
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="camille@example.com"
                      className="mt-2 w-full border-b border-white/[0.18] bg-transparent py-2.5 text-sm text-[#F4F0E8] placeholder:text-[#A9A49A]/45 focus:border-[#B58A55] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-interest"
                    className="block text-[11px] font-medium tracking-[0.18em] uppercase text-[#A9A49A]"
                  >
                    Composition of Interest
                  </label>
                  <select
                    id="contact-interest"
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="mt-2 w-full border-b border-white/[0.18] bg-[#141310] py-2.5 text-sm text-[#F4F0E8] focus:border-[#B58A55] focus:outline-none transition-colors"
                  >
                    {FRAGRANCES.map((f) => (
                      <option key={f.id} value={f.name}>
                        {f.number} — {f.name} ({f.concentration})
                      </option>
                    ))}
                    <option value="Full Discovery Coffret">
                      Full Discovery Coffret (3 × 10 ml)
                    </option>
                  </select>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <p className="text-xs text-[#A9A49A]">
                    Complimentary sample vials accompany all private appointments.
                  </p>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#B58A55] bg-[#B58A55] px-7 py-3 text-xs font-medium tracking-[0.18em] uppercase text-[#11110F] hover:bg-[#c89b62] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Request Appointment</span>
                    <ArrowUpRight className="h-3.5 w-3.5 stroke-[1.75]" />
                  </button>
                </div>
              </form>
            )}
          </FadeContent>
        </div>
      </div>

      {/* Lower Brand, Navigation & Copyright Band */}
      <FadeContent className="mx-auto max-w-[1440px] px-5 md:px-10 py-12 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start md:items-center">
          <div className="md:col-span-4">
            <a
              href="#hero"
              className="font-serif text-2xl tracking-[0.28em] text-[#F4F0E8] hover:text-[#B58A55] transition-colors"
            >
              AUREL
            </a>
            <p className="mt-2 text-xs text-[#A9A49A]">
              Scent is a form of memory.
            </p>
          </div>

          <nav
            aria-label="Footer Navigation"
            className="md:col-span-4 flex flex-wrap items-center gap-6 md:justify-center text-xs tracking-[0.16em] uppercase text-[#A9A49A]"
          >
            <a href="#collection" className="hover:text-[#F4F0E8] transition-colors">
              Collection
            </a>
            <a href="#story" className="hover:text-[#F4F0E8] transition-colors">
              Our Story
            </a>
            <a href="#contact" className="hover:text-[#F4F0E8] transition-colors">
              Contact
            </a>
          </nav>

          <div className="md:col-span-4 flex flex-wrap items-center gap-6 md:justify-end text-xs tracking-[0.14em] uppercase text-[#A9A49A]">
            <a
              href="#contact"
              className="inline-flex items-center gap-1 hover:text-[#B58A55] transition-colors"
            >
              <span>Instagram</span>
              <ArrowUpRight className="h-3 w-3 stroke-[1.5]" />
            </a>
            <a
              href="#story"
              className="inline-flex items-center gap-1 hover:text-[#B58A55] transition-colors"
            >
              <span>Journal</span>
              <ArrowUpRight className="h-3 w-3 stroke-[1.5]" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-1 hover:text-[#B58A55] transition-colors"
            >
              <span>Concierge</span>
              <ArrowUpRight className="h-3 w-3 stroke-[1.5]" />
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/[0.08] pt-6 text-xs text-[#A9A49A]/80">
          <p>© 2026 AUREL Parfums. All rights reserved.</p>
          <p>Paris · Grasse · Amber Glass Archive</p>
        </div>
      </FadeContent>
    </footer>
  );
}
