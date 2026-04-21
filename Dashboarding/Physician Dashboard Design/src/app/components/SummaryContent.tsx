import { Link } from 'react-router';
import { 
  aiWeeklyState, 
  cpapData, 
  patientInfo 
} from '../data/mockData';
import { 
  AlertTriangle, 
  CheckCircle, 
  Activity, 
  Calendar, 
  ArrowRight,
  TrendingUp,
  Brain,
  ShieldCheck,
  ClipboardList,
  Phone,
  Truck,
  Stethoscope,
  XCircle,
  FileText
} from 'lucide-react';

interface SummaryContentProps {
  patientId?: string;
  isCompact?: boolean;
  role?: 'physician' | 'technician';
  hideHeader?: boolean;
  showActions?: boolean;
}

export default function SummaryContent({ 
  patientId, 
  isCompact = false, 
  role = 'physician',
  hideHeader = false,
  showActions = true
}: SummaryContentProps) {
  // Ultra-resilient data mapping
  const nextAction = aiWeeklyState?.nextBestAction || { type: 'Monitoring', rationale: 'No active clinical exception.' };
  const currentAHI = cpapData?.currentAHI || 0;
  const usage = cpapData?.averageHours || 0;
  const leak = cpapData?.percentileLeak || 0;
  
  return (
    <div className={`space-y-6 ${isCompact ? 'p-0' : 'p-8 max-w-6xl mx-auto'} animate-in fade-in duration-500`}>
      
      {/* 1. Universal Evidence Workspace: AI Core */}
      {!hideHeader && (
        <div className="bg-[#0A1128] text-white rounded-2xl p-6 shadow-xl border-l-8 border-[#E76F51]">
          <div className="flex justify-between items-start">
            <div className="flex gap-4">
              <div className="bg-[#E76F51]/20 p-2 rounded-xl h-fit">
                <AlertTriangle className="w-8 h-8 text-[#E76F51]" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-1">Clinical Exception: {nextAction.type}</h2>
                <p className="text-white/70 text-sm max-w-2xl leading-relaxed">
                  {nextAction.rationale}
                </p>
              </div>
            </div>
            {!isCompact && (
              <div className="text-right whitespace-nowrap">
                <div className="bg-white/10 px-3 py-1 rounded-lg text-xs font-semibold mb-2">
                  ESCALATED {aiWeeklyState?.weekOf || 'ACTIVE'}
                </div>
                <div className="text-2xl font-bold text-[#E76F51]">Risk: {aiWeeklyState?.compositeRiskScore || 0}</div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className={`grid ${isCompact ? 'grid-cols-1' : 'lg:grid-cols-3'} gap-6`}>
        {/* Shared Physiological Evidence */}
        <div className={`${isCompact ? 'space-y-4' : 'lg:col-span-2 space-y-6'}`}>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 border border-[#E8EEF2] shadow-sm">
              <p className="text-[10px] text-[#5A6B7C] uppercase font-bold tracking-widest mb-1">Avg Usage</p>
              <div className="flex items-end gap-1">
                <span className="text-2xl font-bold text-[#0A1128]">{usage}</span>
                <span className="text-[10px] text-[#5A6B7C] pb-1">hrs/night</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-[#E8EEF2] shadow-sm">
              <p className="text-[10px] text-[#5A6B7C] uppercase font-bold tracking-widest mb-1">Residual AHI</p>
              <div className="flex items-end gap-1">
                <span className="text-2xl font-bold text-[#E76F51]">{currentAHI}</span>
                <span className="text-[10px] text-[#5A6B7C] pb-1">ev/hr</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-[#E8EEF2] shadow-sm">
              <p className="text-[10px] text-[#5A6B7C] uppercase font-bold tracking-widest mb-1">Leak (95%)</p>
              <div className="flex items-end gap-1">
                <span className="text-2xl font-bold text-[#0A1128]">{leak}</span>
                <span className="text-[10px] text-[#5A6B7C] pb-1">L/min</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8EEF2] p-5 shadow-sm">
            <h3 className="text-xs font-bold text-[#0A1128] uppercase tracking-wider mb-4 flex items-center gap-2">
              <Brain className="w-3.5 h-3.5 text-[#2D9596]" />
              Behavioral Clustering
            </h3>
            <div className="bg-[#FAFAFA] p-4 rounded-xl border border-[#E8EEF2]">
              <p className="text-[10px] text-[#5A6B7C] font-semibold mb-1">AI Classification</p>
              <p className="text-lg font-bold text-[#F4A261]">{aiWeeklyState?.clusterAssignment?.current || 'Scanning...'}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8EEF2] p-5 shadow-sm">
            <h3 className="text-xs font-bold text-[#0A1128] uppercase tracking-wider mb-4 flex items-center gap-2">
              <ClipboardList className="w-3.5 h-3.5 text-[#2D9596]" />
              Intervention Log
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-4 p-3 bg-[#FAFAFA] rounded-xl border border-[#E8EEF2]">
                <CheckCircle className="w-4 h-4 text-[#6A994E] mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-[#0A1128]">MAD Pathway Authorized</p>
                  <p className="text-[10px] text-[#5A6B7C]">Apr 18, 2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Centers */}
        {showActions && (
          <div>
            <div className={`bg-white rounded-2xl border-2 ${role === 'physician' ? 'border-[#2D9596]' : 'border-[#F4A261]'} p-6 shadow-lg`}>
              <h3 className="text-base font-bold text-[#0A1128] mb-6 flex items-center gap-2">
                <Activity className={role === 'physician' ? 'text-[#2D9596]' : 'text-[#F4A261]'} />
                 {role === 'physician' ? 'Clinical Action' : 'Technical Action'}
              </h3>
              
              {role === 'physician' ? (
                <div className="space-y-3">
                  <button className="w-full bg-[#2D9596] text-white font-bold py-4 rounded-xl shadow-lg text-sm">Authorize Intervention</button>
                  <button className="w-full bg-white border-2 border-[#E8EEF2] text-[#0A1128] font-bold py-4 rounded-xl text-sm">Dismiss</button>
                </div>
              ) : (
                <div className="space-y-3">
                  <button className="w-full bg-[#F4A261] text-white font-bold py-4 rounded-xl shadow-lg text-sm flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" /> Initiate Call
                  </button>
                  <button className="w-full bg-[#0A1128] text-white font-bold py-4 rounded-xl shadow-lg text-sm flex items-center justify-center gap-2">
                    <Truck className="w-4 h-4" /> Dispatch Asset
                  </button>
                  <button className="w-full bg-white border-2 border-[#E8EEF2] text-[#0A1128] font-bold py-4 rounded-xl text-sm">Schedule Visit</button>
                </div>
              )}

              <div className="mt-8 pt-8 border-t border-[#E8EEF2] space-y-2">
                <Link to={`/${role}/patient/${patientId || '1'}/trends`} className="flex items-center justify-between bg-[#FAFAFA] p-3 rounded-xl hover:border-[#E8EEF2] transition-all">
                  <span className="text-xs font-bold text-[#0A1128]">Detailed Trends</span>
                  <ArrowRight className="w-4 h-4 text-[#E8EEF2]" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
