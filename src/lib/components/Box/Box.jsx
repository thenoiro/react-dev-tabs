import { forwardRef, memo, useMemo } from 'react';

const getUnit = (u) => Number.isFinite(u) ? `${u * 8}px` : u;

const Tag = memo(forwardRef((props, ref) => {
  const { tag: Tag = 'div', ...rest } = props;

  return (
    <Tag {...rest} ref={ref} />
  );
}));

const Box = forwardRef((props, ref) => {
  const {
    m,
    mt,
    mb,
    ml,
    mr,
    mx,
    my,
    p,
    pt,
    pb,
    pl,
    pr,
    px,
    py,
    component,
    className,
    children,
    type,
    src,
    checked,
    style: initialStyles,
    ...rest
  } = props;

  const styles = useMemo(() => {
    const result = {};

    if (m) {
      result.margin = getUnit(m);
    }
    if (my) {
      result.marginTop = getUnit(my);
      result.marginBottom = getUnit(my);
    }
    if (mx) {
      result.marginLeft = getUnit(mx);
      result.marginRight = getUnit(mx);
    }
    if (mt) {
      result.marginTop = getUnit(mt);
    }
    if (mb) {
      result.marginBottom = getUnit(mb);
    }
    if (ml) {
      result.marginLeft = getUnit(ml);
    }
    if (mr) {
      result.marginRight = getUnit(mr);
    }

    if (p) {
      result.padding = getUnit(p);
    }
    if (py) {
      result.paddingTop = getUnit(py);
      result.paddingBottom = getUnit(py);
    }
    if (px) {
      result.paddingLeft = getUnit(px);
      result.paddingRight = getUnit(px);
    }
    if (pt) {
      result.paddingTop = getUnit(pt);
    }
    if (pb) {
      result.paddingBottom = getUnit(pb);
    }
    if (pl) {
      result.paddingLeft = getUnit(pl);
    }
    if (pr) {
      result.paddingRight = getUnit(pr);
    }
    Object.entries(rest)
      .forEach(([name, value]) => {
        if (!name.startsWith('on') && !name.startsWith('data') && !name.startsWith('aria')) {
          result[name] = value;
        }
      });
    return { ...result, ...initialStyles };
  }, [m, my, mx, mt, mb, ml, mr, p, px, py, pt, pb, pl, pr, rest, initialStyles]);

  const dataAttributes = useMemo(() => {
    return Object.entries(rest)
      .filter(([name]) => name.startsWith('data') || name.startsWith('aria'))
      .reduce((res, [name, value]) => ({
        ...res,
        [name]: value,
      }), {});
  }, [rest]);

  const handlers = useMemo(() => {
    return Object.entries(rest).reduce((res, [name, value]) => {
      if (!name.startsWith('on')) {
        return res;
      }
      return {
        ...res,
        [name]: value,
      };
    }, {});
  }, [rest]);

  return (
    <Tag
      checked={checked}
      type={type}
      ref={ref}
      tag={component}
      style={styles}
      src={src}
      className={className}
      {...handlers}
      {...dataAttributes}
    >
      {children}
    </Tag>
  );
});

export default Box;
