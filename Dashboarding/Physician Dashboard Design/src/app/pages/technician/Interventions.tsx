import { interventionData } from '../../data/mockData';
import { Clock, Truck, CheckCircle } from 'lucide-react';

export default function TechnicianInterventions() {
  const columns = ['To Dispatch', 'In Transit', 'Delivered'];

  const getColumnIcon = (status: string) => {
    if (status === 'To Dispatch') return <Clock className="w-5 h-5" />;
    if (status === 'In Transit') return <Truck className="w-5 h-5" />;
    return <CheckCircle className="w-5 h-5" />;
  };

  const getColumnColor = (status: string) => {
    if (status === 'To Dispatch') return 'bg-[#F4A261]/10 border-[#F4A261]/20 text-[#F4A261]';
    if (status === 'In Transit') return 'bg-[#2D9596]/10 border-[#2D9596]/20 text-[#2D9596]';
    return 'bg-[#6A994E]/10 border-[#6A994E]/20 text-[#6A994E]';
  };

  const getPriorityColor = (priority: string) => {
    if (priority === 'High') return 'bg-[#E76F51] text-white';
    if (priority === 'Medium') return 'bg-[#F4A261] text-white';
    return 'bg-[#5A6B7C] text-white';
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl text-[#0A1128] mb-2">Equipment Dispatch Board</h2>
        <p className="text-[#5A6B7C]">Track and manage patient equipment deliveries</p>
      </div>

      {/* Kanban Board */}
      <div className="grid md:grid-cols-3 gap-6">
        {columns.map((column) => {
          const tasks = interventionData.technician.tasks.filter((task) => task.status === column);
          const Icon = column === 'To Dispatch' ? Clock : column === 'In Transit' ? Truck : CheckCircle;
          const headerColor = column === 'To Dispatch' ? 'bg-[#F4A261]' : column === 'In Transit' ? 'bg-[#2D9596]' : 'bg-[#6A994E]';

          return (
            <div key={column} className="bg-[#E8EEF2] rounded-xl p-4">
              <div className={`${headerColor} text-white rounded-lg p-4 mb-4 flex items-center justify-between`}>
                <div className="flex items-center gap-2">
                  <Icon className="w-5 h-5" />
                  <h3 className="font-medium">{column}</h3>
                </div>
                <span className="bg-white/20 px-2 py-1 rounded text-sm">{tasks.length}</span>
              </div>

              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className="bg-white rounded-lg p-4 shadow-sm border border-[#E8EEF2]">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-[#0A1128] font-medium">{task.item}</h4>
                      <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-[#5A6B7C]">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(task.scheduledDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {tasks.length === 0 && (
                  <div className="text-center py-8 text-[#5A6B7C] text-sm">
                    No items in this column
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 bg-white rounded-xl p-6 border border-[#E8EEF2] shadow-sm">
        <h3 className="text-lg text-[#0A1128] mb-4">Quick Actions</h3>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-[#F4A261] text-white rounded-lg hover:bg-[#e39350] transition-colors">
            + New Dispatch Order
          </button>
          <button className="px-6 py-3 bg-[#E8EEF2] text-[#0A1128] rounded-lg hover:bg-[#d5dce3] transition-colors">
            View Delivery History
          </button>
          <button className="px-6 py-3 bg-[#E8EEF2] text-[#0A1128] rounded-lg hover:bg-[#d5dce3] transition-colors">
            Equipment Inventory
          </button>
        </div>
      </div>
    </div>
  );
}

function Calendar({ className }: { className: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}
