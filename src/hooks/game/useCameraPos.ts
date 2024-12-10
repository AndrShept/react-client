import { useLayoutEffect, useRef, useState } from 'react';

import { useAppSelector } from '../store';

export const useCameraPos = () => {
  const heroPos = useAppSelector((state) => state.dungeonSession.heroPos);
  //   const cameraREdux = useAppSelector((state) => state.dungeonSession.cameraPos);
  const tileSize = useAppSelector(
    (state) => state.dungeonSession.mapData?.tileSize,
  );
  const CAMERA_TILE_LEFT = 5;

  const [cameraPos, setCameraPos] = useState({ x: 0, y: 0 });
  const prevRef = useRef({ x: CAMERA_TILE_LEFT, y: CAMERA_TILE_LEFT });
 

  useLayoutEffect(() => {
    if (!heroPos || !tileSize) return;

    console.log(cameraPos);
    console.log(heroPos);
    // Рух вперед по осі X
    if (heroPos.x >= CAMERA_TILE_LEFT && heroPos.x - prevRef.current.x === 1) {
      prevRef.current = { ...prevRef.current, x: heroPos.x };
      setCameraPos((prev) => ({ ...prev, x: prev.x - tileSize }));
    }
    // Рух назад по осі X
    else if (
      heroPos.x >= CAMERA_TILE_LEFT &&
      heroPos.x - prevRef.current.x === -1
    ) {
      prevRef.current = { ...prevRef.current, x: heroPos.x };
      setCameraPos((prev) => ({ ...prev, x: prev.x + tileSize }));
    }

    // Рух вгору по осі Y
    if (heroPos.y >= CAMERA_TILE_LEFT && heroPos.y - prevRef.current.y === 1) {
      prevRef.current = { ...prevRef.current, y: heroPos.y };
      setCameraPos((prev) => ({ ...prev, y: prev.y - tileSize }));
    }
    // Рух вниз по осі Y
    else if (
      heroPos.y >= CAMERA_TILE_LEFT &&
      heroPos.y - prevRef.current.y === -1
    ) {
      prevRef.current = { ...prevRef.current, y: heroPos.y };
      setCameraPos((prev) => ({ ...prev, y: prev.y + tileSize }));
    }
  }, [heroPos, cameraPos, tileSize]);

  return {
    x: cameraPos.x,
    y: cameraPos.y,
  };
};
