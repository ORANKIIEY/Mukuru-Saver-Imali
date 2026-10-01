import Card from '../../../../components/Card';

export default function LearnCard({ title, text }) {
  return (
    <Card>
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      <p style={{ marginBottom: 0 }}>{text}</p>
    </Card>
  );
}
