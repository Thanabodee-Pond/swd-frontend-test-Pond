'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import i18n from '@/i18n';
import styles from './FormPage.module.scss';

// Ant Design Components
import {
    Typography, Button, Table, Form, Input, Space,
    Row, Col, Select, DatePicker, Radio, InputNumber, Checkbox, Popconfirm,
    Dropdown, Pagination, message
} from 'antd';
import type { FormProps, TableProps, GetProp, PaginationProps } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/store/store';
import { Person, addPerson, deletePerson, updatePerson, deleteMultiplePersons } from '@/lib/store/personSlice';

// Dayjs
import dayjs from 'dayjs';
import 'dayjs/locale/th';

// Provider
import { useTranslation, I18nextProvider } from 'react-i18next';

const { Title } = Typography;
const { Option } = Select;

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const handleMenuClick: MenuProps['onClick'] = (e) => { i18n.changeLanguage(e.key); dayjs.locale(e.key); };
    const items: MenuProps['items'] = [ { label: 'English', key: 'en' }, { label: 'ไทย', key: 'th' } ];
    return (
        <Dropdown menu={{ items, onClick: handleMenuClick }}>
            <Button ghost>
                <GlobalOutlined />
                <span style={{ marginLeft: 8 }}>{i18n.language.toUpperCase()}</span>
            </Button>
        </Dropdown>
    );
};

