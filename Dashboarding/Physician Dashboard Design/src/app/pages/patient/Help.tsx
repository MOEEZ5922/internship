import { Phone, MessageCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export default function PatientHelp() {
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportType, setReportType] = useState('');
  const [reportDetails, setReportDetails] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmitReport = () => {
    // Simulate report submission
    setShowConfirmation(true);
    setTimeout(() => {
      setShowReportForm(false);
      setShowConfirmation(false);
      setReportType('');
      setReportDetails('');
    }, 3000);
  };

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto pb-32">
      {/* Self-Reporting Tool - Prominent */}
      <div className="bg-gradient-to-br from-[#2D9596] to-[#1a7273] text-white rounded-3xl p-8 shadow-xl">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Report an Issue</h2>
            <p className="text-white/90 text-sm">
              Tell us about problems with your machine or equipment
            </p>
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-4 mb-6 border border-white/20">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-white/95">
              <p className="font-medium mb-1">Important:</p>
              <p>Your report will <span className="font-semibold">alert a technician</span> AND automatically <span className="font-semibold">update your profile</span> so we can help you faster.</p>
            </div>
          </div>
        </div>

        {!showReportForm ? (
          <button
            onClick={() => setShowReportForm(true)}
            className="w-full bg-white text-[#2D9596] py-4 rounded-xl font-semibold hover:bg-white/95 transition-all shadow-md text-lg"
          >
            Start Report
          </button>
        ) : (
          <div className="space-y-4">
            {!showConfirmation ? (
              <>
                <div>
                  <label className="block text-white/90 text-sm mb-2">What's the issue?</label>
                  <select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <option value="" className="text-gray-900">Select issue type...</option>
                    <option value="mask_leak" className="text-gray-900">Mask is leaking air</option>
                    <option value="mask_discomfort" className="text-gray-900">Mask feels uncomfortable</option>
                    <option value="machine_noise" className="text-gray-900">Machine making noise</option>
                    <option value="dry_nose" className="text-gray-900">Dry nose or throat</option>
                    <option value="pressure_issue" className="text-gray-900">Pressure feels wrong</option>
                    <option value="other" className="text-gray-900">Other issue</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/90 text-sm mb-2">Tell us more (optional)</label>
                  <textarea
                    value={reportDetails}
                    onChange={(e) => setReportDetails(e.target.value)}
                    placeholder="Describe what's happening..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowReportForm(false)}
                    className="flex-1 bg-white/20 text-white py-3 rounded-xl font-medium hover:bg-white/30 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitReport}
                    disabled={!reportType}
                    className="flex-1 bg-white text-[#2D9596] py-3 rounded-xl font-semibold hover:bg-white/95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Report
                  </button>
                </div>
              </>
            ) : (
              <div className="bg-white/20 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-[#6A994E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Report Sent!</h3>
                <p className="text-white/90">
                  A technician will contact you within 24 hours. Your profile has been updated.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick Call Button */}
      <button className="w-full bg-gradient-to-br from-[#6A994E] to-[#4a7a35] text-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all">
        <Phone className="w-12 h-12 mb-4 mx-auto" />
        <p className="text-2xl font-semibold mb-2">Call My Technician</p>
        <p className="text-white/90 text-sm mb-4">
          Talk to your equipment specialist about any issues
        </p>
        <div className="bg-white/20 px-6 py-3 rounded-xl inline-block">
          <p className="text-xl font-mono">1-800-555-CPAP</p>
        </div>
      </button>

      {/* Common Issues */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <h3 className="text-lg text-[#0A1128] mb-4">Common Questions</h3>
        <div className="space-y-4">
          <button className="w-full text-left p-4 bg-[#E8EEF2] rounded-xl hover:bg-[#d5dce3] transition-colors">
            <p className="text-[#0A1128] font-medium mb-1">My mask feels uncomfortable</p>
            <p className="text-sm text-[#5A6B7C]">Tips for better comfort →</p>
          </button>

          <button className="w-full text-left p-4 bg-[#E8EEF2] rounded-xl hover:bg-[#d5dce3] transition-colors">
            <p className="text-[#0A1128] font-medium mb-1">I hear air leaking</p>
            <p className="text-sm text-[#5A6B7C]">How to fix mask leaks →</p>
          </button>

          <button className="w-full text-left p-4 bg-[#E8EEF2] rounded-xl hover:bg-[#d5dce3] transition-colors">
            <p className="text-[#0A1128] font-medium mb-1">My nose feels dry</p>
            <p className="text-sm text-[#5A6B7C]">Humidifier settings help →</p>
          </button>

          <button className="w-full text-left p-4 bg-[#E8EEF2] rounded-xl hover:bg-[#d5dce3] transition-colors">
            <p className="text-[#0A1128] font-medium mb-1">How do I clean my equipment?</p>
            <p className="text-sm text-[#5A6B7C]">Cleaning guide →</p>
          </button>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-[#E76F51]/10 border-2 border-[#E76F51]/20 rounded-2xl p-6">
        <h4 className="text-[#0A1128] font-medium mb-2">Medical Emergency?</h4>
        <p className="text-sm text-[#5A6B7C] mb-4">
          For urgent medical concerns, please call 911 or visit your nearest emergency room. This
          app is for equipment and therapy support only.
        </p>
      </div>

      {/* Support Hours */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg text-[#0A1128] mb-4">Support Hours</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-[#5A6B7C]">Monday - Friday</span>
            <span className="text-[#0A1128] font-medium">8:00 AM - 8:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#5A6B7C]">Saturday</span>
            <span className="text-[#0A1128] font-medium">9:00 AM - 5:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#5A6B7C]">Sunday</span>
            <span className="text-[#0A1128] font-medium">Closed</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-[#E8EEF2]">
          <p className="text-xs text-[#5A6B7C]">
            For after-hours emergencies, leave a message and we'll call you back first thing in
            the morning.
          </p>
        </div>
      </div>
    </div>
  );
}