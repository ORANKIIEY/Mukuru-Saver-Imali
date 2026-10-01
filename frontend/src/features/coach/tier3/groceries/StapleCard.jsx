import { useTranslation } from 'react-i18next';
import Card from '../../../../components/Card';
import MoneyText from '../../../../components/MoneyText';
import SaveTheSavingButton from './SaveTheSavingButton';

export default function StapleCard({ item }) {
  const { t } = useTranslation('coach');
  const saving = item.usualPrice - item.price;
  return (
    <Card>
      <h3 style={{ margin: 0 }}>{item.name}</h3>
      <p style={{ margin: '4px 0' }}>{item.store} · <MoneyText amount={item.price} /></p>
      {saving > 0 ? (
        <>
          <p style={{ color: '#1B7F3B' }}>{t('groceries.cheaper')} <MoneyText amount={saving} /></p>
          <SaveTheSavingButton amount={saving} />
        </>
      ) : <small>{t('groceries.noChange')}</small>}
    </Card>
  );
}
