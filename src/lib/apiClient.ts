// lib/apiClient.ts
import { cache } from 'react';
import { apiFetch, RequestConfig } from './apiCore'; // 导入核心

// 默认缓存时长（秒）
const DEFAULT_REVALIDATE_TIME = 60; 

// --- GET 方法封装：集成 React cache 和默认 Revalidate ---

/**
 * GET 请求。利用 React cache 实现请求去重，并支持 Next.js Revalidation。
 * @param endpoint API 路径
 * @param revalidate 缓存时长 (秒)。设为 0 或 false 禁用缓存。
 * @param config 其他 fetch 配置
 */
export function get<T>(
    endpoint: string,
    revalidate: number | boolean = DEFAULT_REVALIDATE_TIME,
    config?: Omit<RequestConfig, 'next'> // 排除 'next' 以便我们手动设置
): Promise<T> {
    // 1. 构建唯一的 Cache Key (基于 endpoint, revalidate, 和 config)
    //    ⚠️ 关键：React cache 依赖函数签名来去重。
    //    为了让每次调用都能被缓存，我们将 cache 放在内部。
    
    // 2. 定义内部的带 cache 的函数
    // 必须返回一个带 cache 包装的函数，才能利用 React 提供的去重能力。
    const cachedGetter = cache(async (): Promise<T> => {
        let nextConfig = {};
        if (typeof revalidate === 'number' && revalidate > 0) {
            nextConfig = { revalidate };
        } else if (revalidate === false || revalidate === 0) {
            // 如果明确要求不缓存，则设置 cache: 'no-store'
            return apiFetch('GET', endpoint, { ...config, cache: 'no-store' });
        }
        
        return apiFetch('GET', endpoint, {
            ...config,
            next: nextConfig,
        });
    });

    // 3. 每次调用 get() 时，都执行这个 cachedGetter
    return cachedGetter();
}


// --- 数据修改方法封装：不缓存 ---

/**
 * POST 请求。不进行缓存。
 */
export function post<T>(endpoint: string, data: any, config?: RequestConfig): Promise<T> {
    // 显式设置 cache: 'no-store' 虽然不是必须的，但能增加清晰度
    return apiFetch('POST', endpoint, { ...config, data, cache: 'no-store' });
}

/**
 * PUT 请求。不进行缓存。
 */
export function put<T>(endpoint: string, data: any, config?: RequestConfig): Promise<T> {
    return apiFetch('PUT', endpoint, { ...config, data, cache: 'no-store' });
}

/**
 * DELETE 请求。不进行缓存。
 */
export function remove<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return apiFetch('DELETE', endpoint, { ...config, cache: 'no-store' });
}