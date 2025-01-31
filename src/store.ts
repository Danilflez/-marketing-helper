import {create} from 'zustand';

interface IStore {
  openConfirmCode: boolean;
  openResetPassword: boolean;
  openChangeEmail: boolean;
  openSubscription: boolean;
  campaign: null | Record<string, string>;
  subscriptionInfo: null | Record<string, string>;
  statistic: null | Record<any, any>;

  setOpenConfirmCode: (param: boolean) => void;
  setOpenResetPassword: (param: boolean) => void;
  setOpenChangeEmail: (param: boolean) => void;
  setOpenSubscription: (param: boolean) => void;
  setCampaign: (param: Record<string, string>) => void;
  setSubscriptionInfo: (param: Record<string, string>) => void;
  setStatistic: (param: Record<string, string>) => void;
}

export const useStore = create<IStore>()((set) => ({
  openChangeEmail: false,
  setOpenChangeEmail: (value) => set(() => ({openChangeEmail: value})),

  openConfirmCode: false,
  setOpenConfirmCode: (value) => set(() => ({openConfirmCode: value})),

  openResetPassword: false,
  setOpenResetPassword: (value) => set(() => ({openResetPassword: value})),

  campaign: null,
  setCampaign: (value) => set(() => ({campaign: value})),

  openSubscription: false,
  setOpenSubscription: (value) => set(() => ({openSubscription: value})),

  subscriptionInfo: null,
  setSubscriptionInfo: (value) => set(() => ({subscriptionInfo: value})),

  statistic: null,
  setStatistic: (value) => set(() => ({statistic: value}))
}));
