import { Card } from '../../components/ui/Card.jsx'
import { Badge } from '../../components/ui/Badge.jsx'
import { Button } from '../../components/ui/Button.jsx'

const transactions = [
  { id: 'txn-1', learner: 'Tosin K.', item: 'Practical Data Analytics', amount: 49, status: 'succeeded', date: '2026-09-05' },
  { id: 'txn-2', learner: 'Grace M.', item: 'Data & AI Career Track (deposit)', amount: 25, status: 'succeeded', date: '2026-09-04' },
  { id: 'txn-3', learner: 'Femi A.', item: 'Backend Systems with Node.js', amount: 79, status: 'refunded', date: '2026-09-02' },
]

const payouts = [
  { instructor: 'Amara Okoye', amount: 1240, status: 'pending' },
  { instructor: 'Zainab Musa', amount: 2110, status: 'pending' },
  { instructor: 'David Chen', amount: 860, status: 'paid' },
]

const statusTone = { succeeded: 'success', refunded: 'danger', pending: 'warning', paid: 'success' }

export function PaymentsOverview() {
  return (
    <div className="px-4 sm:px-6 py-8 max-w-[1000px] mx-auto flex flex-col gap-8">
      <h1 className="text-heading-1 font-display font-semibold text-ink">Payments & payouts</h1>

      <div>
        <h2 className="text-heading-3 font-display font-semibold text-ink mb-3">Recent transactions</h2>
        <Card className="overflow-hidden">
          <table className="w-full text-body-sm border-collapse">
            <thead>
              <tr className="text-left text-ink-soft bg-surface-1">
                <th className="py-2.5 px-4 font-medium">Learner</th>
                <th className="py-2.5 px-4 font-medium">Item</th>
                <th className="py-2.5 px-4 font-medium">Amount</th>
                <th className="py-2.5 px-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="border-t border-border">
                  <td className="py-3 px-4 text-ink">{t.learner}</td>
                  <td className="py-3 px-4 text-ink-soft">{t.item}</td>
                  <td className="py-3 px-4 text-ink">${t.amount}</td>
                  <td className="py-3 px-4"><Badge tone={statusTone[t.status]}>{t.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      <div>
        <h2 className="text-heading-3 font-display font-semibold text-ink mb-3">Instructor payouts</h2>
        <div className="flex flex-col gap-3">
          {payouts.map((p) => (
            <Card key={p.instructor} className="p-4 flex items-center gap-4">
              <div className="flex-1">
                <p className="text-body-sm font-medium text-ink">{p.instructor}</p>
                <p className="text-caption text-ink-soft">${p.amount.toLocaleString()} owed</p>
              </div>
              <Badge tone={statusTone[p.status]}>{p.status}</Badge>
              {p.status === 'pending' && <Button variant="primary" size="sm">Release payout</Button>}
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
