import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  ShieldCheck,
  Users,
  Coins,
  Server,
  Activity,
  ShoppingBag,
  ArrowLeft,
  CheckCircle2,
  RefreshCw,
  Search,
  UserCheck,
  Lock,
  Tag,
  AlertTriangle,
} from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import MoneyText from '../../components/MoneyText';
import { useUser } from '../../context/UserContext';
import { useLanguage } from '../../i18n';

export default function AdminConsolePage() {
  const navigate = useNavigate();
  const { user, registeredUsers, toggleUserRole } = useUser();
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState('customers'); // 'customers' | 'groceries' | 'logs'
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState('');

  // Sample Grocery Deals Managed by Admin
  const [deals, setDeals] = useState([
    { id: 'deal-1', item: 'Super Maize Meal 10kg', store: 'Shoprite', discount: '12% OFF', price: 95, normal: 110, active: true },
    { id: 'deal-2', item: 'Pure Sunflower Oil 2L', store: 'Boxer', discount: '15% OFF', price: 68, normal: 80, active: true },
    { id: 'deal-3', item: 'Long Grain Parboiled Rice 5kg', store: 'Pick n Pay', discount: '10% OFF', price: 89, normal: 99, active: true },
    { id: 'deal-4', item: 'Golden Brown Sugar 2kg', store: 'Spar', discount: '8% OFF', price: 42, normal: 46, active: false },
  ]);

  // System Audit & Auto-Saver Rules Execution Log
  const [auditLogs] = useState([
    { id: 'log-101', rule: 'Family Support Remittance Shield', detail: 'Protected R1,500 commitment before buffer allocation', status: 'VERIFIED', time: '10 mins ago' },
    { id: 'log-102', rule: 'Friday Auto-Saver Engine', detail: 'Locked R20 into Frosty Fridge for Grace Moyo', status: 'EXECUTED', time: '25 mins ago' },
    { id: 'log-103', rule: 'Grocery Round-Up Hook', detail: 'Rounded Shoprite transaction R185 up to R190 (+R5 to goal)', status: 'EXECUTED', time: '1 hour ago' },
    { id: 'log-104', rule: 'Goal Sprint Threshold (+R50)', detail: 'Triggered milestone bonus for Emergency Buffer Fund', status: 'EXECUTED', time: '2 hours ago' },
    { id: 'log-105', rule: 'Referral Bonus Disbursement', detail: 'Credited R50 bonus balance to newly registered account', status: 'VERIFIED', time: '3 hours ago' },
  ]);

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleToggleDeal = (dealId) => {
    setDeals((prev) =>
      prev.map((d) => (d.id === dealId ? { ...d, active: !d.active } : d))
    );
    showToast('Grocery deal visibility updated in real-time.');
  };

  const handleRoleToggle = (userId, currentRole) => {
    toggleUserRole(userId);
    showToast(`User role updated to ${currentRole === 'admin' ? 'Customer' : 'Administrator'}.`);
  };

  // Filtered customers
  const filteredUsers = registeredUsers.filter((u) => {
    const q = searchQuery.toLowerCase();
    return (
      (u.fullName && u.fullName.toLowerCase().includes(q)) ||
      (u.email && u.email.toLowerCase().includes(q)) ||
      (u.phone && u.phone.includes(q)) ||
      (u.role && u.role.toLowerCase().includes(q))
    );
  });

  const totalVaultedSavings = registeredUsers.reduce((sum, u) => sum + (u.income ? (u.income - u.commitments) : 2200), 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
      {/* Top Admin Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          borderRadius: 'var(--radius-lg)',
          padding: '20px',
          color: '#FFFFFF',
          boxShadow: '0 8px 24px rgba(15, 23, 42, 0.4)',
          border: '1px solid #334155',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#FCA5A5', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: '800', marginBottom: '8px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
              <Lock size={12} /> RESTRICTED ACCESS • ADMIN CLEARANCE ONLY
            </div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: '800', margin: 0, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Mukuru <span style={{ color: 'var(--mukuru-orange)' }}>Operations & Admin Console</span>
            </h1>
            <p style={{ color: '#94A3B8', fontSize: '0.85rem', margin: '4px 0 0 0' }}>
              Overseeing platform customers, remittance protection rules, staple grocery deals, and backend systems.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate('/dashboard')}
              icon={<ArrowLeft size={16} />}
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#FFFFFF', borderColor: '#475569' }}
            >
              Return to Dashboard
            </Button>
          </div>
        </div>
      </div>

      {notification && (
        <div
          style={{
            backgroundColor: '#ECFDF5',
            color: '#065F46',
            border: '1px solid #6EE7B7',
            padding: '10px 16px',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.85rem',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
          className="animate-fade-in"
        >
          <CheckCircle2 size={16} color="#059669" />
          {notification}
        </div>
      )}

      {/* KPI Stat Tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '14px' }}>
        <Card style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: 'var(--radius-sm)', backgroundColor: '#EEF2FF', color: '#4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Registered Customers</div>
              <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--color-text-primary)' }}>{registeredUsers.length}</div>
            </div>
          </div>
        </Card>

        <Card style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: 'var(--radius-sm)', backgroundColor: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Coins size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Vaulted Remainder</div>
              <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#059669' }}>
                <MoneyText amount={totalVaultedSavings} />
              </div>
            </div>
          </div>
        </Card>

        <Card style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--mukuru-orange-subtle)', color: 'var(--mukuru-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShoppingBag size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Active Staple Deals</div>
              <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--mukuru-orange)' }}>
                {deals.filter((d) => d.active).length} of {deals.length}
              </div>
            </div>
          </div>
        </Card>

        <Card style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: 'var(--radius-sm)', backgroundColor: '#F0FDF4', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Server size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Backend API Engine</div>
              <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#16A34A', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#16A34A', display: 'inline-block' }}></span>
                Online (Port 5000)
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Admin Tabs */}
      <div style={{ display: 'flex', borderBottom: '2px solid var(--color-border)', gap: '4px' }}>
        <button
          type="button"
          onClick={() => setActiveTab('customers')}
          style={{
            padding: '10px 18px',
            fontSize: '0.875rem',
            fontWeight: '800',
            border: 'none',
            backgroundColor: 'transparent',
            color: activeTab === 'customers' ? 'var(--mukuru-orange)' : 'var(--color-text-secondary)',
            borderBottom: activeTab === 'customers' ? '3px solid var(--mukuru-orange)' : '3px solid transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <Users size={16} /> Customer Accounts ({registeredUsers.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('groceries')}
          style={{
            padding: '10px 18px',
            fontSize: '0.875rem',
            fontWeight: '800',
            border: 'none',
            backgroundColor: 'transparent',
            color: activeTab === 'groceries' ? 'var(--mukuru-orange)' : 'var(--color-text-secondary)',
            borderBottom: activeTab === 'groceries' ? '3px solid var(--mukuru-orange)' : '3px solid transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <Tag size={16} /> Grocery Price Watch Deals ({deals.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('logs')}
          style={{
            padding: '10px 18px',
            fontSize: '0.875rem',
            fontWeight: '800',
            border: 'none',
            backgroundColor: 'transparent',
            color: activeTab === 'logs' ? 'var(--mukuru-orange)' : 'var(--color-text-secondary)',
            borderBottom: activeTab === 'logs' ? '3px solid var(--mukuru-orange)' : '3px solid transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <Activity size={16} /> Auto-Saver Audit Logs
        </button>
      </div>

      {/* Tab 1: Customer Accounts */}
      {activeTab === 'customers' && (
        <Card style={{ backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '800', margin: 0 }}>Registered Customer Directory</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: '2px 0 0 0' }}>
                Only system administrators can access customer account records and assign access clearance.
              </p>
            </div>
            <div style={{ position: 'relative', width: '260px' }}>
              <span style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--color-text-muted)' }}>
                <Search size={15} />
              </span>
              <input
                type="text"
                placeholder="Search name, phone, or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 32px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  fontSize: '0.825rem',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1.5px solid var(--color-border)' }}>
                  <th style={{ padding: '10px 14px', fontWeight: '800', color: 'var(--color-text-secondary)' }}>User</th>
                  <th style={{ padding: '10px 14px', fontWeight: '800', color: 'var(--color-text-secondary)' }}>Phone / Region</th>
                  <th style={{ padding: '10px 14px', fontWeight: '800', color: 'var(--color-text-secondary)' }}>Income</th>
                  <th style={{ padding: '10px 14px', fontWeight: '800', color: 'var(--color-text-secondary)' }}>Safe-to-Save</th>
                  <th style={{ padding: '10px 14px', fontWeight: '800', color: 'var(--color-text-secondary)' }}>Referral Code</th>
                  <th style={{ padding: '10px 14px', fontWeight: '800', color: 'var(--color-text-secondary)' }}>Role</th>
                  <th style={{ padding: '10px 14px', fontWeight: '800', color: 'var(--color-text-secondary)', textAlign: 'right' }}>Role Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => {
                  const isAdmin = u.role === 'admin';
                  return (
                    <tr key={u.id} style={{ borderBottom: '1px solid var(--color-border-subtle)', transition: 'background-color 0.15s ease' }}>
                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: isAdmin ? '#4F46E5' : 'var(--mukuru-orange)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.8rem' }}>
                            {u.avatar || u.name.charAt(0)}
                          </div>
                          <div>
                            <div style={{ fontWeight: '800', color: 'var(--color-text-primary)' }}>{u.fullName || u.name}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ fontWeight: '600' }}>{u.phone}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Region: {u.region || 'ZA'}</div>
                      </td>
                      <td style={{ padding: '12px 14px', fontWeight: '700' }}>
                        <MoneyText amount={u.income || 8500} />
                      </td>
                      <td style={{ padding: '12px 14px', fontWeight: '700', color: '#059669' }}>
                        <MoneyText amount={u.safeToSave || 500} />
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <span style={{ fontFamily: 'monospace', fontSize: '0.78rem', backgroundColor: '#F1F5F9', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>
                          {u.referralCode}
                        </span>
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <span
                          style={{
                            fontSize: '0.725rem',
                            fontWeight: '800',
                            textTransform: 'uppercase',
                            padding: '3px 8px',
                            borderRadius: 'var(--radius-full)',
                            backgroundColor: isAdmin ? '#EEF2FF' : '#ECFDF5',
                            color: isAdmin ? '#4F46E5' : '#065F46',
                            border: isAdmin ? '1px solid #C7D2FE' : '1px solid #A7F3D0',
                          }}
                        >
                          {isAdmin ? 'Administrator' : 'Customer'}
                        </span>
                      </td>
                      <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                        <button
                          type="button"
                          onClick={() => handleRoleToggle(u.id, u.role)}
                          style={{
                            padding: '4px 10px',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--color-border)',
                            backgroundColor: '#FFFFFF',
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            cursor: 'pointer',
                            color: isAdmin ? '#B91C1C' : '#4F46E5',
                          }}
                        >
                          {isAdmin ? 'Demote to Customer' : 'Promote to Admin'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Tab 2: Grocery Deals Manager */}
      {activeTab === 'groceries' && (
        <Card style={{ backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '800', margin: 0 }}>Staple Grocery Price Watch Management</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: '2px 0 0 0' }}>
                Toggle active supermarket staple discounts visible on customer mobile dashboards.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
            {deals.map((deal) => (
              <div
                key={deal.id}
                style={{
                  border: deal.active ? '1.5px solid #F59E0B' : '1px solid var(--color-border)',
                  backgroundColor: deal.active ? '#FFFBEB' : '#F8FAFC',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', fontWeight: '800', backgroundColor: '#FEF3C7', color: '#B45309', padding: '2px 6px', borderRadius: '4px' }}>
                      {deal.store} • {deal.discount}
                    </span>
                    <h4 style={{ fontSize: '0.925rem', fontWeight: '800', margin: '6px 0 2px 0', color: '#1E293B' }}>
                      {deal.item}
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggleDeal(deal.id)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      border: 'none',
                      backgroundColor: deal.active ? '#10B981' : '#94A3B8',
                      color: '#FFFFFF',
                      fontSize: '0.725rem',
                      fontWeight: '800',
                      cursor: 'pointer',
                    }}
                  >
                    {deal.active ? 'Active' : 'Inactive'}
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#64748B' }}>
                  <span>Price: <strong style={{ color: '#0F172A' }}>R{deal.price}</strong> (was R{deal.normal})</span>
                  <span style={{ color: '#059669', fontWeight: '700' }}>Save R{deal.normal - deal.price}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Tab 3: System Audit Logs */}
      {activeTab === 'logs' && (
        <Card style={{ backgroundColor: '#FFFFFF' }}>
          <div style={{ marginBottom: '14px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '800', margin: 0 }}>Auto-Saver Rules Engine & Remittance Audit Log</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: '2px 0 0 0' }}>
              Immutable audit verification of automated rules, Friday auto-locks, and family remittance protections.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {auditLogs.map((log) => (
              <div
                key={log.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: '#F8FAFC',
                  border: '1px solid var(--color-border-subtle)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <div style={{ fontWeight: '800', fontSize: '0.875rem', color: 'var(--color-text-primary)' }}>{log.rule}</div>
                    <div style={{ fontSize: '0.775rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>{log.detail}</div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: '800', backgroundColor: '#D1FAE5', color: '#065F46', padding: '2px 8px', borderRadius: '4px' }}>
                    {log.status}
                  </span>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: '3px' }}>{log.time}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
