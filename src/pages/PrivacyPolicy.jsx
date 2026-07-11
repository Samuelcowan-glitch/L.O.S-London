import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-ink px-6 sm:px-10 py-16">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-primary-dark font-medium mb-10 hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
        <div className="flex items-center gap-2 mb-8">
          <img src={`${import.meta.env.BASE_URL}logo/los-mark.svg`} alt="" className="h-9 w-9" />
          <span className="font-display font-bold text-lg">L.O.S London</span>
        </div>
        <h1 className="font-display font-bold text-4xl sm:text-5xl tracking-tight mb-8">Privacy Policy</h1>
        <div className="space-y-6 text-muted leading-relaxed">
          <p>
            L.O.S London respects your privacy. This policy explains what personal
            information we collect through this website and how we use it.
          </p>
          <h2 className="font-display font-bold text-xl text-ink pt-4">What we collect</h2>
          <p>
            When you send an enquiry we collect your name, contact details, postcode and
            any photos or description of your garden you choose to share. We use this
            information solely to respond to your enquiry and, if you become a client,
            to deliver our services.
          </p>
          <h2 className="font-display font-bold text-xl text-ink pt-4">How we protect it</h2>
          <p>
            Your information is stored securely, is never sold, and is never shared with
            third parties for marketing. For high-profile households we are happy to put
            a non-disclosure agreement in place before any visit.
          </p>
          <h2 className="font-display font-bold text-xl text-ink pt-4">Your rights</h2>
          <p>
            Under UK GDPR you may request a copy of the personal data we hold about you,
            or ask us to correct or delete it, at any time by writing to
            hello@loslondon.co.uk.
          </p>
          <p className="pt-6 text-sm">Last updated: July 2026</p>
        </div>
      </div>
    </div>
  )
}
