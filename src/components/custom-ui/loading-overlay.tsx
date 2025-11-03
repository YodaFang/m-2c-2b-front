"use client";

import React from "react";
import { createRoot, Root } from "react-dom/client";
import { Spinner } from "@/components/ui/spinner";

let root: Root | null = null;
let containerEl: HTMLDivElement | null = null;
let refCount = 0;
let timeoutId: NodeJS.Timeout | null = null;

/**
 * 显示全屏遮罩（居中 Spinner）
 * 多次调用会计数，只有当所有调用都 hide 后才移除。
 * 最长显示 5 秒，超时自动关闭。
 */
export function showLoadingOverlay(message?: string) {
  refCount++;

  // 如果已经存在，不再重复创建，只更新计数
  if (root) return;

  // 创建容器
  containerEl = document.createElement("div");
  containerEl.setAttribute("id", "app-loading-overlay");
  document.body.appendChild(containerEl);

  root = createRoot(containerEl);
  root.render(<OverlayContent message={message} />);

  // 自动超时隐藏（5 秒）
  timeoutId = setTimeout(() => {
    console.warn("[loading-overlay] auto-hide after 5s timeout");
    hideLoadingOverlay(true);
  }, 5000);
}

/**
 * 隐藏 overlay
 * @param force 是否强制立即清除（用于超时自动关闭）
 */
export function hideLoadingOverlay(force = false) {
  // 清除自动超时
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }

  if (!root || !containerEl) return;

  // 如果是强制关闭或引用计数为 1（最后一个调用），则完全移除
  if (force || refCount <= 1) {
    root.unmount();
    containerEl.remove();
    root = null;
    containerEl = null;
    refCount = 0;
  } else {
    refCount--;
  }
}

/**
 * 覆盖内容：固定定位，居中 Spinner + 可选消息
 */
function OverlayContent({ message }: { message?: string }) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      style={{ pointerEvents: "auto" }}
    >
      <div className="flex flex-col items-center justify-center gap-4 p-6">
        <Spinner className="w-18 h-18 text-white" />
        {message ? (
          <div className="text-white text-lg font-medium text-center">
            {message}
          </div>
        ) : null}
      </div>
    </div>
  );
}
