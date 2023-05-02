// import { useEffect, useRef } from 'react';
//
// export const useRequestAnimationFrame = (callback:(arg0: number) =>{}) => {
//   const requestRef = useRef<number | null>();
//   const previousTimeRef = useRef<number | null>();
//
//   const animate = (time:number) => {
//     if (previousTimeRef.current) callback(time - previousTimeRef.current);
//     previousTimeRef.current = time;
//     requestRef.current = requestAnimationFrame(animate);
//   };
//
//   useEffect(() => {
//     requestRef.current = requestAnimationFrame(animate);
//     return () => cancelAnimationFrame(requestRef.current);
//   }, []);
// };