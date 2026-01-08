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

export function Diamond({ color, shading }: ShapeProps) {
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
      <polygon
        points="5,30 50,5 95,30 50,55"
        fill={fill}
        stroke={strokeColor}
        strokeWidth="3"
      />
    </svg>
  );
}
