import 'server-only';

const API_URL = process.env.API_BASE_URL || 'http://localhost:8000';

export interface RequestConfig extends RequestInit {
    // Next.js 扩展的缓存选项
    next?: {
        revalidate?: number | false;
        tags?: string[];
    };
    // 简化 body 的传递，避免手动 JSON.stringify
    data?: any;
}

// 内部核心 fetch 函数
export async function apiFetch<T>(
    method: string,
    endpoint: string,
    config: RequestConfig = {}
): Promise<T> {
    const url = `${API_URL}/${endpoint}`;

    // 1. 请求预处理
    const headers = {
        'Content-Type': 'application/json',
        ...config.headers,
    };

    // 处理 body：如果是 GET 或 HEAD，则没有 body
    let body = undefined;
    if (config.data && method !== 'GET' && method !== 'HEAD') {
        body = JSON.stringify(config.data);
    }

    try {
        const res = await fetch(url, {
            method,
            headers,
            body,
            // 默认情况下，非 GET 请求应禁用 Next.js 静态缓存
            cache: method !== 'GET' ? 'no-store' : undefined,
            ...config,
        });

        // 2. 响应后处理 (统一异常处理)
        if (!res.ok) {
            let errorDetail = res.statusText;
            try {
                const errorJson = await res.json();
                errorDetail = errorJson.message || JSON.stringify(errorJson);
            } catch { }
            throw new Error(`API Error ${res.status} [${method} ${endpoint}]: ${errorDetail}`);
        }

        // 成功时返回 JSON (或 null/undefined for 204 No Content)
        return (res.status === 204 ? null : res.json()) as Promise<T>;

    } catch (error) {
        console.error(`Fetch failed for [${method} ${endpoint}]:`, error);
        throw error;
    }
}