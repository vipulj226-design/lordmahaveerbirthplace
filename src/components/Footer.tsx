export default function Footer() {
  return (
    <footer className="w-full bg-cream py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Designer Credit Section */}
        <div className="text-center space-y-6">
          {/* Designer Info */}
          <div className="space-y-3">
            <p className="text-foreground text-2xl font-paragraph font-bold bg-gold/20 py-2 px-4 rounded-lg inline-block mx-auto">
              WEBSITE DESIGNED & MANAGED BY
            </p>
            <h2 className="text-foreground text-2xl font-paragraph font-bold">
              VIPUL JAIN
            </h2>
            <p className="text-foreground text-2xl font-paragraph font-bold bg-gold/20 py-2 px-4 rounded-lg inline-block mx-auto">
              💬 WHATSAPP: 8470990283
            </p>
          </div>

          {/* Services Text */}
          <p className="text-foreground text-sm font-paragraph pt-4">
            Professional Design | Fast Delivery | Trusted Service | 24/7 Support
          </p>

          {/* Copyright */}
          <p className="text-foreground/70 text-xs font-paragraph pt-4">
            © {new Date().getFullYear()} All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
