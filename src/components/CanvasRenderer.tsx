// src/components/CanvasRenderer.tsx
import { useRef, useEffect } from 'react';
import { Engine, Body } from 'matter-js';

// Define props interface
interface CanvasRendererProps {
  engine: Engine;
  boxes: Body[];
}

// Functional component with typed props
export const CanvasRenderer: React.FC<CanvasRendererProps> = ({ boxes }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Guard against null canvas

    const ctx = canvas.getContext('2d');
    if (!ctx) return; // Guard against null context

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Draw platform
      ctx.fillStyle = 'gray';
      ctx.fillRect(150, 480, 200, 20);
      // Draw boxes
      ctx.fillStyle = 'blue';
      boxes.forEach((box) => {
        ctx.save();
        ctx.translate(box.position.x, box.position.y);
        ctx.rotate(box.angle);
        ctx.fillRect(-20, -20, 40, 40);
        ctx.restore();
      });
      requestAnimationFrame(render);
    };
    render();

    // Cleanup animation frame on unmount
    return () => {
      // Cancel animation frame (optional, to prevent memory leaks)
      // Note: requestAnimationFrame doesn't need explicit cleanup in most cases
    };
  }, [boxes]);

  return <canvas ref={canvasRef} width={400} height={600} className="w-full h-auto" />;
};