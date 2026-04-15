import { interventionData } from '../../data/mockData';
import { Package, MapPin, Truck, CheckCircle } from 'lucide-react';

export default function PatientInterventions() {
  const delivery = interventionData.patient.upcomingDelivery;

  return (
    <div className="p-6 space-y-6">
      {/* Delivery Status Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-[#2D9596]/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Package className="w-6 h-6 text-[#2D9596]" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-[#5A6B7C] mb-1">On the way</p>
            <p className="text-xl font-semibold text-[#0A1128] mb-1">{delivery.item}</p>
            <div className="flex items-center gap-2 text-sm text-[#2D9596]">
              <MapPin className="w-4 h-4" />
              <span>Arriving {new Date(delivery.estimatedArrival).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            </div>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="space-y-4">
          {delivery.steps.map((step, index) => {
            const isCompleted = step.completed;
            const isLast = index === delivery.steps.length - 1;

            return (
              <div key={index} className="relative">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isCompleted
                        ? 'bg-[#6A994E] text-white'
                        : 'bg-[#E8EEF2] text-[#5A6B7C]'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : index === 1 ? (
                      <Truck className="w-5 h-5" />
                    ) : (
                      <div className="w-3 h-3 bg-current rounded-full" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p
                      className={`font-medium ${
                        isCompleted ? 'text-[#0A1128]' : 'text-[#5A6B7C]'
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>
                </div>
                {!isLast && (
                  <div
                    className={`absolute left-5 top-10 bottom-0 w-0.5 h-6 ${
                      isCompleted ? 'bg-[#6A994E]' : 'bg-[#E8EEF2]'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Why You're Getting This */}
      <div className="bg-gradient-to-br from-[#2D9596]/10 to-[#2D9596]/5 rounded-2xl p-6">
        <h3 className="text-lg text-[#0A1128] mb-3">Why You're Getting This</h3>
        <p className="text-[#5A6B7C] mb-4">
          Your current mask has been in use for over 60 days. Regular mask replacements ensure:
        </p>
        <ul className="space-y-2 text-sm text-[#5A6B7C]">
          <li className="flex items-start gap-2">
            <span className="text-[#2D9596]">✓</span>
            <span>Better seal and less air leakage</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#2D9596]">✓</span>
            <span>More comfortable fit</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#2D9596]">✓</span>
            <span>More effective therapy</span>
          </li>
        </ul>
      </div>

      {/* Contact Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg text-[#0A1128] mb-4">Need Help?</h3>
        <p className="text-sm text-[#5A6B7C] mb-4">
          Questions about your delivery or need to make changes?
        </p>
        <button className="w-full bg-[#2D9596] text-white px-6 py-3 rounded-xl hover:bg-[#247a7a] transition-colors font-medium">
          Contact My Technician
        </button>
      </div>
    </div>
  );
}
