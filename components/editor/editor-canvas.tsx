"use client";

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { cn } from "@/lib/utils";

export type CanvasTool = "select" | "mask" | "eraser" | "pan";

interface Point {
  x: number;
  y: number;
}

interface EditorCanvasProps {
  activeTool: CanvasTool;
  brushSize: number;
  maskOpacity: number;
  maskColor: string;
  image: HTMLImageElement | null;
  onMaskChange?: (maskData: ImageData | null) => void;
}

export function EditorCanvas({
  activeTool,
  brushSize,
  maskOpacity,
  maskColor,
  image,
  onMaskChange,
}: EditorCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageCanvasRef = useRef<HTMLCanvasElement>(null);
  const maskCanvasRef = useRef<HTMLCanvasElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  const [imageOffset, setImageOffset] = useState({ x: 0, y: 0 });
  const [imageScale, setImageScale] = useState(1);

  // Selection state
  const [selectionStart, setSelectionStart] = useState<Point | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<Point | null>(null);
  const [selectionRect, setSelectionRect] = useState<{
    x: number;
    y: number;
    w: number;
    h: number;
  } | null>(null);

  // Fit container
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          setCanvasSize({
            width: Math.floor(width),
            height: Math.floor(height),
          });
        }
      }
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Render image
  useEffect(() => {
    const canvas = imageCanvasRef.current;
    if (!canvas || canvasSize.width === 0 || canvasSize.height === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);

    // Solid dark background matching the UI
    ctx.fillStyle = "#09090b";
    ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);

    if (image) {
      // Fit image within canvas
      const scaleX = (canvasSize.width - 40) / image.width;
      const scaleY = (canvasSize.height - 40) / image.height;
      const scale = Math.min(scaleX, scaleY, 1);
      setImageScale(scale);

      const drawWidth = image.width * scale;
      const drawHeight = image.height * scale;
      const offsetX = (canvasSize.width - drawWidth) / 2;
      const offsetY = (canvasSize.height - drawHeight) / 2;
      setImageOffset({ x: offsetX, y: offsetY });

      ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);

      // Draw border around image
      ctx.strokeStyle = "rgba(245,158,11,0.3)";
      ctx.lineWidth = 1;
      ctx.strokeRect(offsetX, offsetY, drawWidth, drawHeight);
    }
  }, [image, canvasSize]);

  // Render mask overlay
  useEffect(() => {
    const canvas = overlayCanvasRef.current;
    if (!canvas || canvasSize.width === 0 || canvasSize.height === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);

    // Draw mask with opacity
    const maskCanvas = maskCanvasRef.current;
    if (maskCanvas && maskCanvas.width > 0 && maskCanvas.height > 0) {
      ctx.globalAlpha = maskOpacity;
      ctx.drawImage(maskCanvas, 0, 0);
      ctx.globalAlpha = 1;
    }

    // Draw selection rectangle
    if (selectionRect) {
      ctx.strokeStyle = "#f59e0b";
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
      ctx.strokeRect(
        selectionRect.x,
        selectionRect.y,
        selectionRect.w,
        selectionRect.h,
      );
      ctx.setLineDash([]);

      // Selection fill
      ctx.fillStyle = "rgba(245, 158, 11, 0.08)";
      ctx.fillRect(
        selectionRect.x,
        selectionRect.y,
        selectionRect.w,
        selectionRect.h,
      );

      // Corner handles
      const handles = [
        { x: selectionRect.x, y: selectionRect.y },
        { x: selectionRect.x + selectionRect.w, y: selectionRect.y },
        { x: selectionRect.x, y: selectionRect.y + selectionRect.h },
        {
          x: selectionRect.x + selectionRect.w,
          y: selectionRect.y + selectionRect.h,
        },
      ];
      handles.forEach((h) => {
        ctx.fillStyle = "#f59e0b";
        ctx.fillRect(h.x - 4, h.y - 4, 8, 8);
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 1;
        ctx.strokeRect(h.x - 4, h.y - 4, 8, 8);
      });
    }

    // Active selection preview (while dragging)
    if (selectionStart && selectionEnd && activeTool === "select") {
      const x = Math.min(selectionStart.x, selectionEnd.x);
      const y = Math.min(selectionStart.y, selectionEnd.y);
      const w = Math.abs(selectionEnd.x - selectionStart.x);
      const h = Math.abs(selectionEnd.y - selectionStart.y);

      ctx.strokeStyle = "#f59e0b";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 3]);
      ctx.strokeRect(x, y, w, h);
      ctx.setLineDash([]);
      ctx.fillStyle = "rgba(245, 158, 11, 0.05)";
      ctx.fillRect(x, y, w, h);
    }
  }, [
    canvasSize,
    maskOpacity,
    selectionRect,
    selectionStart,
    selectionEnd,
    activeTool,
  ]);

  // Brush cursor
  const getCursorStyle = useCallback(() => {
    if (activeTool === "select") return "crosshair";
    if (activeTool === "mask" || activeTool === "eraser") return "none";
    return "default";
  }, [activeTool]);

  // Get canvas-relative coordinates
  const getCanvasPoint = useCallback(
    (e: ReactMouseEvent<HTMLCanvasElement>): Point => {
      const canvas = overlayCanvasRef.current;
      if (!canvas) return { x: 0, y: 0 };
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    },
    [],
  );

  // Draw on mask canvas
  const drawOnMask = useCallback(
    (point: Point, erase: boolean) => {
      const maskCanvas = maskCanvasRef.current;
      if (!maskCanvas) return;
      const ctx = maskCanvas.getContext("2d");
      if (!ctx) return;

      ctx.globalCompositeOperation = erase ? "destination-out" : "source-over";
      ctx.beginPath();
      ctx.arc(point.x, point.y, brushSize / 2, 0, Math.PI * 2);

      if (erase) {
        ctx.fillStyle = "rgba(0,0,0,1)";
      } else {
        ctx.fillStyle = maskColor;
      }
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
    },
    [brushSize, maskColor],
  );

  const handleMouseDown = useCallback(
    (e: ReactMouseEvent<HTMLCanvasElement>) => {
      const point = getCanvasPoint(e);

      if (activeTool === "mask" || activeTool === "eraser") {
        setIsDrawing(true);
        drawOnMask(point, activeTool === "eraser");
      } else if (activeTool === "select") {
        setSelectionStart(point);
        setSelectionEnd(point);
        setSelectionRect(null);
      }
    },
    [activeTool, drawOnMask, getCanvasPoint],
  );

  const handleMouseMove = useCallback(
    (e: ReactMouseEvent<HTMLCanvasElement>) => {
      const point = getCanvasPoint(e);

      // Custom cursor for brush tools
      if (activeTool === "mask" || activeTool === "eraser") {
        const overlay = overlayCanvasRef.current;
        if (overlay) {
          const ctx = overlay.getContext("2d");
          if (ctx) {
            // Redraw overlay and cursor
            ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);

            const maskCanvas = maskCanvasRef.current;
            if (maskCanvas) {
              ctx.globalAlpha = maskOpacity;
              ctx.drawImage(maskCanvas, 0, 0);
              ctx.globalAlpha = 1;
            }

            if (selectionRect) {
              ctx.strokeStyle = "#f59e0b";
              ctx.lineWidth = 2;
              ctx.setLineDash([6, 4]);
              ctx.strokeRect(
                selectionRect.x,
                selectionRect.y,
                selectionRect.w,
                selectionRect.h,
              );
              ctx.setLineDash([]);
            }

            // Brush cursor circle
            ctx.beginPath();
            ctx.arc(point.x, point.y, brushSize / 2, 0, Math.PI * 2);
            ctx.strokeStyle =
              activeTool === "eraser"
                ? "rgba(255,255,255,0.6)"
                : "rgba(245,158,11,0.8)";
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.closePath();

            // Center dot
            ctx.beginPath();
            ctx.arc(point.x, point.y, 1.5, 0, Math.PI * 2);
            ctx.fillStyle =
              activeTool === "eraser"
                ? "rgba(255,255,255,0.8)"
                : "rgba(245,158,11,1)";
            ctx.fill();
          }
        }
      }

      if (isDrawing && (activeTool === "mask" || activeTool === "eraser")) {
        drawOnMask(point, activeTool === "eraser");
      } else if (selectionStart && activeTool === "select") {
        setSelectionEnd(point);
      }
    },
    [
      activeTool,
      isDrawing,
      drawOnMask,
      getCanvasPoint,
      selectionStart,
      canvasSize,
      maskOpacity,
      brushSize,
      selectionRect,
    ],
  );

  const handleMouseUp = useCallback(() => {
    if (isDrawing) {
      setIsDrawing(false);
      // Notify parent of mask change
      const maskCanvas = maskCanvasRef.current;
      if (maskCanvas && onMaskChange) {
        const ctx = maskCanvas.getContext("2d");
        if (ctx) {
          onMaskChange(
            ctx.getImageData(0, 0, canvasSize.width, canvasSize.height),
          );
        }
      }
    }

    if (selectionStart && selectionEnd && activeTool === "select") {
      const x = Math.min(selectionStart.x, selectionEnd.x);
      const y = Math.min(selectionStart.y, selectionEnd.y);
      const w = Math.abs(selectionEnd.x - selectionStart.x);
      const h = Math.abs(selectionEnd.y - selectionStart.y);

      if (w > 5 && h > 5) {
        setSelectionRect({ x, y, w, h });
      } else {
        setSelectionRect(null);
      }
      setSelectionStart(null);
      setSelectionEnd(null);
    }
  }, [
    isDrawing,
    selectionStart,
    selectionEnd,
    activeTool,
    canvasSize,
    onMaskChange,
  ]);

  return (
    <div
      ref={containerRef}
      className="relative flex-1 overflow-hidden"
      style={{ cursor: getCursorStyle() }}
    >
      {/* Image layer */}
      <canvas
        ref={imageCanvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className="absolute inset-0"
      />

      {/* Mask layer (hidden, used for data) */}
      <canvas
        ref={maskCanvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className="absolute inset-0 pointer-events-none"
        style={{ display: "none" }}
      />

      {/* Interactive overlay layer */}
      <canvas
        ref={overlayCanvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className="absolute inset-0"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />

      {/* Info badge showing dimensions */}
      {image && (
        <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-md bg-black/60 px-2.5 py-1 text-[10px] text-muted-foreground backdrop-blur-sm">
          <span>
            {image.width} × {image.height}
          </span>
          <span className="text-white/20">|</span>
          <span>{Math.round(imageScale * 100)}%</span>
        </div>
      )}
    </div>
  );
}
