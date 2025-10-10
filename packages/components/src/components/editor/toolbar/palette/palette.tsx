import { Button, type ButtonProps } from '@/components/common/button/button.tsx';
import { Flex } from '@/components/common/flex/flex';
import { IvyIcon } from '@/components/common/icon/icon';
import { SearchInput } from '@/components/common/input/input';
import { Separator } from '@/components/common/separator/separator';
import { cn } from '@/utils/class-name.ts';
import { IvyIcons } from '@axonivy/ui-icons';
import { useState, type ReactNode } from 'react';
import {
  palette,
  paletteButton,
  paletteButtonButton,
  paletteButtonLabel,
  paletteItem,
  paletteItemIcon,
  paletteItemIvyIcon,
  paletteSectionSeparator,
  paletteTitle
} from './palette.css.ts';

export type PaletteItemConfig = {
  name: string;
  description: string;
  icon?: IvyIcons;
  onClick?: () => void;
};

export type PaletteConfig<TItem extends PaletteItemConfig = PaletteItemConfig> = {
  sections: Record<string, Array<TItem>>;
  options?: {
    searchPlaceholder?: string;
    searchFilter?: (item: TItem, searchTerm: string) => boolean;
    emptyMessage?: ReactNode;
  };
};

export type PaletteProps<TItem extends PaletteItemConfig = PaletteItemConfig> = PaletteConfig<TItem> & {
  children: (title: string, items: Array<TItem>) => ReactNode;
};

const Palette = <TItem extends PaletteItemConfig>({ sections, children, options }: PaletteProps<TItem>) => {
  const [searchTerm, setSearchTerm] = useState('');
  const searchFilter =
    options?.searchFilter ?? ((item: TItem, searchTerm: string) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredSections: Record<string, Array<TItem>> = {};
  for (const section of Object.keys(sections)) {
    const filteredItems = sections[section]?.filter(item => searchFilter(item, searchTerm)) ?? [];
    if (filteredItems.length > 0) {
      filteredSections[section] = filteredItems;
    }
  }
  return (
    <Flex direction='column' className={cn(palette, 'ui-palette')} gap={3}>
      <SearchInput placeholder={options?.searchPlaceholder ?? 'Search'} value={searchTerm} onChange={setSearchTerm} />
      {Object.entries(filteredSections).map(([section, sectionItems]) => children(section, sectionItems))}
      {Object.keys(filteredSections).length === 0 && options?.emptyMessage}
    </Flex>
  );
};
Palette.displayName = 'Palette';

export type PaletteSectionProps<TItem extends PaletteItemConfig = PaletteItemConfig> = {
  title: string;
  items: Array<TItem>;
  children: (props: PaletteItemProps<TItem>) => ReactNode;
};

const PaletteSection = <TItem extends PaletteItemConfig>({ items, title, children }: PaletteSectionProps<TItem>) => (
  <>
    <h3 className={cn(paletteTitle, 'ui-palette-section-title')}>{title}</h3>
    <Flex gap={4} style={{ flexWrap: 'wrap' }} className='ui-palette-section' data-section={title}>
      {items.map(item => children({ ...item, classNames: { paletteItem, paletteItemIcon } }))}
    </Flex>
    <Separator className={paletteSectionSeparator} style={{ marginBlock: 'var(--size-2)' }} />
  </>
);
PaletteSection.displayName = 'PaletteSection';

export type PaletteItemProps<TItem extends PaletteItemConfig = PaletteItemConfig> = TItem & {
  classNames: { paletteItem: string; paletteItemIcon: string };
};

const PaletteItem = <TItem extends PaletteItemConfig>({ name, description, icon, onClick, classNames }: PaletteItemProps<TItem>) => (
  <button className={cn(classNames.paletteItem, 'ui-palette-item')} onClick={onClick} title={description}>
    <Flex direction='column' gap={1} alignItems='center'>
      <Flex className={cn(classNames.paletteItemIcon, 'ui-palette-item-icon')} justifyContent='center' alignItems='center'>
        {icon && <IvyIcon icon={icon} className={paletteItemIvyIcon} />}
      </Flex>
      <Flex justifyContent='center'>{name}</Flex>
    </Flex>
  </button>
);
PaletteItem.displayName = 'PaletteItem';

const PaletteButtonLabel = ({ label, children }: { label: string; children: ReactNode }) => (
  <Flex direction='column' alignItems='center' className={paletteButton}>
    <span className={cn(paletteButtonLabel, 'ui-palette-button-label')}>{label}</span>
    {children}
  </Flex>
);
PaletteButtonLabel.displayName = 'PaletteButtonLabel';

type PaletteButtonProps = ButtonProps & {
  label: string;
  icon: IvyIcons;
  withoutChevron?: boolean;
};

const PaletteButton = ({ label, icon, withoutChevron, className, ...props }: PaletteButtonProps) => (
  <Button aria-label={label} icon={icon} className={cn('ui-palette-button', paletteButtonButton, className)} {...props}>
    {withoutChevron === true ? null : <IvyIcon icon={IvyIcons.Chevron} rotate={90} />}
  </Button>
);
PaletteButton.displayName = 'PaletteButton';

const BasicPalette = (props: PaletteConfig) => (
  <Palette {...props}>
    {(title, items) => (
      <PaletteSection key={title} title={title} items={items}>
        {item => <PaletteItem key={item.name} {...item} />}
      </PaletteSection>
    )}
  </Palette>
);

export { BasicPalette, Palette, PaletteButton, PaletteButtonLabel, PaletteItem, PaletteSection };
