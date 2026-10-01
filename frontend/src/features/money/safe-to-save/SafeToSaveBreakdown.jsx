import { useTranslation } from 'react-i18next';
import MoneyText from '../../../components/MoneyText';

export default function SafeToSaveBreakdown({ data }) {
  const { t } = useTranslation('money');
  const rows = [
    ['income', data.income, '+'],
    ['commitments', data.commitments, '−'],
    ['spending', data.spending, '−'],
  ];
  return (
    <ul className="mm-list" aria-label={t('safe.show')}>
      {rows.map(([key, amount, sign]) => (
        <li key={key} className="mm-row">
          <span>{t(`safe.${key}`)}</span>
          <span>{sign} <MoneyText amount={amount} /></span>
        </li>
      ))}
      <li className="mm-row">
        <span className="mm-strong">{t('safe.left')}</span>
        <MoneyText amount={data.available} />
      </li>
    </ul>
  );
}
