import { useState } from 'react'
import { users } from '../../data/fixtures/users.js'
import { Card } from '../../components/ui/Card.jsx'
import { Badge } from '../../components/ui/Badge.jsx'
import { Button } from '../../components/ui/Button.jsx'
import { Modal } from '../../components/ui/Modal.jsx'
import { Select } from '../../components/ui/Input.jsx'

const extraUsers = [
  { id: 'u-4', role: 'learner', name: 'Grace Muthoni', email: 'grace@example.com', avatarInitials: 'GM' },
  { id: 'u-5', role: 'instructor', name: 'David Chen', email: 'david@example.com', avatarInitials: 'DC' },
  { id: 'u-6', role: 'learner', name: 'Kelechi Uzo', email: 'kelechi@example.com', avatarInitials: 'KU' },
]

const roleTone = { learner: 'neutral', instructor: 'accent', admin: 'proof' }

export function UserManagement() {
  const allUsers = [...users, ...extraUsers]
  const [activeUser, setActiveUser] = useState(null)

  return (
    <div className="px-4 sm:px-6 py-8 max-w-[1000px] mx-auto">
      <h1 className="text-heading-1 font-display font-semibold text-ink mb-6">User management</h1>
      <Card className="overflow-hidden">
        <table className="w-full text-body-sm border-collapse">
          <thead>
            <tr className="text-left text-ink-soft bg-surface-1">
              <th className="py-2.5 px-4 font-medium">Name</th>
              <th className="py-2.5 px-4 font-medium">Email</th>
              <th className="py-2.5 px-4 font-medium">Role</th>
              <th className="py-2.5 px-4 font-medium" />
            </tr>
          </thead>
          <tbody>
            {allUsers.map((u) => (
              <tr key={u.id} className="border-t border-border">
                <td className="py-3 px-4 text-ink font-medium">{u.name}</td>
                <td className="py-3 px-4 text-ink-soft">{u.email}</td>
                <td className="py-3 px-4"><Badge tone={roleTone[u.role]}>{u.role}</Badge></td>
                <td className="py-3 px-4 text-right">
                  <Button variant="ghost" size="sm" onClick={() => setActiveUser(u)}>Manage</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Modal open={Boolean(activeUser)} onClose={() => setActiveUser(null)} title={activeUser?.name ?? ''}>
        <div className="flex flex-col gap-4">
          <Select id="role" label="Role" defaultValue={activeUser?.role}>
            <option value="learner">Learner</option>
            <option value="instructor">Instructor</option>
            <option value="admin">Admin</option>
          </Select>
          <div className="flex gap-2 justify-end pt-2">
            <Button variant="ghost" size="sm" onClick={() => setActiveUser(null)}>Cancel</Button>
            <Button variant="danger" size="sm" onClick={() => setActiveUser(null)}>Suspend user</Button>
            <Button variant="primary" size="sm" onClick={() => setActiveUser(null)}>Save</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
