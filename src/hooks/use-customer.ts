'use client'

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Customer, retrieveCustomer, login, signup, signout } from "@/api/customer"

/**
 * Hook: 获取当前登录客户信息
 */
export const useGetCustomer = () => {
  const query = useQuery<Customer | null, Error>({
    queryKey: ["useGetCustomer"],
    queryFn: async () => {
      return await retrieveCustomer();
    },
    staleTime: 90_000,
    refetchOnWindowFocus: true,
  });

  return query;
};

/**
 * Hook: 登录
 */
export const useLogin = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    any,
    Error,
    { email: string, password: string }
  >({
    mutationFn: async (data) => {
      return await login(data.email, data.password);
    },
    onError: (err) => {
      console.error("Failed to login:", err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useGetCustomer"] });
    }
  });

  return {
    handler: mutation.mutateAsync,
    ...mutation,
  };
};

/**
 * Hook: 登出
 */
export const useLogout = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    any,
    Error,
    void
  >({
    mutationFn: async () => {
      return await signout();;
    },
    onError: (err) => {
      console.error("Failed to signout:", err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useGetCustomer"] });
    }
  });

  return {
    handler: mutation.mutateAsync,
    ...mutation,
  };
};

export const useSignup = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    any,
    Error,
    any
  >({
    mutationFn: async (data) => {
      return await signup(data);
    },
    onError: (err) => {
      console.error("Failed to signup:", err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useGetCustomer"] });
    }
  });

  return {
    handler: mutation.mutateAsync,
    ...mutation,
  };
};
