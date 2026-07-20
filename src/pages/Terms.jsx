import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function Terms() {
  return (
    <div className="min-h-screen bg-background text-ink px-6 sm:px-10 py-16">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-primary-dark font-medium mb-10 hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
        <div className="flex items-center gap-2 mb-8">
          <img src={`${import.meta.env.BASE_URL}logo/da-icon.svg`} alt="" className="h-8 w-8" />
          <span className="font-display font-bold text-lg">Drummond Anderson</span>
        </div>
        <h1 className="font-display font-bold text-4xl sm:text-5xl tracking-tight mb-8">Terms of Service</h1>
        <div className="space-y-6 text-muted leading-relaxed">
          <h2 className="font-display font-bold text-xl text-ink pt-4">Quotations</h2>
          <p>
            All quotations are fixed and provided in writing after a site visit. A
            quotation remains valid for 60 days from the date of issue.
          </p>
          <h2 className="font-display font-bold text-xl text-ink pt-4">Work &amp; materials</h2>
          <p>
            All work is carried out by our own employed crews to the specification agreed
            in writing. Materials remain the property of Drummond Anderson Garden Design &amp; Maintenance until paid for
            in full. Living plants are guaranteed for one growing season when under our
            maintenance care.
          </p>
          <h2 className="font-display font-bold text-xl text-ink pt-4">Confidentiality</h2>
          <p>
            We treat every client's property, schedule and identity as confidential by
            default, whether or not a separate non-disclosure agreement is in place.
          </p>
          <h2 className="font-display font-bold text-xl text-ink pt-4">Cancellations</h2>
          <p>
            Scheduled maintenance visits may be rearranged with 48 hours' notice at no
            charge. Design and build projects follow the cancellation terms set out in
            the individual contract.
          </p>
          <p className="pt-6 text-sm">Last updated: July 2026</p>
        </div>
      </div>
    </div>
  )
}
