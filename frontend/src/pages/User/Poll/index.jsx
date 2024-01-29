import { useParams } from 'react-router-dom';

export default function Poll() {
  const { pollId: id } = useParams();
  return <div>{id}</div>;
}
