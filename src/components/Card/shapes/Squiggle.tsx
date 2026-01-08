import type { CardColor, CardShading } from '../../../types';

interface ShapeProps {
  color: CardColor;
  shading: CardShading;
}

const colorMap: Record<CardColor, string> = {
  red: '#e74c3c',
  green: '#27ae60',
  purple: '#9b59b6',
};

export function Squiggle({ color, shading }: ShapeProps) {
  const strokeColor = colorMap[color];

  let fill: string;
  switch (shading) {
    case 'solid':
      fill = strokeColor;
      break;
    case 'striped':
      fill = `url(#stripes-${color})`;
      break;
    case 'empty':
    default:
      fill = 'transparent';
  }

  const path = `
    M 5,15
    C 20,5 40,5 50,20
    C 60,35 80,35 95,25
    L 95,45
    C 80,55 60,55 50,40
    C 40,25 20,25 5,35
    Z
  `;

  return (
    <svg viewBox="0 0 100 60" className="shape">
      <path
        d={path}
        fill={fill}
        stroke={strokeColor}
        strokeWidth="3"
      />
    </svg>
  );
}
