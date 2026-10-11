export type HeatDay = { date: string; count: number };
export type HeatWeek = { days: HeatDay[] };

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function escapeXml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      default:
        return '&#39;';
    }
  });
}

function utcParts(date: string): { month: number; day: number } {
  const [year, month, day] = date.split('-').map(Number);
  const parsed = new Date(Date.UTC(year, (month || 1) - 1, day || 1));
  return { month: parsed.getUTCMonth(), day: parsed.getUTCDay() };
}

export function heatLevel(count: number): number {
  if (count <= 0) return 0;
  if (count < 3) return 1;
  if (count < 6) return 2;
  if (count < 10) return 3;
  return 4;
}

/** SVG sized to `width` CSS pixels so the year grid never needs horizontal scroll. */
export function buildHeatmapSvg(weeks: HeatWeek[], width: number): { svg: string; height: number } {
  const safeWidth = Math.max(Math.floor(width), 1);
  const count = Math.max(weeks.length, 1);
  const labelW = Math.min(28, safeWidth * 0.12);
  const monthH = 14;
  const gap = safeWidth < 420 ? 1.5 : 2;
  const inner = Math.max(safeWidth - labelW, count);
  const cell = (inner - gap * (count - 1)) / count;
  const gridH = cell * 7 + gap * 6;
  const svgH = monthH + gridH;
  const svgW = labelW + cell * count + gap * (count - 1);

  let lastLabelX = -Infinity;
  const months: string[] = [];
  weeks.forEach((week, index) => {
    const first = week.days[0];
    if (!first?.date) return;
    const { month } = utcParts(first.date);
    const x = labelW + index * (cell + gap);
    const label = MONTHS[month] ?? '';
    if (x - lastLabelX < 18) return;
    if (months.length > 0 && months[months.length - 1]?.includes(`>${label}<`)) return;
    months.push(
      `<text x="${x.toFixed(2)}" y="10" class="hm-label">${label}</text>`,
    );
    lastLabelX = x;
  });

  const dayLabels = [
    [1, 'Mon'],
    [3, 'Wed'],
    [5, 'Fri'],
  ] as const;
  const days = dayLabels.map(([index, label]) => {
    const y = monthH + index * (cell + gap) + cell * 0.82;
    return `<text x="0" y="${y.toFixed(2)}" class="hm-label">${label}</text>`;
  });

  const rects: string[] = [];
  weeks.forEach((week, index) => {
    week.days.forEach((day) => {
      if (!day?.date) return;
      const { day: dow } = utcParts(day.date);
      const x = labelW + index * (cell + gap);
      const y = monthH + dow * (cell + gap);
      const countLabel = day.count === 1 ? '1 contribution' : `${day.count} contributions`;
      const title = escapeXml(`${countLabel} on ${day.date}`);
      rects.push(
        `<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${Math.max(cell, 0.5).toFixed(2)}" height="${Math.max(cell, 0.5).toFixed(2)}" rx="${Math.min(2, cell / 3).toFixed(2)}" class="hm hm-${heatLevel(day.count)}"><title>${title}</title></rect>`,
      );
    });
  });

  const svg = `<svg viewBox="0 0 ${svgW.toFixed(2)} ${svgH.toFixed(2)}" width="100%" role="img" aria-label="GitHub contributions for the last year">${months.join('')}${days.join('')}${rects.join('')}</svg>`;
  return { svg, height: svgH };
}
