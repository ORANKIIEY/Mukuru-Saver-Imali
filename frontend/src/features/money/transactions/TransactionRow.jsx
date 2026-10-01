import { useTranslation } from 'react-i18next';
import MoneyText from '../../../components/MoneyText';
import CategoryTag from '../../../components/CategoryTag';
import { formatDate } from '../utils';

export default function TransactionRow({ transaction }) {
  const { i18n } = useTranslation('money');
  const { merchant, amount, date, category } = transaction;
  return (
    <li className="mm-row">
      <div>
        <p className="mm-strong">{merchant}</p>
        <p className="mm-sub">{formatDate(date, i18n.language)}</p>
      </div>
      <div className="mm-tx-right">
        <MoneyText amount={amount} />
        <CategoryTag category={category} />
      </div>
    </li>
  );
}