'use client';

import { useRouter } from 'next/navigation';
import { useTranslation, I18nextProvider } from 'react-i18next';
import i18n from '@/i18n';
import styles from './LandingPage.module.scss';
import { Button, Dropdown, Space } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

const TestCard = ({ title, description, onClick }: { title: string, description: string, onClick: () => void }) => (
    <div className={styles.testCard} onClick={onClick}>
        <h2 className={styles.testTitle}>{title}</h2>
        <p className={styles.testDescription}>{description}</p>
    </div>
);

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const handleMenuClick: MenuProps['onClick'] = (e) => {
        i18n.changeLanguage(e.key);
    };
    const items: MenuProps['items'] = [
        { label: 'English', key: 'en' },
        { label: 'ไทย', key: 'th' },
    ];
    return (
        <Dropdown menu={{ items, onClick: handleMenuClick }}>
            <Button>
                <Space>
                    <GlobalOutlined />
                    {i18n.language.toUpperCase()}
                </Space>
            </Button>
        </Dropdown>
    );
};


const LandingPageContent = () => {
    const { t } = useTranslation();
    const router = useRouter();

    return (
        <main className={styles.container}>
            <div className={styles.langSwitcher}>
                <LanguageSwitcher />
            </div>
            <div className={styles.cardGrid}>
                <TestCard 
                    title={t('test1Title')} 
                    description={t('test1Desc')} 
                    onClick={() => router.push('/layout-style')}
                />
                 <TestCard 
                    title={t('test2Title')} 
                    description={t('test2Desc')} 
                    onClick={() => alert('API Test page is not implemented yet.')} 
                />
                 <TestCard 
                    title={t('test3Title')} 
                    description={t('test3Desc')} 
                    onClick={() => router.push('/form')}
                />
            </div>
        </main>
    );
};

export default function Home() {
    return (
        <I18nextProvider i18n={i18n}>
            <LandingPageContent />
        </I18nextProvider>
    );
}