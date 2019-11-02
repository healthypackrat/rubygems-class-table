import React from 'react';
import classnames from 'classnames';

export default ({ entry }) => {
  return (
    <td>
      <a href={entry.url}
        className={classnames({'text-secondary': entry.total === 0})}
        target="_blank"
        rel="noopener noreferrer"
      >{entry.class_name}</a>
    </td>
  );
};
