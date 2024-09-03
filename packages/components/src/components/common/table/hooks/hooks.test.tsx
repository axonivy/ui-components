import { useTableGlobalFilter } from '@/components/common/table/hooks/hooks';
import { cleanup, render, renderHook, screen } from 'test-utils';
import { expect, describe, test } from 'vitest';

const TableSearch = ({ options }: { options?: Parameters<typeof useTableGlobalFilter>[0] }) => {
  const globalFilter = useTableGlobalFilter(options);
  return <>{globalFilter.filter}</>;
};

describe('useTableGlobalFilter', () => {
  test('no options', async () => {
    const { result } = renderHook(() => useTableGlobalFilter());
    expect(result.current.filter).not.toBeNull();
    expect(result.current.tableState.globalFilter).toEqual('');
    expect(result.current.options.filterFromLeafRows).toBeTruthy();
  });

  test('option active', async () => {
    const { result: active } = renderHook(() => useTableGlobalFilter({ searchActive: true }));
    expect(active.current.filter).not.toBeNull();
    const { result: inactive } = renderHook(() => useTableGlobalFilter({ searchActive: false }));
    expect(inactive.current.filter).toBeNull();
  });

  test('option autofocus', async () => {
    render(<TableSearch />);
    expect(screen.getByRole('textbox')).not.toHaveFocus();
    cleanup();
    render(<TableSearch options={{ searchAutoFocus: true }} />);
    expect(screen.getByRole('textbox')).toHaveFocus();
  });

  test('option placeholder', async () => {
    const view = render(<TableSearch />);
    expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'Search');
    view.rerender(<TableSearch options={{ searchPlaceholder: 'blabla' }} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'blabla');
  });
});
