import { useTranslation } from 'react-i18next';
import Card from '../../../components/Card';
import MoneyText from '../../../components/MoneyText';

export default function CommitmentCard({ commitment }) {
  const { t } = useTranslation('money');
  const { name, relationship, amount, frequency, icon } = commitment;
  return (
    <Card>
      <div className="mm-row">
        <div className="mm-row" style={{ justifyContent: 'flex-start' }}>
          <span aria-hidden="true" style={{ fontSize: '1.6rem' }}>{icon}</span>
          <div>
            <p className="mm-strong">{name}</p>
            <p className="mm-sub">{relationship}</p>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <MoneyText amount={amount} />
          <p className="mm-sub">{t(`commitments.frequency.${frequency}`)}</p>
        </div>
      </div>
    </Card>
  );
}