import { useParams } from 'react-router';
import SummaryContent from '../../components/SummaryContent';

export default function TechnicianSummary() {
  const { patientId } = useParams();
  
  return (
    <SummaryContent patientId={patientId} role="technician" />
  );
}
