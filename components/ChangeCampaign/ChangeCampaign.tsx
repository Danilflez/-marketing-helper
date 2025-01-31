'use client';

import Btn from '@/components/UI/Btn/Btn';
import {DatePicker, Form, Input, Modal} from 'antd';
import {useMutation} from 'react-query';
import {customNotification} from '@/src/helpers/customNotification';

import {useStore} from '@/src/store';
import {ChangeCampaign, StatisticCampaign} from '@/src/api';
import dayjs from 'dayjs';
import {useEffect, useMemo, useState} from 'react';
import {useRouter} from 'next/navigation';
import Loading from '@/app/loading';
import Link from 'next/link';
import {getCookie} from 'cookies-next';
import loader from '../../public/image/loader.json';
import Image from 'next/image';
import {Player} from '@lottiefiles/react-lottie-player';

const {RangePicker} = DatePicker;

const dateFormat = 'YYYY/MM/DD';

export const ChangeCampaignModal = () => {
  const router = useRouter();
  const {campaign, setCampaign, subscriptionInfo} = useStore();
  const {mutate, isLoading} = useMutation(ChangeCampaign);
  const {mutate: getData, isLoading: isDataLoading} = useMutation(StatisticCampaign);
  const [initialValues, setInitialValues] = useState(null);
  const camebackUrl = !!getCookie('token') ? '/dashboard/settings' : '/';
  const onFinish = (value) => {
    mutate(value, {
      onSuccess: (data) => {
        if (!data?.message) return;
        if (data?.message === 'Успешно сохранено') {
          setCampaign(value);

          if (subscriptionInfo?.subscriptionPlan) {
            getData(null, {
              onSuccess: (data) => {
                if (data?.message === 'Успешно сохранено') {
                  router.push('/dashboard/settings');
                }
              }
            });
            return;
          }

          router.push('/subscription');
        }
        customNotification('info', 'top', 'Информация', data?.message);
      }
    });
  };

  useEffect(() => {
    if (campaign === null) return;
    if (campaign.date) {
      const [startDate, endDate] = campaign.date;
      return setInitialValues({
        ...campaign,
        date: [dayjs(startDate), dayjs(endDate)]
      });
    }

    setInitialValues(campaign);
  }, [campaign]);

  if (isDataLoading) {
    return (
      <div className='flex flex-col items-center'>
        <Player src={loader} className='' loop autoplay />
        <h2>Генерация новых данных...</h2>
        <p className='text-gray-300'>Пожалуйста подождите</p>
      </div>
    );
  }

  if (initialValues === null && campaign !== null) {
    return <Loading />;
  }

  return (
    <div className='w-full'>
      <h2 className='mb-3'>Заполните форму вашей кампании</h2>
      <div>
        <Form layout='vertical' onFinish={onFinish} initialValues={initialValues} requiredMark={false}>
          <Form.Item label='Название' name='name' rules={[{required: true, message: 'Выберите название'}]}>
            <Input />
          </Form.Item>
          <Form.Item label='Ниша' name='niche' rules={[{required: true, message: 'Выберите название ниши'}]}>
            <Input />
          </Form.Item>
          <Form.Item
            label='Кратко о продукте'
            name='product'
            rules={[{required: true, message: 'Выберите название продукта'}]}
          >
            <Input />
          </Form.Item>
          <Form.Item label='Дата периода кампании (необязательно)' name='date' validateTrigger={['onChange', 'onBlur']}>
            <RangePicker format={dateFormat} />
          </Form.Item>
          <Form.Item label='Основной канал (необязательно)' name='channel'>
            <Input />
          </Form.Item>
          <Form.Item label='Цель конверсии (необязательно)' name='conversion'>
            <Input />
          </Form.Item>
          <Form.Item label='Расходы (необязательно)' name='expenses'>
            <Input />
          </Form.Item>
          <Form.Item label='Желаемый доход (необязательно)' name='income'>
            <Input />
          </Form.Item>
          <div className='flex gap-2 md:flex-col'>
            <Link href={camebackUrl} className='w-1/2 md:w-full'>
              <Btn primary className='w-full'>
                Вернуться назад
              </Btn>
            </Link>
            <Btn className='w-1/2 md:w-full' htmlTypeButton='submit' loading={isLoading}>
              Сохранить
            </Btn>
          </div>
        </Form>
      </div>
    </div>
  );
};
