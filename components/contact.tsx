'use client';

import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import ChatContactForm from './chat-contact-form';

export default function Contact() {
  const socials = [
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/Vasanth-Loganathan',
      color: 'hover:text-accent',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com/in/vasanthloganathan/',
      color: 'hover:text-accent',
    },
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:vasanthloganthan5657@gmail.com',
      color: 'hover:text-accent',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: 'https://x.com/vasanth_5556',
      color: 'hover:text-accent',
    },
  ];

  return (
    <section
      id="contact"
      className="py-20 px-6 bg-background/50"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-4">Let&apos;s Build Something Together</h2>
        <div className="w-16 h-1 bg-accent mb-12"></div>

        <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
          Whether you have a project in mind or just want to connect, I&apos;d love to hear from you. Drop me a message and let&apos;s explore what we can create together.
        </p>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Chat Contact Form */}
          <div className="md:col-span-2">
            <ChatContactForm />
          </div>

          {/* Social Links */}
          <div className="space-y-8">
            <div>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-6">
                Connect
              </p>
              <div className="space-y-4">
                {socials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className={`flex items-center gap-3 text-muted-foreground transition-colors ${social.color}`}
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm">{social.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                Email
              </p>
              <a
                href="mailto:vasanthloganthan5657@gmail.com"
                className="text-accent hover:text-accent/80 transition-colors break-all font-medium"
              >
                vasanthloganthan5657@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
