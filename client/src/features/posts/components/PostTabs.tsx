import { TabItem, Tabs } from 'flowbite-react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FaRegNewspaper } from 'react-icons/fa';
import { TbChartBarPopular } from 'react-icons/tb';

interface IPostTabsProps {
  setTab: (tab: string) => void;
  setPage: (page: number) => void;
  tab: string;
}

export const PostTabs: FC<IPostTabsProps> = ({ setTab, setPage, tab }) => {
  const { t } = useTranslation();
  return (
    <Tabs
      onActiveTabChange={(tabIndex) => {
        const selectedTab = tabIndex === 0 ? 'new' : 'popular';
        setTab(selectedTab);
        setPage(1);
      }}
      aria-label="Tabs with underline"
      variant="underline"
    >
      <TabItem
        active={tab === 'new'}
        title={t('titles.new_posts')}
        icon={FaRegNewspaper}
      />
      <TabItem
        active={tab === 'popular'}
        title={t('titles.popular_posts')}
        icon={TbChartBarPopular}
      />
    </Tabs>
  );
};
