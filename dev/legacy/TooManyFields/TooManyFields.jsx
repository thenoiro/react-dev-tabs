import { lazy, useMemo } from 'react';

const TooManyFields = (props) => {
  const {
    radius = '50%',
    padding,
    color = 'black',
    bgcolor = 'white',
    children,
    size = 15,
    width = size * 2,
    height = size * 2,
    invert,
    rotate = 0,
    flipX,
    flipY,
    ...rest
  } = props;

  const child = useMemo(() => {
    if (typeof children === 'string') {
      const [f, s] = children.split(' ').map((p) => p.trim());

      if (f && s) {
        return `${f[0].toUpperCase()}${s[0].toUpperCase()}`;
      }
      if (f.length >= 2) {
        return f.slice(0, 2).toUpperCase();
      }
      return f[0].toUpperCase();
    }
    return '?';
  }, [children]);

  const transform = useMemo(() => {
    return [
      `rotate(${rotate}deg)`,
      flipX && 'scaleX(-1)',
      flipY && 'scaleY(-1)',
    ]
      .filter(Boolean)
      .join(' ');
  }, [rotate, flipX, flipY]);

  return (
    <div
      {...rest}
      style={{
        transform,
        transitionDuration: '200ms',
        fontFamily: 'sans-serif',
        fontSize: size,
        background: bgcolor,
        borderRadius: radius,
        width,
        height,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        lineHeight: 1,
        fontWeight: 'bold',
        overflow: 'hidden',
        border: `1px solid ${color}`,
        color,
        padding,
        cursor: 'default',
        filter: invert ? 'invert(1)' : undefined,
      }}
    >
      {child}
    </div>
  );
};

TooManyFields.Demo = lazy(() => import('./TooManyFields.demo'));

export default TooManyFields;