const FormPageContent = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const persons = useSelector((state: RootState) => state.persons);
    const dispatch: AppDispatch = useDispatch();

    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState<string | null>(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [hasMounted, setHasMounted] = useState(false);
    
    const [sortInfo, setSortInfo] = useState<{columnKey?: React.Key; order?: 'ascend' | 'descend' | null}>({});
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    useEffect(() => { setHasMounted(true); dayjs.locale(i18n.language); }, [i18n.language]);

    const onFinish: FormProps<Person>['onFinish'] = (values) => {
        const citizenIdValue = values.citizenId && Array.isArray(values.citizenId) ? Object.values(values.citizenId).filter(v => v).join('') : '';
        const formattedValues = { ...values, birthday: dayjs(values.birthday).format('YYYY-MM-DD'), expectedSalary: Number(values.expectedSalary), citizenId: citizenIdValue };
        
        if (editingKey) {
            dispatch(updatePerson({ ...formattedValues, key: editingKey }));
        } else {
            dispatch(addPerson({ ...formattedValues, key: Date.now().toString() }));
        }

        message.success('Save Success');

        form.resetFields();
        setEditingKey(null);
    };
    
    const handleEdit = (record: Person) => {
        const citizenIdArray = record.citizenId ? [ record.citizenId.substring(0, 1), record.citizenId.substring(1, 5), record.citizenId.substring(5, 10), record.citizenId.substring(10, 12), record.citizenId.substring(12, 13) ] : [];
        form.setFieldsValue({ ...record, birthday: record.birthday ? dayjs(record.birthday) : null, citizenId: citizenIdArray });
        setEditingKey(record.key);
        window.scrollTo(0, 0);
    };
    
    const handleDelete = (key: string) => {
        dispatch(deletePerson(key));
        message.success('Delete Success');
    };

    const handleBulkDelete = () => {
        dispatch(deleteMultiplePersons({ keys: selectedRowKeys as string[] }));
        message.success('Delete Success'); // เพิ่มการแจ้งเตือน
        setSelectedRowKeys([]);
    };

    const handleReset = () => { form.resetFields(); setEditingKey(null); };
    
    const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
        if (!Array.isArray(sorter)) {
            setSortInfo({ columnKey: sorter.key, order: sorter.order });
        }
    };

    const rowSelection = { selectedRowKeys, onChange: (keys: React.Key[]) => setSelectedRowKeys(keys) };
    
    const processedData = useMemo(() => {
        let sortedPersons = [...persons];
        if (sortInfo.order && sortInfo.columnKey) {
            sortedPersons.sort((a, b) => {
                const valA = a[sortInfo.columnKey as keyof Person] ?? '';
                const valB = b[sortInfo.columnKey as keyof Person] ?? '';
                if (valA < valB) return sortInfo.order === 'ascend' ? -1 : 1;
                if (valA > valB) return sortInfo.order === 'ascend' ? 1 : -1;
                return 0;
            });
        }
        return sortedPersons;
    }, [persons, sortInfo]);

    const paginatedData = useMemo(() => {
        return processedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    }, [processedData, currentPage, pageSize]);

    const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
        const customStyle = {
            fontWeight: 'bold',
            color: 'black'
        };

        if (type === 'prev') {
            return <a style={customStyle}>PREV</a>;
        }
        if (type === 'next') {
            return <a style={customStyle}>NEXT</a>;
        }
        return originalElement;
    };

    const columns: TableProps<Person>['columns'] = [
        { title: t('tableNameHeader'), key: 'firstname', sorter: true, render: (_, record) => `${record.firstname} ${record.lastname}` },
        { title: t('tableGenderHeader'), dataIndex: 'gender', key: 'gender', sorter: true },
        { title: t('tableMobileHeader'), dataIndex: 'mobilePhone', key: 'mobilePhone', sorter: true },
        { title: t('tableNationalityHeader'), dataIndex: 'nationality', key: 'nationality', sorter: true },
        { title: t('tableManageHeader'), key: 'action', render: (_, record) => ( <Space size="middle"><a onClick={() => handleEdit(record)}>EDIT</a><Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}><a>DELETE</a></Popconfirm></Space> ) },
    ];

    if (!hasMounted) return null;

    return (
        <div className={styles.pageContainer}>
            <header className={styles.header}>
                <Title level={2} className={styles.pageTitle}>{t('test3Desc')}</Title>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                    <LanguageSwitcher />
                    <Button onClick={() => router.push('/')}>{t('homeBtn')}</Button>
                </div>
            </header>
            
            <div className={styles.mainContent}>
                <div className={styles.formContainer}>
                    <Form form={form} onFinish={onFinish} layout="horizontal" labelAlign="left">
                        <Row gutter={24}>
                            <Col span={8}><Form.Item name="title" label={t('formTitleLabel')} rules={[{ required: true }]}><Select placeholder="Title"><Option value="Mr.">Mr.</Option><Option value="Mrs.">Mrs.</Option><Option value="Ms.">Ms.</Option></Select></Form.Item></Col>
                            <Col span={8}><Form.Item name="firstname" label={t('formFirstnameLabel')} rules={[{ required: true }]}><Input /></Form.Item></Col>
                            <Col span={8}><Form.Item name="lastname" label={t('formLastnameLabel')} rules={[{ required: true }]}><Input /></Form.Item></Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={10}><Form.Item name="birthday" label={t('formBirthdayLabel')} rules={[{ required: true }]}><DatePicker placeholder="mm/dd/yyyy" style={{width: '300px'}}/></Form.Item></Col>
                            <Col span={14}><Form.Item name="nationality" label={t('formNationalityLabel')} rules={[{ required: true }]} ><Select placeholder="-- Please Select --" style={{width: '300px'}}><Option value="Thai">Thai</Option><Option value="French">French</Option><Option value="American">American</Option></Select></Form.Item></Col>
                        </Row>
                        <Form.Item label={t('formCitizenIdLabel')} className={styles.citizenIdFormItem}>
                            <div className={styles.citizenIdSpace}>
                                <Form.Item name={['citizenId', 0]} noStyle><Input style={{ width: '50px' }} maxLength={1} /></Form.Item> -
                                <Form.Item name={['citizenId', 1]} noStyle><Input style={{ width: '100px' }} maxLength={4}/></Form.Item> -
                                <Form.Item name={['citizenId', 2]} noStyle><Input style={{ width: '120px' }} maxLength={5}/></Form.Item> -
                                <Form.Item name={['citizenId', 3]} noStyle><Input style={{ width: '70px' }} maxLength={2}/></Form.Item> -
                                <Form.Item name={['citizenId', 4]} noStyle><Input style={{ width: '50px' }} maxLength={1}/></Form.Item>
                            </div>
                        </Form.Item>
                        <Form.Item name="gender" label={t('formGenderLabel')} rules={[{ required: true }]}>
                            <Radio.Group><Radio value="Male">Male</Radio><Radio value="Female">Female</Radio><Radio value="Unisex">Unisex</Radio></Radio.Group>
                        </Form.Item>

                        <Form.Item label={t('formMobilePhoneLabel')} required>
                            <Row align="middle" gutter={8}>
                                <Col>
                                    <Select defaultValue="+66" style={{ width: '200px' }}>
                                        <Option value="+66">+66</Option>
                                        <Option value="+1">+1</Option>
                                        <Option value="+33">+33</Option>
                                    </Select>
                                </Col>
                                <Col>
                                    <span>-</span>
                                </Col>
                                <Col>
                                    <Form.Item name="mobilePhone" noStyle rules={[{ required: true, message: 'Please input your phone number!' }]}>
                                        <Input style={{ width: '300px' }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form.Item>
                        
                        <Form.Item name="passportNo" label={t('formPassportNoLabel')}><Input style={{width: '330px'}}/></Form.Item>
                        <Row align="bottom">
                            <Col span={16}>
                                <Form.Item
                                    name="expectedSalary"
                                    label={t('formExpectedSalaryLabel')}
                                    rules={[{ required: true }]}
                                >
                                    <InputNumber style={{ width: '330px' }} />
                                </Form.Item>
                            </Col>
                            <Col span={6} style={{ paddingBottom: '24px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Button onClick={handleReset}>{t('formResetBtn')}</Button>
                                    <Button type="primary" htmlType="submit">{t('formSubmitBtn')}</Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </div>

                <div className={styles.tableControlsContainer}>
                    <Space>
                        <Checkbox onChange={(e) => setSelectedRowKeys(e.target.checked ? persons.map(p => p.key) : [])} disabled={persons.length === 0}>{t('tableSelectAll')}</Checkbox>
                        <Button disabled={selectedRowKeys.length === 0} onClick={handleBulkDelete}>{t('tableDeleteBtn')}</Button>
                    </Space>
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={persons.length}
                        onChange={(page) => setCurrentPage(page)}
                        showSizeChanger={false}
                        itemRender={itemRender}
                    />
                </div>

                <div className={styles.tableContainer}>
                    <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={paginatedData}
                        rowKey="key"
                        pagination={false}
                        onChange={handleTableChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default function FormAndTablePage() {
    return (
        <I18nextProvider i18n={i18n}>
            <FormPageContent />
        </I18nextProvider>
    )
}