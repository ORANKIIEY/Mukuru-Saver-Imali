import { useTranslation } from 'react-i18next';
import Button from '../../../../components/Button';
import MoneyText from '../../../../components/MoneyText';

// Sample prices for the demo. Swap for a products API later.
const PRODUCTS = [
  { id: 'small', name: 'Small fridge', price: 3999 },
  { id: 'medium', name: 'Medium fridge', price: 6000 },
  { id: 'large', name: 'Large fridge', price: 8499 },
];

export default function StepPickProduct({ draft, update, onNext }) {
  const { t } = useTranslation('money');
  return (
    <div className="mm-stack">
      <h2 className="mm-title">{t('creator.product.title')}</h2>
      {PRODUCTS.map((p) => (
        <button key={p.id} type="button" className="mm-choice" aria-pressed={draft.productId === p.id}
          onClick={() => update({ productId: p.id, target: p.price })}>
          <span style={{ flex: 1 }}>{p.name}</span>
          <MoneyText amount={p.price} />
        </button>
      ))}
      <Button disabled={!draft.productId} onClick={() => onNext()}>{t('common.continue')}</Button>
      <Button variant="ghost" onClick={() => { update({ productId: null }); onNext(); }}>{t('creator.product.skip')}</Button>
    </div>
  );
}