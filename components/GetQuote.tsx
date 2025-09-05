import QuoteForm from "../components/QuoteForm";

export default function GetQuote() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Request a Quote
            </h1>
            <p className="text-lg text-slate-600">
              Fill out the form below and we'll get back to you with a detailed
              quote for your project.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8">
            <QuoteForm />
          </div>
        </div>
      </div>
    </div>
  );
}
