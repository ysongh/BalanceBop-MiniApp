import Matter, { Engine } from 'matter-js';
import { useEffect, useRef } from 'react';

interface PhysicsData {
  engine: Engine;
  boxes: Matter.Body[];
}

export const usePhysics = (gamma: number): PhysicsData => {
  const engineRef = useRef<Engine>(Matter.Engine.create());
  const world = engineRef.current.world;

  useEffect(() => {
    // Create a static platform
    const platform = Matter.Bodies.rectangle(200, 500, 200, 20, { isStatic: true });
    // Create a pile of boxes
    const boxes = [
      Matter.Bodies.rectangle(200, 400, 40, 40),
      Matter.Bodies.rectangle(200, 360, 40, 40),
      Matter.Bodies.rectangle(200, 320, 40, 40),
    ];
    Matter.World.add(world, [platform, ...boxes]);

    // Update physics based on tilt (gamma)
    const update = () => {
      boxes.forEach((box) => {
        Matter.Body.applyForce(box, box.position, { x: gamma * 0.0001, y: 0 });
      });
      Matter.Engine.update(engineRef.current, 1000 / 60);
    };

    const interval = setInterval(update, 1000 / 60);

    return () => {
      clearInterval(interval);
      Matter.World.clear(world);
      Matter.Engine.clear(engineRef.current);
    };
  }, [gamma]);

  return { engine: engineRef.current, boxes };
};