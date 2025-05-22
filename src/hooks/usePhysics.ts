import Matter, { Bodies, Body, Engine, World } from 'matter-js';
import { useEffect, useRef, useState } from 'react';

interface PhysicsData {
  engine: Engine;
  boxes: Matter.Body[];
}

export const usePhysics = (gamma: number): PhysicsData => {
  const engineRef = useRef<Engine>(Matter.Engine.create());
  const [boxes, setBoxes] = useState<Body[]>([]); // Track boxes in state

  useEffect(() => {
    const engine = engineRef.current;
    const world = engine.world;

    // Create platform and boxes
    const platform = Bodies.rectangle(200, 500, 200, 20, { isStatic: true });
    const initialBoxes = [
      Bodies.rectangle(200, 400, 40, 40),
      Bodies.rectangle(200, 360, 40, 40),
      Bodies.rectangle(200, 320, 40, 40),
    ];
    World.add(world, [platform, ...initialBoxes]);
    setBoxes(initialBoxes); // Initialize boxes

    const update = () => {
      initialBoxes.forEach((box) => {
        Body.applyForce(box, box.position, { x: gamma * 0.0001, y: 0 });
      });
      Matter.Engine.update(engine, 1000 / 60);
    };

    const interval = setInterval(update, 1000 / 60);

    return () => {
      clearInterval(interval);
      World.clear(world, false);
      Engine.clear(engine);
    };
  }, [gamma]);

  return { engine: engineRef.current, boxes };
};