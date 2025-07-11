import { Field } from '@/components/common/field/field';
import { cn } from '@/utils/class-name';
import * as React from 'react';
import { body, cell, footer, head, header, root, row, table } from './table.css';

/**
 * Table, based on {@link https://tanstack.com/table/v8 | Tanstack Table}
 */
const Table = ({ className, ...props }: React.ComponentProps<'table'>) => (
  <Field className={cn(root, 'ui-table-root')}>
    <table className={cn(table, className, 'ui-table')} tabIndex={0} {...props} />
  </Field>
);
Table.displayName = 'Table';

const TableHeader = ({ className, ...props }: React.ComponentProps<'thead'>) => (
  <thead className={cn(header, className, 'ui-table-header')} {...props} />
);
TableHeader.displayName = 'TableHeader';

const TableBody = ({ className, ...props }: React.ComponentProps<'tbody'>) => (
  <tbody className={cn(body, className, 'ui-table-body')} {...props} />
);
TableBody.displayName = 'TableBody';

const TableFooter = ({ className, ...props }: React.ComponentProps<'tfoot'>) => (
  <tfoot className={cn(footer, className, 'ui-table-footer')} {...props} />
);
TableFooter.displayName = 'TableFooter';

export const ROW_VIRTUALIZE_INDEX_ATTRIBUTE = 'data-vindex';

type TableRowProps = React.ComponentProps<'tr'> & {
  vindex?: number | string;
};

const TableRow = ({ className, vindex, ...props }: TableRowProps) => (
  <tr className={cn(row, className, 'ui-table-row')} {...{ [ROW_VIRTUALIZE_INDEX_ATTRIBUTE]: vindex }} {...props} />
);
TableRow.displayName = 'TableRow';

const TableHead = ({ className, ...props }: React.ComponentProps<'th'>) => (
  <th className={cn(head, className, 'ui-table-head')} {...props} />
);
TableHead.displayName = 'TableHead';

const TableCell = ({ className, ...props }: React.ComponentProps<'td'>) => (
  <td className={cn(cell, className, 'ui-table-cell')} {...props} />
);
TableCell.displayName = 'TableCell';

export { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow };
