import React, { useRef, useEffect, useCallback } from 'react';

/**
 * Ek responsive particle class
 */
class Particle {
    constructor(x, y, radius, color, dx, dy) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.dx = dx; // x-direction velocity
      this.dy = dy; // y-direction velocity
    }
      
        // Particle ko canvas par draw karo
        draw(ctx) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
          ctx.fillStyle = this.color;
          ctx.fill();
          ctx.closePath();
        }
      
        // Particle ki position update karo aur boundary check karo
        update(canvas) {
          // Boundary check (deewaron se bounce)
          if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx; // x-velocity ko reverse karo
          }
          if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy; // y-velocity ko reverse karo
          }
      
          // Position update karo
          this.x += this.dx;
          this.y += this.dy;
        }
      }
      
      /**
       * Particles Component
       * @param {object} props
       * @param {string} props.color - Particles ka hex color (e.g., "#ffffff")
       * @param {number} props.count - Kitne particles dikhaane hain (e.g., 100)
       * @param {number} props.speed - Particles ki movement speed (e.g., 1)
       */
      const MyParticles = ({ color = '#ffffff', count = 100, speed = 1 }) => {
        const canvasRef = useRef(null);
        const particlesArrayRef = useRef([]); // Particles ko store karne ke liye ref
        const animationFrameIdRef = useRef(null); // Animation frame ID ko store karne ke liye
      
        // Animation loop ko useCallback mein wrap kiya taaki reference stable rahe
        const animate = useCallback(() => {
          const canvas = canvasRef.current;
          if (!canvas) return;
          const ctx = canvas.getContext('2d');
      
          // Canvas ko har frame par clear karo
          ctx.clearRect(0, 0, canvas.width, canvas.height);
      
          // Sabhi particles ko update aur draw karo
          particlesArrayRef.current.forEach(particle => {
            particle.update(canvas);
            particle.draw(ctx);
          });
      
          // Agla animation frame request karo
          animationFrameIdRef.current = requestAnimationFrame(animate);
        }, []); // Iska koi dependency nahi hai
      
        // Yeh effect resizing aur particle initialization ko handle karta hai
        useEffect(() => {
          const canvas = canvasRef.current;
          if (!canvas) return;
          const ctx = canvas.getContext('2d');
      
          // Particles ko initialize ya re-initialize karne ka function
          const initializeParticles = () => {
            particlesArrayRef.current = []; // Purana array clear karo
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
      
            for (let i = 0; i < count; i++) {
              const radius = Math.random() * 2 + 1; // 1 se 3 px radius
              const x = Math.random() * (canvasWidth - radius * 2) + radius;
              const y = Math.random() * (canvasHeight - radius * 2) + radius;
              const dx = (Math.random() - 0.5) * speed; // -0.5 to +0.5 multiplied by speed
              const dy = (Math.random() - 0.5) * speed; // -0.5 to +0.5 multiplied by speed
              
              particlesArrayRef.current.push(new Particle(x, y, radius, color, dx, dy));
            }
          };
      
          // Resize handler
          const handleResize = () => {
            // Canvas ki drawing size ko uske actual display size ke barabar set karo
            // Yeh responsiveness ke liye zaroori hai
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
            initializeParticles(); // Resize par particles ko re-initialize karo
          };
      
          // Component mount par pehli baar resize call karo
          handleResize();
      
          // Resize event listener add karo
          window.addEventListener('resize', handleResize);
      
          // Animation loop start karo
          animationFrameIdRef.current = requestAnimationFrame(animate);
      
          // Cleanup function (jab component unmount hota hai)
          return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameIdRef.current);
          };
        }, [color, count, speed, animate]); // Jab color, count, speed ya animate function change ho toh effect re-run karo
      
        return (
          <canvas 
            ref={canvasRef} 
            style={{ 
              width: '100%', 
              height: '100%', 
              display: 'block' 
            }} 
          />
        );
      };

export default MyParticles;
