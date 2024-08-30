'use client'
import createGlobe from "cobe";
import { useEffect, useRef } from "react";
 
export function Cobe() {
const canvasRef = useRef();
if(!window.WebGL2RenderingContext){
    console.log('No WebGL');
}
useEffect(() => {
  let phi = 0;
  let width = 0;
  const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth)
  window.addEventListener('resize', onResize)
  onResize()
  const globe = createGlobe(canvasRef.current, {
    devicePixelRatio: 2,
    width: width * 2,
    height: width * 2,
    phi: 0,
    theta: 0.3,
    dark: 1,
    diffuse: window.innerWidth < 768 ? 2 : 3,
    mapSamples: window.innerWidth < 768 ? 8000 : 16000,
    mapBrightness: 1.2,
    baseColor: [1, 1, 1],
    markerColor: [251 / 255, 100 / 255, 21 / 255],
    glowColor: [1.2, 1.2, 1.2],
    markers: [],
    onRender: (state) => {
      state.phi = phi
      phi += 0.005
      state.width = width * 2
      state.height = width * 2
    }
  })
  setTimeout(() => canvasRef.current.style.opacity = '1')
  return () => { 
    globe.destroy();
    window.removeEventListener('resize', onResize);
  }
}, [])
return <div style={{
  width: '100%',
  maxWidth: 600,
  aspectRatio: 1,
  margin: 'auto',
  position: 'relative',
}}>
  <canvas
    ref={canvasRef}
    style={{
      width: '100%',
      height: '100%',
      contain: 'layout paint size',
      opacity: 0,
      transition: 'opacity 1s ease',
    }}
  />
</div>
}
 
 
 