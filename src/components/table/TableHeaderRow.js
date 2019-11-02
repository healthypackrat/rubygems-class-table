import React from 'react';
import TableHeaderCell from './TableHeaderCell';
import SortableTableHeaderCell from './SortableTableHeaderCell';

export default () => {
  return (
    <tr>
      <TableHeaderCell label="#" isNumber={true} width="5em" />
      <SortableTableHeaderCell label="クラス名" sortKey="class_name" isNumber={false} />
      <SortableTableHeaderCell label="クラス概要" sortKey="class_desc" isNumber={true} width="8em" />
      <SortableTableHeaderCell label="メソッド数" sortKey="method_count" isNumber={true} width="8em" />
      <SortableTableHeaderCell label="メソッド概要" sortKey="method_desc" isNumber={true} width="9em" />
      <SortableTableHeaderCell label="合計" sortKey="total" isNumber={true} width="5em" />
    </tr>
  );
};
