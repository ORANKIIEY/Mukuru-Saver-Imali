import React, { useState } from 'react';
import { Target, CheckCircle2, ShoppingBag, ShieldCheck } from 'lucide-react';
import MoneyText from '../../components/MoneyText';

const DEFAULT_GOALS = [
    {
        id: 1,
        name: "Frosty Fridge",
        category: "need", // "need" vs "want"
        targetAmount: 6000,
        savedAmount: 1200,
        targetDate: "2026-12-15",
    },
    {
        id: 2,
        name: "Emergency Buffer Fund",
        category: "need",
        targetAmount: 3000,
        savedAmount: 1800,
        targetDate: "2026-11-30",
    },
    {
        id: 3,
        name: "Holiday Home Visit",
        category: "want",
        targetAmount: 2500,
        savedAmount: 500,
        targetDate: "2026-12-24",
    },
    {
        id: 4,
        name: "New Smart TV",
        category: "want",
        targetAmount: 4000,
        savedAmount: 400,
        targetDate: "2027-03-01",
    }
];

export default function CurrentGoalCard({ goals = DEFAULT_GOALS, onLockIn }) {
    const [filter, setFilter] = useState('all'); // 'all' | 'need' | 'want'

    const filteredGoals = goals.filter(g => filter === 'all' || g.category === filter);

    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 space-y-4">
            {/* Header & Category Filter Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-orange-600" />
                    <h3 className="font-semibold text-slate-800 text-lg">Active Goals</h3>
                </div>

                {/* Color-Coded Filter Chips */}
                <div className="flex items-center gap-2 text-xs font-medium">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-3 py-1 rounded-full transition-colors ${
                            filter === 'all'
                                ? 'bg-slate-800 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                        All ({goals.length})
                    </button>
                    <button
                        onClick={() => setFilter('need')}
                        className={`px-3 py-1 rounded-full flex items-center gap-1 transition-colors ${
                            filter === 'need'
                                ? 'bg-emerald-600 text-white'
                                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                        }`}
                    >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Needs
                    </button>
                    <button
                        onClick={() => setFilter('want')}
                        className={`px-3 py-1 rounded-full flex items-center gap-1 transition-colors ${
                            filter === 'want'
                                ? 'bg-amber-600 text-white'
                                : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
                        }`}
                    >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Wants
                    </button>
                </div>
            </div>

            {/* Goal Cards List */}
            <div className="grid gap-4">
                {filteredGoals.map((goal) => {
                    const isNeed = goal.category === 'need';
                    const progress = Math.min(100, Math.round((goal.savedAmount / goal.targetAmount) * 100));
                    const remaining = Math.max(0, goal.targetAmount - goal.savedAmount);

                    return (
                        <div
                            key={goal.id}
                            className={`p-4 rounded-xl border transition-all ${
                                isNeed
                                    ? 'border-emerald-200 bg-emerald-50/20 hover:border-emerald-300'
                                    : 'border-amber-200 bg-amber-50/20 hover:border-amber-300'
                            }`}
                        >
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-slate-900">{goal.name}</span>
                                        {/* Badge */}
                                        <span
                                            className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                                                isNeed
                                                    ? 'bg-emerald-100 text-emerald-800'
                                                    : 'bg-amber-100 text-amber-800'
                                            }`}
                                        >
                      {isNeed ? 'Essential Need' : 'Personal Want'}
                    </span>
                                    </div>
                                    <span className="text-xs text-slate-400">Target: {goal.targetDate}</span>
                                </div>
                                <div className="text-right">
                  <span
                      className={`text-sm font-bold ${
                          isNeed ? 'text-emerald-700' : 'text-amber-700'
                      }`}
                  >
                    {progress}%
                  </span>
                                </div>
                            </div>

                            {/* Color-Coordinated Progress Bar */}
                            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-3">
                                <div
                                    className={`h-full transition-all duration-500 rounded-full ${
                                        isNeed ? 'bg-emerald-500' : 'bg-amber-500'
                                    }`}
                                    style={{ width: `${progress}%` }}
                                />
                            </div>

                            {/* Financial Stats */}
                            <div className="flex items-center justify-between text-xs text-slate-600">
                                <div>
                                    Saved: <strong className="text-slate-800"><MoneyText amount={goal.savedAmount} /></strong> of <MoneyText amount={goal.targetAmount} />
                                </div>
                                <div className="text-slate-500">
                                    <span className="font-medium text-slate-700"><MoneyText amount={remaining} /></span> remaining
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}