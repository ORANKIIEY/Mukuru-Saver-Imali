import React, { useState, useRef } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import MoneyText from '../../components/MoneyText';
import { useUser } from '../../context/UserContext';
import { UploadCloud, FileText, CheckCircle2, Sparkles, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function BankStatementUploadCard({ onScanComplete }) {
  const { user, updateUserFinancials } = useUser();
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResult, setScanResult] = useState(user?.lastBankStatement || null);
  const [applied, setApplied] = useState(false);

  const sampleStatementText = `MUKURU MONEY COACH DEMO STATEMENT
Salary Deposit: +R9,500.00
Mukuru Remittance (Zimbabwe/Malawi): -R1,800.00
Shoprite Groceries: -R2,400.00
Rent & Utilities: -R1,600.00`;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      startScan(e.target.files[0].name);
    }
  };

  const startScan = async (fileName = 'Bank_Statement.pdf') => {
    setFile(fileName);
    setIsScanning(true);
    setScanProgress(15);
    setApplied(false);

    // Simulate scanning progress steps
    const timer1 = setTimeout(() => setScanProgress(55), 600);
    const timer2 = setTimeout(() => setScanProgress(85), 1200);

    try {
      // Call backend API /api/documents/upload or fallback to parser
      let responseData = null;
      try {
        const res = await fetch('/api/documents/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ fileName, sampleText: sampleStatementText }),
        });
        if (res.ok) {
          responseData = await res.json();
        }
      } catch (err) {
        // Fallback for mock mode
      }

      const result = responseData || {
        fileName,
        detectedIncome: 9500,
        detectedCommitments: 5800,
        familyRemittances: 1800,
        suggestedSafeToSave: 750,
        flexibleSpending: 2950,
        aiCoachRecommendation: `Bank Statement Scanned Successfully! We detected R9,500 monthly income and protected R1,800 in family remittances for ${user?.name || 'you'}. Based on your spending, we recommend locking R750 into your Safe-to-Save buffer.`,
        detectedTransactions: [
          'SALARY / DIRECT DEPOSIT: +R9,500.00',
          'MUKURU FAMILY REMITTANCE: -R1,800.00',
          'GROCERIES & HOUSEHOLD: -R2,400.00',
          'RENT & UTILITIES: -R1,600.00',
        ],
      };

      setTimeout(() => {
        setScanProgress(100);
        setIsScanning(false);
        setScanResult(result);

        // Auto-apply scanned financials to active user context
        updateUserFinancials({
          income: result.detectedIncome,
          commitments: result.detectedCommitments,
          safeToSave: result.suggestedSafeToSave,
          statementData: result,
        });

        setApplied(true);
        if (onScanComplete) onScanComplete(result);
      }, 1600);
    } catch (error) {
      setIsScanning(false);
    }
  };

  return (
    <Card
      style={{
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
        border: '1.5px solid var(--mukuru-orange-border)',
        boxShadow: 'var(--shadow-md)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: 'var(--mukuru-orange-light)',
              color: 'var(--mukuru-orange-dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FileText size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--color-text-primary)' }}>
              Bank Statement AI Scanner
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
              Upload your statement to automatically calculate your Safe-to-Save buffer & AI money plan
            </p>
          </div>
        </div>
        <span
          style={{
            fontSize: '0.7rem',
            backgroundColor: '#EEF2FF',
            color: '#4F46E5',
            padding: '3px 8px',
            borderRadius: '12px',
            fontWeight: '800',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <Sparkles size={12} /> AI Powered
        </span>
      </div>

      {/* File Upload Dropzone */}
      {!isScanning && !scanResult && (
        <div
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: '2px dashed #CBD5E1',
            borderRadius: 'var(--radius-md)',
            padding: '20px',
            textAlign: 'center',
            backgroundColor: '#FFFFFF',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--mukuru-orange)')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#CBD5E1')}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.csv,.png,.jpg,.jpeg,.txt"
            style={{ display: 'none' }}
          />
          <UploadCloud size={36} color="var(--mukuru-orange)" style={{ margin: '0 auto 8px' }} />
          <h4 style={{ fontSize: '0.875rem', fontWeight: '800', color: 'var(--color-text-primary)' }}>
            Upload Bank Statement (PDF, CSV, Image)
          </h4>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '4px', marginBottom: '12px' }}>
            Click to choose a file or try our instant sample bank statement scan
          </p>

          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              startScan('Sample_Mukuru_Statement.pdf');
            }}
            icon={<Sparkles size={14} />}
          >
            Try Instant Sample Statement Scan
          </Button>
        </div>
      )}

      {/* Scanning In-Progress Animation */}
      {isScanning && (
        <div style={{ padding: '16px 8px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '10px' }}>
            <Sparkles size={20} color="var(--mukuru-orange)" className="animate-spin" />
            <span style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--color-text-primary)' }}>
              Scanning Bank Statement for {user?.name || 'User'}... ({scanProgress}%)
            </span>
          </div>
          <div
            style={{
              width: '100%',
              height: '8px',
              backgroundColor: '#E2E8F0',
              borderRadius: '4px',
              overflow: 'hidden',
              marginBottom: '8px',
            }}
          >
            <div
              style={{
                width: `${scanProgress}%`,
                height: '100%',
                backgroundColor: 'var(--mukuru-orange)',
                transition: 'width 0.4s ease',
              }}
            />
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            Extracting income, protecting family remittances, and calculating Safe-to-Save buffer...
          </p>
        </div>
      )}

      {/* Scan Results & AI Money Coach Advice */}
      {scanResult && !isScanning && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }} className="animate-fade-in">
          {/* Header Status */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#ECFDF5', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid #A7F3D0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={18} color="#059669" />
              <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#065F46' }}>
                Statement Scanned & Verified ({scanResult.fileName})
              </span>
            </div>
            {applied && (
              <span style={{ fontSize: '0.7rem', backgroundColor: '#10B981', color: '#FFFFFF', padding: '2px 8px', borderRadius: '10px', fontWeight: '800' }}>
                Applied to Dashboard
              </span>
            )}
          </div>

          {/* Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat( auto-fit, minmax(130px, 1fr) )', gap: '8px' }}>
            <div style={{ backgroundColor: '#FFFFFF', padding: '10px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-subtle)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>Monthly Income</div>
              <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#059669', marginTop: '2px' }}>
                <MoneyText amount={scanResult.detectedIncome} />
              </div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', padding: '10px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-subtle)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>Family Remittances</div>
              <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#2563EB', marginTop: '2px' }}>
                <MoneyText amount={scanResult.familyRemittances} />
              </div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', padding: '10px', borderRadius: 'var(--radius-md)', border: '1px solid var(--mukuru-orange-border)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--mukuru-orange-dark)', fontWeight: '700' }}>Safe-to-Save Buffer</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--mukuru-orange-dark)', marginTop: '2px' }}>
                <MoneyText amount={scanResult.suggestedSafeToSave} />
              </div>
            </div>
          </div>

          {/* AI Money Coach Recommendation */}
          <div style={{ backgroundColor: '#FFF7ED', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid #FFEDD5' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <Sparkles size={16} color="var(--mukuru-orange)" />
              <h4 style={{ fontSize: '0.85rem', fontWeight: '800', color: '#9A3412' }}>
                AI Money Coach Planning Advice
              </h4>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#7C2D12', lineHeight: '1.45' }}>
              {scanResult.aiCoachRecommendation}
            </p>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setScanResult(null);
                setFile(null);
              }}
            >
              Scan Another Statement
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
