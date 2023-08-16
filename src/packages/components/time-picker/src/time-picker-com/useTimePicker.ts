import { ref, watch } from 'vue';

import type { Dayjs } from 'dayjs';

const makeList = (total: any, method: any, methodFunc: any) => {
  const arr = [];
  const disabledArr = method && methodFunc();
  for (let i = 0; i < total; i++) {
    arr[i] = disabledArr ? disabledArr.includes(i) : false;
  }
  return arr;
};

const makeAvailableArr = (list: any) => {
  return list.map((_: any, index: any) => (!_ ? index : _)).filter((_) => _ !== true);
};

export const getTimeLists = (disabledHours: any, disabledMinutes: any, disabledSeconds: any) => {
  const getHoursList = (role: any, compare?: any) => {
    return makeList(24, disabledHours, () => disabledHours(role, compare));
  };

  const getMinutesList = (hour: any, role: any, compare?: any) => {
    return makeList(60, disabledMinutes, () => disabledMinutes(hour, role, compare));
  };

  const getSecondsList = (hour: any, minute: any, role: any, compare?: any) => {
    return makeList(60, disabledSeconds, () => disabledSeconds(hour, minute, role, compare));
  };

  return {
    getHoursList,
    getMinutesList,
    getSecondsList
  };
};

export const getAvailableArrs = (disabledHours: any, disabledMinutes: any, disabledSeconds: any) => {
  const { getHoursList, getMinutesList, getSecondsList } = getTimeLists(
    disabledHours,
    disabledMinutes,
    disabledSeconds
  );

  const getAvailableHours = (role: any, compare?: any) => {
    return makeAvailableArr(getHoursList(role, compare));
  };

  const getAvailableMinutes = (hour: any, role: any, compare?: any) => {
    return makeAvailableArr(getMinutesList(hour, role, compare));
  };

  const getAvailableSeconds = (hour: any, minute: any, role: any, compare?: any) => {
    return makeAvailableArr(getSecondsList(hour, minute, role, compare));
  };

  return {
    getAvailableHours,
    getAvailableMinutes,
    getAvailableSeconds
  };
};

export const useOldValue = (props: { parsedValue?: string | Dayjs | Dayjs[]; visible: boolean }) => {
  const oldValue = ref(props.parsedValue);

  watch(
    () => props.visible,
    (val) => {
      if (!val) {
        oldValue.value = props.parsedValue;
      }
    }
  );

  return oldValue;
};
