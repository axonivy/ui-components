import type * as React from 'react';
import { Button, Flex, IvyIcon } from '@/components';
import { IvyIcons } from '@axonivy/ui-icons';
import type { CellContext, Row } from '@tanstack/react-table';
import { cellIcon, expandButton } from './tree.css';

type LazyExpand<TData> = { isLoaded: boolean; loadChildren: (row: Row<TData>) => void };

type ExpandableCellProps<TData> = {
  cell: CellContext<TData, string>;
  icon?: IvyIcons;
  lazy?: LazyExpand<TData>;
  children?: React.ReactNode;
};

const expanedButton = <TData,>(row: Row<TData>, lazy?: LazyExpand<TData>) => {
  const expandHandlerProps = (handler: () => void) => ({
    onMouseDown: handler,
    onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Enter' || e.key === ' ') handler();
    }
  });
  if (row.getCanExpand()) {
    return (
      <Button
        icon={IvyIcons.Chevron}
        className={expandButton}
        aria-label={row.getIsExpanded() ? 'Collapse row' : 'Expand row'}
        data-state={row.getIsExpanded() ? 'expanded' : 'collapsed'}
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

const indent = <TData,>(row: Row<TData>, icon?: IvyIcons, lazy?: LazyExpand<TData>) => {
  const indent = row.depth * 20;
  if (row.getCanExpand() || (lazy && lazy.isLoaded === false)) {
    return indent;
  }
  const base = icon ? 24 : 0;
  return base + indent;
};

const ExpandableCell = <TData,>({ cell, icon, lazy, children }: ExpandableCellProps<TData>) => (
  <Flex direction='row' alignItems='center' gap={1} style={{ paddingLeft: `${indent(cell.row, icon, lazy)}px` }}>
    {expanedButton(cell.row, lazy)}
    {icon && <IvyIcon icon={icon} className={cellIcon} />}
    {children ? children : <span>{cell.getValue()}</span>}
  </Flex>
);
ExpandableCell.displayName = 'ExpandableCell';

export { ExpandableCell };
