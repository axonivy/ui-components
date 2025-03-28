import { Flex } from '@/components/common/flex/flex';
import { IvyIcon } from '@/components/common/icon/icon';
import { SearchInput } from '@/components/common/input/input';
import { Separator } from '@/components/common/separator/separator';
import { IvyIcons } from '@axonivy/ui-icons';
import * as React from 'react';
import './palette.css';

export type PaletteItemConfig = {
  name: string;
  description: string;
  icon: IvyIcons | React.ReactNode;
};

export type PaletteConfig = {
  sections: Record<string, Array<PaletteItemConfig>>;
  options?: {
    searchPlaceholder?: string;
  };
};

export type PaletteProps = PaletteConfig & {
  children: (title: string, items: Array<PaletteItemConfig>) => React.ReactNode;
};

const Palette = ({ sections, children, options }: PaletteProps) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  return (
    <Flex direction='column' className='palette' gap={3}>
      <SearchInput placeholder={options?.searchPlaceholder ?? 'Search'} value={searchTerm} onChange={setSearchTerm} />
      {Object.entries(sections).map(([section, sectionItems]) => {
        const filteredItems = sectionItems.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
        if (filteredItems.length > 0) {
          return children(section, filteredItems);
        }
        return null;
      })}
    </Flex>
  );
};
Palette.displayName = 'Palette';

type PaletteSectionProps = {
  title: string;
  items: Array<PaletteItemConfig>;
  children: (item: PaletteItemConfig) => React.ReactNode;
};

const PaletteSection = ({ items, title, children }: PaletteSectionProps) => (
  <>
    <h3 className='palette-section-title'>{title}</h3>
    <Flex gap={4} style={{ flexWrap: 'wrap' }}>
      {items.map(item => children(item))}
    </Flex>
    <Separator style={{ marginBlock: 'var(--size-2)' }} />
  </>
);
PaletteSection.displayName = 'PaletteSection';

const PaletteItem = ({ name, description, icon }: PaletteItemConfig) => (
  <Flex className='palette-item' direction='column' gap={1} alignItems='center' title={description}>
    <Flex className='palette-item-icon' justifyContent='center' alignItems='center'>
      {typeof icon === 'string' ? <IvyIcon icon={icon as IvyIcons} /> : icon}
    </Flex>
    <Flex justifyContent='center'>{name}</Flex>
  </Flex>
);
PaletteItem.displayName = 'PaletteItem';

const BasicPalette = (props: PaletteConfig) => (
  <Palette {...props}>
    {(title, items) => (
      <PaletteSection key={title} title={title} items={items}>
        {item => <PaletteItem key={item.name} {...item} />}
      </PaletteSection>
    )}
  </Palette>
);

export { Palette, PaletteSection, PaletteItem, BasicPalette };
