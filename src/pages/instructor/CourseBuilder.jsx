import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getCourseById } from '../../data/fixtures/courses.js'
import { Card } from '../../components/ui/Card.jsx'
import { Button } from '../../components/ui/Button.jsx'
import { Input, Select } from '../../components/ui/Input.jsx'
import { Icon } from '../../components/ui/Icon.jsx'

const steps = ['Structure', 'Content', 'Pricing', 'Review', 'Publish']

export function CourseBuilder() {
  const { id } = useParams()
  const existing = id ? getCourseById(id) : null
  const [step, setStep] = useState(0)

  return (
    <div className="px-4 sm:px-6 py-8 max-w-[900px] mx-auto">
      <Link to="/instructor/courses" className="text-body-sm text-ink-soft hover:text-ink mb-4 inline-block">← Back to courses</Link>
      <h1 className="text-heading-1 font-display font-semibold text-ink mb-6">
        {existing ? `Edit: ${existing.title}` : 'Create a new course'}
      </h1>

      <div className="flex gap-1 mb-8 overflow-x-auto">
        {steps.map((label, i) => (
          <button
            key={label}
            onClick={() => setStep(i)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-body-sm font-medium border ${
              i === step ? 'border-accent bg-accent-soft text-accent-strong' : 'border-border text-ink-soft'
            }`}
          >
            {i + 1}. {label}
          </button>
        ))}
      </div>

      <Card className="p-6 flex flex-col gap-5">
        {step === 0 && (
          <>
            <Input id="title" label="Course title" defaultValue={existing?.title} />
            <Input id="subtitle" label="Subtitle" defaultValue={existing?.subtitle} />
            <div className="grid sm:grid-cols-2 gap-4">
              <Select id="category" label="Category" defaultValue={existing?.category}>
                <option>Data & AI</option>
                <option>Design</option>
                <option>Engineering</option>
                <option>Marketing</option>
                <option>Entrepreneurship</option>
              </Select>
              <Select id="level" label="Level" defaultValue={existing?.level}>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </Select>
            </div>
            <div>
              <p className="text-body-sm font-medium text-ink mb-2">Curriculum sections</p>
              <div className="flex flex-col gap-2">
                {(existing?.curriculum ?? []).map((section) => (
                  <div key={section.id} className="flex items-center gap-2 rounded-card border border-border p-3">
                    <Icon name="layers" size={16} className="text-ink-soft" />
                    <span className="flex-1 text-body-sm text-ink">{section.title}</span>
                    <span className="text-caption text-ink-soft">{section.lessons.length} lessons</span>
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="self-start">+ Add section</Button>
              </div>
            </div>
          </>
        )}

        {step === 1 && (
          <div className="flex flex-col gap-4">
            <p className="text-body-sm text-ink-soft">Upload lecture videos and reading material per lesson.</p>
            <div className="rounded-card border-2 border-dashed border-border p-10 text-center text-ink-soft">
              <Icon name="upload" size={28} className="mx-auto mb-2" />
              Drop video files here, or click to browse
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-4 max-w-sm">
            <Input id="price" type="number" label="Price (USD)" defaultValue={existing?.price ?? 49} />
            <Select id="format" label="Format" defaultValue={existing?.format}>
              <option value="self-paced">Self-paced</option>
              <option value="cohort">Cohort</option>
            </Select>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-3 text-body-sm text-ink">
            <p className="flex items-center gap-2"><Icon name="check" size={16} className="text-proof" /> Title and description complete</p>
            <p className="flex items-center gap-2"><Icon name="check" size={16} className="text-proof" /> At least one curriculum section</p>
            <p className="flex items-center gap-2"><Icon name="check" size={16} className="text-proof" /> Pricing set</p>
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <Icon name="award" size={32} className="text-accent" />
            <p className="text-body-lg font-semibold text-ink">Ready to publish</p>
            <p className="text-body-sm text-ink-soft max-w-sm">Your course will be submitted for admin review before appearing in discovery.</p>
            <Button variant="accent" size="lg">Submit for review</Button>
          </div>
        )}

        {step < 4 && (
          <div className="flex justify-between pt-4 border-t border-border">
            <Button variant="ghost" size="md" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>Back</Button>
            <Button variant="accent" size="md" onClick={() => setStep((s) => Math.min(4, s + 1))}>Continue</Button>
          </div>
        )}
      </Card>
    </div>
  )
}
