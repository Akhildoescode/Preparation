'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { DailyCheckIn } from '@/types';

interface DailyCheckInFormProps {
  day: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  existing?: DailyCheckIn;
  onSave: (checkIn: DailyCheckIn) => void;
  onCancel?: () => void;
}

export function DailyCheckInForm({
  day,
  existing,
  onSave,
  onCancel,
}: DailyCheckInFormProps) {
  const [whatClicked, setWhatClicked] = useState(existing?.whatClicked ?? '');
  const [whatDidnt, setWhatDidnt] = useState(existing?.whatDidnt ?? '');
  const [tomorrowsFocus, setTomorrowsFocus] = useState(
    existing?.tomorrowsFocus ?? ''
  );

  const handleSubmit = () => {
    onSave({
      day,
      date: new Date().toISOString(),
      whatClicked,
      whatDidnt,
      tomorrowsFocus,
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="checkin-clicked" className="text-sm font-medium text-zinc-300">
          What clicked today?
        </label>
        <Textarea
          id="checkin-clicked"
          value={whatClicked}
          onChange={(e) => setWhatClicked(e.target.value)}
          placeholder="Patterns that felt intuitive, problems that went smoothly…"
          className="bg-zinc-900 border-zinc-700 text-zinc-100 resize-none"
          rows={3}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="checkin-didnt" className="text-sm font-medium text-zinc-300">
          What didn&apos;t click?
        </label>
        <Textarea
          id="checkin-didnt"
          value={whatDidnt}
          onChange={(e) => setWhatDidnt(e.target.value)}
          placeholder="Problems that took too long, concepts that need more work…"
          className="bg-zinc-900 border-zinc-700 text-zinc-100 resize-none"
          rows={3}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="checkin-focus" className="text-sm font-medium text-zinc-300">
          Tomorrow&apos;s focus
        </label>
        <Textarea
          id="checkin-focus"
          value={tomorrowsFocus}
          onChange={(e) => setTomorrowsFocus(e.target.value)}
          placeholder="Which topics or problems to prioritize…"
          className="bg-zinc-900 border-zinc-700 text-zinc-100 resize-none"
          rows={2}
        />
      </div>
      <div className="flex gap-2">
        <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-500 text-white">
          Save check-in
        </Button>
        {onCancel && (
          <Button variant="outline" onClick={onCancel} className="border-zinc-700 text-zinc-300 hover:text-zinc-100">
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}
