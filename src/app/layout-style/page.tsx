'use client';

import { useState } from 'react';
import { useTranslation, I18nextProvider } from 'react-i18next';
import i18n from '@/i18n';
import styles from './HomePage.module.scss';
import { Button, Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';

type Shape = 
  | 'triangleUp' | 'triangleDown' | 'triangleLeft' | 'triangleRight'
  | 'square' | 'rectangle' | 'circle' | 'oval' | 'trapezoid' | 'parallelogram';

const contentShapesList: Shape[] = [
  'square', 'circle', 'oval',
  'trapezoid', 'rectangle', 'parallelogram'
];

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

const LayoutStylePageContent = () => {
    const { t } = useTranslation();
    const [contentShapes, setContentShapes] = useState<Shape[]>(contentShapesList);
    const handleMoveShape = () => {
        const newShapes = [...contentShapes];
        const firstShape = newShapes.shift(); 
        if (firstShape) { newShapes.push(firstShape); } 
        setContentShapes(newShapes);
    };

    const handleShuffle = () => {
        const shuffledShapes = [...contentShapes].sort(() => Math.random() - 0.5);
        setContentShapes(shuffledShapes);
    };
    
    const rows = [
        contentShapes.slice(0, 3), 
        contentShapes.slice(3, 6), 
    ];
    
    return (
        <div className={styles.pageContainer}>
            <header className={styles.header}>
                <h1 className={styles.pageTitle}>{t('test1Desc')}</h1>
                <LanguageSwitcher />
            </header>

            <main className={styles.shapeGrid}>
                {/* แถวที่ 1 (Action Cards): ส่วนควบคุมที่แยกออกมา */}
                <div className={`${styles.shapeRow} ${styles.actionRow}`}>
                    {/* การ์ดเลื่อนรูปทรง (ซ้าย): รูปทรงตายตัว */}
                    <div className={styles.shapeCard} onClick={handleMoveShape}>
                        <div className={styles.shapeGraphicContainer}>
                           <div className={styles.triangleLeft} />
                        </div>
                        <span className={styles.actionLabel}>{t('moveShapeBtn')}</span>
                    </div>

                    {/* การ์ดสลับตำแหน่ง (ใหญ่): รูปทรงตายตัว */}
                    <div className={`${styles.shapeCard} ${styles.shapeCardDouble}`} onClick={handleShuffle}>
                        <div className={styles.shapeGraphicContainer}>
                           <div className={styles.triangleUp} />
                           <div className={styles.triangleDown} />
                        </div>
                        <span className={styles.actionLabel}>{t('movePositionBtn')}</span>
                    </div>

                    {/* การ์ดเลื่อนรูปทรง (ขวา): รูปทรงตายตัว */}
                    <div className={styles.shapeCard} onClick={handleMoveShape}>
                        <div className={styles.shapeGraphicContainer}>
                           <div className={styles.triangleRight} />
                        </div>
                        <span className={styles.actionLabel}>{t('moveShapeBtn')}</span>
                    </div>
                </div>

                {/* แถวที่ 2 (Content Shapes): แสดงผลแบบไดนามิก */}
                <div className={`${styles.shapeRow} ${styles.isStaggered}`}>
                    {rows[0].map((shape, index) => (
                        <div key={`row2-${index}`} className={styles.shapeCard} onClick={handleShuffle}>
                            <div className={styles.shapeGraphicContainer}>
                                <div className={styles[shape]} />
                            </div>
                        </div>
                    ))}
                </div>

                 {/* แถวที่ 3 (Content Shapes): แสดงผลแบบไดนามิก */}
                 <div className={styles.shapeRow}>
                    {rows[1].map((shape, index) => (
                        <div key={`row3-${index}`} className={styles.shapeCard} onClick={handleShuffle}>
                            <div className={styles.shapeGraphicContainer}>
                                <div className={styles[shape]} />
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default function LayoutStylePage() {
    return (
        <I18nextProvider i18n={i18n}>
            <LayoutStylePageContent />
        </I18nextProvider>
    )
}
