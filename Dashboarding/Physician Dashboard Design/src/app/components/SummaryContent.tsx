import { Link } from 'react-router';
import { 
  aiWeeklyState, 
  cpapData, 
  biomarkerData, 
  patientInfo 
} from '../data/mockData';
import { 
  AlertTriangle, 
  CheckCircle, 
  Activity, 
  Calendar, 
  Clock, 
  ArrowRight,
  TrendingUp,
  Brain,
  ShieldCheck,
  ClipboardList
} from 'lucide-react';

interface SummaryContentProps {
  patientId?: string;
  isCompact?: boolean;
}

export default function SummaryContent({ patientId, isCompact = false }: SummaryContentProps) {
  const ai = aiWeeklyState; // In a real app, this would be fetched by patientId
  
  return (
    <div className={`space-y-6 ${isCompact ? 'p-0' : 'p-8 max-w-6xl mx-auto'}`}>
      {/* 2-Minute Decision Header */}
      <div className={`bg-[#0A1128] text-white rounded-2xl p-6 shadow-xl border-l-8 border-[#E76F51] ${isCompact ? 'p-5' : ''}`}>
        <div className="flex justify-between items-start">
          <div className="flex gap-4">
            <div className="bg-[#E76F51]/20 p-2 rounded-xl h-fit">
              <AlertTriangle className={`${isCompact ? 'w-6 h-6' : 'w-8 h-8'} text-[#E76F51]`} />
            </div>
            <div>
              <h2 className={`${isCompact ? 'text-lg' : 'text-xl'} font-bold mb-1`}>Clinical Exception: {ai.nextBestAction.type}</h2>
              <p className="text-white/70 text-sm max-w-2xl leading-relaxed">
                {ai.nextBestAction.rationale}
              </p>
            </div>
          </div>
          {!isCompact && (
            <div className="text-right whitespace-nowrap">
              <div className="bg-white/10 px-3 py-1 rounded-lg text-xs font-semibold mb-2">
                ESCALATED {ai.weekOf}
              </div>
              <div className="text-2xl font-bold text-[#E76F51]">Risk: {ai.compositeRiskScore}</div>
            </div>
          )}
        </div>
      </div>

      <div className={`grid ${isCompact ? 'grid-cols-1' : 'lg:grid-cols-3'} gap-6`}>
        {/* Left Column Section */}
        <div className={`${isCompact ? 'space-y-4' : 'lg:col-span-2 space-y-6'}`}>
          
          {/* Key Vitals Grid */}
          <div className={`grid ${isCompact ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-3'} gap-4`}>
            <div className="bg-white rounded-xl p-4 border border-[#E8EEF2] shadow-sm">
              <p className="text-[10px] text-[#5A6B7C] uppercase font-bold tracking-widest mb-1">Avg Usage</p>
              <div className="flex items-end gap-1">
                <span className="text-2xl font-bold text-[#0A1128]">{cpapData.averageHours}</span>
                <span className="text-[10px] text-[#5A6B7C] pb-1">hrs/night</span>
              </div>
              <div className="mt-2 flex items-center gap-1 text-[10px] text-[#E76F51] font-semibold">
                <TrendingUp className="w-3 h-3" /> -1.2h
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 border border-[#E8EEF2] shadow-sm">
              <p className="text-[10px] text-[#5A6B7C] uppercase font-bold tracking-widest mb-1">Residual AHI</p>
              <div className="flex items-end gap-1">
                <span className="text-2xl font-bold text-[#E76F51]">{cpapData.currentAHI}</span>
                <span className="text-[10px] text-[#5A6B7C] pb-1">ev/hr</span>
              </div>
              <div className="mt-2 flex items-center gap-1 text-[10px] text-[#E76F51] font-semibold">
                <TrendingUp className="w-3 h-3" /> +45% spike
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-[#E8EEF2] shadow-sm">
              <p className="text-[10px] text-[#5A6B7C] uppercase font-bold tracking-widest mb-1">Leak (95th%)</p>
              <div className="flex items-end gap-1">
                <span className="text-2xl font-bold text-[#0A1128]">{cpapData.percentileLeak}</span>
                <span className="text-[10px] text-[#5A6B7C] pb-1">L/min</span>
              </div>
              <div className="mt-2 flex items-center gap-1 text-[10px] text-[#6A994E] font-semibold">
                <ShieldCheck className="w-3 h-3" /> Normal
              </div>
            </div>
          </div>

          {/* AI Cluster Context */}
          <div className="bg-white rounded-2xl border border-[#E8EEF2] p-5 shadow-sm">
            <h3 className="text-xs font-bold text-[#0A1128] uppercase tracking-wider mb-4 flex items-center gap-2">
              <Brain className="w-3.5 h-3.5 text-[#2D9596]" />
              Behavioral Clustering
            </h3>
            <div className="flex items-center justify-between bg-[#FAFAFA] p-3 rounded-xl border border-[#E8EEF2]">
              <div className="space-y-0.5">
                <p className="text-[10px] text-[#5A6B7C] font-semibold">Current State</p>
                <p className="text-base font-bold text-[#F4A261]">{ai.clusterAssignment.current}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-[#E8EEF2]" />
              <div className="space-y-0.5 text-right">
                <p className="text-[10px] text-[#5A6B7C] font-semibold">Predicted Dropout</p>
                <p className="text-base font-bold text-[#E76F51]">{ai.daysToPredictedDropout} Days</p>
              </div>
            </div>
          </div>

          {/* Recent History Inline */}
          <div className="bg-white rounded-2xl border border-[#E8EEF2] p-5 shadow-sm">
            <h3 className="text-xs font-bold text-[#0A1128] uppercase tracking-wider mb-4 flex items-center gap-2">
              <ClipboardList className="w-3.5 h-3.5 text-[#2D9596]" />
              Recent Interventions
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-4 p-2 hover:bg-[#FAFAFA] rounded-xl transition-colors">
                <div className="bg-[#6A994E]/10 p-1.5 rounded-lg mt-0.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#6A994E]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#0A1128]">Mask Seal Checked (Technician Visit)</p>
                  <p className="text-[10px] text-[#5A6B7C]">Apr 12, 2026</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-2 hover:bg-[#FAFAFA] rounded-xl transition-colors opacity-60">
                <div className="bg-[#5A6B7C]/10 p-1.5 rounded-lg mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-[#5A6B7C]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#0A1128]">Digital Prompt Sent (Auto-AI)</p>
                  <p className="text-[10px] text-[#5A6B7C]">Apr 08, 2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Center Section */}
        <div className="space-y-6">
          <div className={`bg-white rounded-2xl border-2 border-[#2D9596] p-5 shadow-lg ${isCompact ? '' : 'sticky top-8'}`}>
            <h3 className="text-base font-bold text-[#0A1128] mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#2D9596]" />
              Action Center
            </h3>
            
            <div className="space-y-3">
              <button className="w-full bg-[#2D9596] text-white font-bold py-3 rounded-xl shadow-lg hover:bg-[#247a7b] transition-all transform hover:-translate-y-0.5 text-sm">
                Authorize Intervention
              </button>
              
              <button className="w-full bg-white border-2 border-[#F4A261] text-[#F4A261] font-bold py-3 rounded-xl hover:bg-[#F4A261]/5 transition-all text-sm">
                Override / Custom Plan
              </button>

              <button className="w-full bg-[#E8EEF2] text-[#5A6B7C] font-bold py-3 rounded-xl hover:bg-[#d5dbe0] transition-all text-sm">
                Dismiss Exception
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-[#E8EEF2]">
              <p className="text-[10px] text-[#5A6B7C] uppercase font-bold tracking-widest mb-3">Decision Support</p>
              <div className="space-y-2">
                <Link to={`/physician/patient/${patientId}/ai-analysis`} className="flex items-center justify-between bg-[#FAFAFA] p-2 rounded-lg hover:bg-[#E8EEF2] transition-colors group">
                  <span className="text-xs font-medium text-[#0A1128]">Deep AI Analysis</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#E8EEF2] group-hover:text-[#2D9596]" />
                </Link>
                <Link to={`/physician/patient/${patientId}/trends`} className="flex items-center justify-between bg-[#FAFAFA] p-2 rounded-lg hover:bg-[#E8EEF2] transition-colors group">
                  <span className="text-xs font-medium text-[#0A1128]">Raw CPAP Log</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#E8EEF2] group-hover:text-[#2D9596]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
