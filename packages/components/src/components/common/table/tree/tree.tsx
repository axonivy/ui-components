import { Button } from '@/components/common/button/button';
import { Flex } from '@/components/common/flex/flex';
import { IvyIcon } from '@/components/common/icon/icon';
import type { DataTableFeatures } from '@/components/common/table/utils';
import { IvyIcons } from '@axonivy/ui-icons';
import type { CellContext, Row, RowData } from '@tanstack/react-table';
import type { KeyboardEvent, ReactNode } from 'react';
import { cellIcon, expandButton, expandCell, indent } from './tree.css';

type LazyExpand<TData extends RowData> = { isLoaded: boolean; loadChildren: (row: Row<DataTableFeatures, TData>) => void };

type ExpandableCellProps<TData extends RowData> = {
  cell: CellContext<DataTableFeatures, TData, string>;
  icon?: IvyIcons;
  lazy?: LazyExpand<TData>;
  children?: ReactNode;
};

const expandHandlerProps = (handler: () => void) => ({
  onMouseDown: handler,
  onKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') handler();
  }
});

const expandedButton = <TData extends RowData>(row: Row<DataTableFeatures, TData>, lazy?: LazyExpand<TData>) => {
  if (row.getCanExpand()) {
    return (
      <Button
        icon={IvyIcons.Chevron}
        className={expandButton}
        aria-label={row.getIsExpanded() ? 'Collapse row' : 'Expand row'}
        data-state={row.getIsExpanded() ? 'expanded' : 'collapsed'}
        tabIndex={-1}
        {...expandHandlerProps(row.getToggleExpandedHandler())}
      />
    );
  }
  if (lazy && lazy.isLoaded === false) {
    const loadLazy = () => {
      lazy.loadChildren(row);
      row.toggleExpanded(true);
    };
    return (
      <Button
        icon={IvyIcons.Chevron}
        className={expandButton}
        aria-label='Expand row'
        data-state='collapsed'
        {...expandHandlerProps(loadLazy)}
      />
    );
  }
  return null;
};

function ExpandableCell<TData extends RowData>({ cell, icon, lazy, children }: ExpandableCellProps<TData>) {
  const expButton = expandedButton(cell.row, lazy);
  return (
    <Flex direction='row' alignItems='center' gap={1} className={expandCell} style={expButton || icon ? {} : { paddingLeft: 24 }}>
      {Array.from({ length: cell.row.depth }, (_, i) => (
        <div key={i} className={indent} />
      ))}
      {expButton}
      {icon && <IvyIcon style={expButton ? {} : { paddingLeft: 24 }} icon={icon} className={cellIcon} />}
      {children ? children : <span>{cell.getValue()}</span>}
    </Flex>
  );
}

export { ExpandableCell };
