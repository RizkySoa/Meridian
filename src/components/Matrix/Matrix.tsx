'use client';

import { QUADRANTS } from '@/constants/quadrants';
import Quadrant from '@/components/Quadrant/Quadrant';
import styles from './Matrix.module.css';

/**
 * Matrix renders the full Eisenhower 2×2 grid with rotated Y-axis labels
 * and centred X-axis labels. It is purely a layout/composition component —
 * all task logic lives inside Quadrant → TaskList / TaskInput.
 */
export default function Matrix() {
  return (
    <div className={styles.wrap}>

      {/* ── Y-axis (Important / Not Important) ─────────────────────────── */}
      <aside className={styles.axisY} aria-label="Importance axis">
        <div className={styles.axisYLabel}>
          <span>Important</span>
        </div>
        <div className={styles.axisYLabel}>
          <span>Not Important</span>
        </div>
      </aside>

      {/* ── Main column (x-axis + grid) ─────────────────────────────────── */}
      <div className={styles.column}>

        {/* X-axis (Urgent / Not Urgent) */}
        <div className={styles.axisX} aria-label="Urgency axis">
          <div className={styles.axisXLabel}>Urgent</div>
          <div className={styles.axisXLabel}>Not Urgent</div>
        </div>

        {/* 2 × 2 grid */}
        <div className={styles.grid} role="grid" aria-label="Eisenhower Matrix">
          {QUADRANTS.map((q) => (
            <Quadrant key={q.id} config={q} />
          ))}
        </div>

      </div>
    </div>
  );
}
