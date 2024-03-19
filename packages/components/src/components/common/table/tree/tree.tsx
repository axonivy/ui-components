import { Button, Flex, IvyIcon } from '@/components';
import { IvyIcons } from '@axonivy/ui-icons';
import type { CellContext, Row } from '@tanstack/react-table';
import { expandButton } from './tree.css';

type LazyExpand = { isLoaded: boolean; loadChildren: () => void };

type ExpandableCellProps<TData> = {
  cell: CellContext<TData, string>;
  icon?: IvyIcons;
  title?: string; //not supported yet
  additionalInfo?: string; //not supported yet
  lazy?: LazyExpand; //not supported yet
};

const expanedButton = <TData,>(row: Row<TData>, lazy?: LazyExpand) => {
  if (row.getCanExpand()) {
    return (
      <Button
        icon={IvyIcons.Chevron}
        className={expandButton}
        aria-label={row.getIsExpanded() ? 'Collapse row' : 'Expand row'}
        data-state={row.getIsExpanded() ? 'expanded' : 'collapsed'}
        onClick={row.getToggleExpandedHandler()}
      />
    );
  }
  if (lazy && lazy.isLoaded === false) {
    const loadLazy = () => {
      lazy.loadChildren();
      row.toggleExpanded(true);
    };
    return <Button icon={IvyIcons.Chevron} className={expandButton} aria-label='Expand row' onClick={loadLazy} data-state='collapsed' />;
  }
  return null;
};

const rotIndent = <TData,>(row: Row<TData>, icon?: IvyIcons) => {
  const indent = row.depth * 20;
  if (row.getCanExpand()) {
    return indent;
  }
  const base = row.depth > 0 && icon ? 24 : 0;
  return base + indent;
};

const ExpandableCell = <TData,>({ cell, icon, lazy }: ExpandableCellProps<TData>) => {
  const row = cell.row;
  return (
    <Flex direction='row' alignItems='center' gap={1} style={{ paddingLeft: `${rotIndent(cell.row, icon)}px` }}>
      {expanedButton(row, lazy)}
      {icon && <IvyIcon icon={icon} />}
      <span>{cell.getValue()}</span>
    </Flex>
  );
};
ExpandableCell.displayName = 'ExpandableCell';

export { ExpandableCell };
