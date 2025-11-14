'use client'

import { useEffect, useRef } from "react";
import * as EventManager from "@/lib/eventManager";

type ActionEvents = {
  'customer:login-start': { data?: any };
  'customer:login-end': { data?: any };
  'customer:login-success': { };
  'customer:login-failure': { message: string };
  'customer:logout-start': { data?: any };
  'customer:logout-end': { data?: any };
  'customer:logout-success': { };
  'customer:logout-failure': { message: string };
  'customer:signup-start': { data?: any };
  'customer:signup-end': { data?: any };
  'customer:signup-success': { };
  'customer:signup-failure': { message: string };

  'cart:create-start': {};
  'cart:create-end': {};
  'cart:add-success': { product?: any; variant?: any };
  'cart:del-success': {};
};

type EventName = keyof ActionEvents;
type EventData<N extends EventName> = ActionEvents[N];

// ----------------------------------------------------------------------
// 1. 暴露 Emit 函数 (Pure Function)
// ----------------------------------------------------------------------

/**
 * 纯函数：用于发射事件。
 * 建议在业务逻辑 Hook (如 useActions) 或事件 Handler 中调用。
 */
export const event = {
  emit: (eventName: EventName, data?: EventData<EventName>) => EventManager.emitEvent(eventName, data),
  // 以后如果需要获取当前监听数等非 React 功能，也可以放在这里
};

// ----------------------------------------------------------------------
// 2. 实现 Listen Hook (useListenEvent 逻辑)
// ----------------------------------------------------------------------

type ListenHandler<N extends EventName> = (eventName: string, data: EventData<N>) => void;

/**
 * Hook：用于在组件生命周期内订阅事件。
 * 实现了您提出的 useListenEvent 功能。
 * @param eventName 要监听的事件名称
 * @param handler 事件触发时的回调函数
 */
export const useEvent = <N extends EventName>(
  eventNames: N | N[], // <-- 接受单个名称或数组
  handler: ListenHandler<N>,
): void => {

  const handlerRef = useRef(handler);
  handlerRef.current = handler; // 确保 handler 始终是最新版本

  // 将 eventNames 统一转换为数组
  const names = Array.isArray(eventNames) ? eventNames : [eventNames];

  useEffect(() => {
    // 稳定包装函数，调用最新的 handlerRef
    const listenerWrapper = (eventName: string ,eventData: EventData<N>) => {
      handlerRef.current(eventName, eventData);
    };

    // 存储所有添加的包装函数，用于清理
    const addedWrappers = new Map<EventName, EventListener>();

    // 遍历所有事件名称并添加监听器
    names.forEach(eventName => {
      const eventTargetWrapper = EventManager.addListener(eventName, listenerWrapper);
      addedWrappers.set(eventName, eventTargetWrapper);
    });

    // 清理函数：遍历并移除所有监听器
    return () => {
      names.forEach(eventName => {
        const wrapper = addedWrappers.get(eventName);
        if (wrapper) {
          EventManager.removeListener(eventName, wrapper);
        }
      });
    };
  }, [eventNames]);
};

// ----------------------------------------------------------------------
// 3. 暴露类型
// ----------------------------------------------------------------------
export type { ActionEvents, EventName, EventData };