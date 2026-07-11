import { MotionDiv } from "@/components/MotionWrapper";

export default function PrivacyPolicyPage() {
  return (
    <main className="pt-32 pb-24 px-5 md:px-16 max-w-4xl mx-auto">
      <MotionDiv>
        <h1 className="font-serif text-4xl md:text-5xl text-primary mb-8 tracking-tight">Privacy Policy</h1>
        
        <div className="space-y-8 font-sans text-secondary leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl text-foreground mb-4">1. Introduction</h2>
            <p>
              Welcome to Lumina Spa & Resort ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. 
              If you have any questions or concerns about our policy or our practices with regards to your personal information, please contact us at privacy@luminaspa.com.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground mb-4">2. Information We Collect</h2>
            <p className="mb-4">
              We collect personal information that you voluntarily provide to us when expressing an interest in obtaining information about us or our products and services, 
              when participating in activities on the Website (such as booking a reservation), or otherwise contacting us.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Personal Details:</strong> Name, email address, phone number, physical address.</li>
              <li><strong>Payment Information:</strong> Credit card details, billing address (processed securely via our payment providers).</li>
              <li><strong>Preferences:</strong> Room preferences, dietary requirements, spa treatment history.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground mb-4">3. How We Use Your Information</h2>
            <p className="mb-4">
              We use personal information collected via our Website for a variety of business purposes described below:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>To fulfill and manage your reservations and bookings.</li>
              <li>To send administrative information to you, such as reservation confirmations or policy changes.</li>
              <li>To personalize your experience during your stay.</li>
              <li>To send you marketing and promotional communications (if you have opted in).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground mb-4">4. Sharing Your Information</h2>
            <p>
              We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. 
              We do not sell or rent your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground mb-4">5. Security of Your Information</h2>
            <p>
              We use administrative, technical, and physical security measures to help protect your personal information. 
              While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
            </p>
          </section>
          
          <section>
            <h2 className="font-serif text-2xl text-foreground mb-4">6. Contact Us</h2>
            <p>
              If you have questions or comments about this policy, you may email us at privacy@luminaspa.com or by post to:
            </p>
            <address className="mt-4 not-italic">
              Lumina Spa & Resort<br />
              1 Serenity Way<br />
              Coastal Haven, CA 90210
            </address>
          </section>
        </div>
      </MotionDiv>
    </main>
  );
}
