import { useParams } from 'react-router';
import SummaryContent from '../../components/SummaryContent';

export default function PhysicianSummary() {
  const { patientId } = useParams();
  
  return (
    <SummaryContent patientId={patientId} />
  );
}
