import React from 'react';
import classnames from 'classnames';

export default ({ label, isNumber, width }) => {
  const className = classnames({ 'text-right': isNumber });
  const style = { width: width };
  return <th className={className} style={style}>{label}</th>;
};
