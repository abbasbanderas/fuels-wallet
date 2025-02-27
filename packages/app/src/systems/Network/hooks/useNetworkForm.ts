/* eslint-disable @typescript-eslint/no-unused-expressions */
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { isValidNetworkUrl } from '../utils';

import type { Maybe } from '~/systems/Core';

export type NetworkFormValues = {
  name: string;
  url: string;
};

const schema = yup
  .object({
    name: yup.string().required('Name is required'),
    url: yup
      .string()
      .test('is-url-valid', 'URL is not valid', isValidNetworkUrl)
      .required('URL is required'),
  })
  .required();

const DEFAULT_VALUES = {
  name: '',
  url: '',
};

export type UseNetworkFormReturn = ReturnType<typeof useNetworkForm>;

export type UseAddNetworkOpts = {
  defaultValues?: Maybe<NetworkFormValues>;
};

export function useNetworkForm(opts: UseAddNetworkOpts = {}) {
  const form = useForm<NetworkFormValues>({
    resolver: yupResolver(schema),
    reValidateMode: 'onChange',
    mode: 'onChange',
    defaultValues: opts.defaultValues || DEFAULT_VALUES,
  });

  useEffect(() => {
    opts.defaultValues && form.reset(opts.defaultValues);
  }, [opts.defaultValues?.name, opts.defaultValues?.url]);

  return form;
}
