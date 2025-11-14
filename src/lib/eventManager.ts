export type EventName = string;
export type EventData = any | undefined;

// 核心：使用 EventTarget 实例作为事件发射器
// 注意：这个模块只在 'use client' 导入时才会被实例化，安全。
const eventEmitter: EventTarget = new EventTarget();

/**
 * 辅助函数：发布事件
 */
export const emitEvent = <N extends EventName>(
  eventName: N,
  data?: EventData
) => {
  eventEmitter.dispatchEvent(
    new CustomEvent(eventName, { detail: data })
  );
};

/**
 * 辅助函数：添加监听器 (纯 JS/TS - 暴露给 Hook 使用)
 */
export const addListener = <N extends EventName>(
  eventName: N,
  handler: (eventName: string, data?: EventData) => void
) => {
  // EventTarget 的 handler 需要一个 Event 对象，我们用一个 Wrapper 适配
  const wrapper = (event: Event) => {
    const customEvent = event as CustomEvent<EventData>;
    handler(eventName, customEvent.detail);
  };

  // 使用 eventEmitter.addEventListener 注册
  eventEmitter.addEventListener(eventName, wrapper as EventListener);

  // 返回包装函数，以便在移除时能够正确引用
  return wrapper;
};

/**
 * 辅助函数：移除监听器 (纯 JS/TS - 暴露给 Hook 使用)
 */
export const removeListener = <N extends EventName>(
  eventName: N,
  wrapper: EventListener
) => {
  // 使用 eventEmitter.removeEventListener 移除
  eventEmitter.removeEventListener(eventName, wrapper);
};