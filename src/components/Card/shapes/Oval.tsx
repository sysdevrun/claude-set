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

export function Oval({ color, shading }: ShapeProps) {
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

  return (
    <svg viewBox="0 0 100 60" className="shape">
      <ellipse
        cx="50"
        cy="30"
        rx="45"
        ry="25"
        fill={fill}
        stroke={strokeColor}
        strokeWidth="3"
      />
    </svg>
  );
}
