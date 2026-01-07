import React, { useRef, useEffect, useState } from 'react';

const AsciiArtBackground = ({ landscapeImage = '/landscape-me.png', portraitImage = '/portrait-me.png' }) => {
    const canvasRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    const stateRef = useRef({
        cursor: { x: -1000, y: -1000 },
        isPressed: false,
        currentRadius: 0,
        hoverRadius: 80,
        maxRadius: 0,
        image: null,
        asciiCanvas: null,
        revealCanvas: null,
        needsRedrawAscii: false,
        isPortrait: false
    });

    useEffect(() => {
        const handleResize = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            setDimensions({ width: w, height: h });

            stateRef.current.maxRadius = Math.sqrt(w * w + h * h);
            stateRef.current.needsRedrawAscii = true;
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // Preload
        const img1 = new Image(); img1.src = landscapeImage;
        const img2 = new Image(); img2.src = portraitImage;

        const handleMove = (x, y) => { stateRef.current.cursor = { x, y }; };
        const handleDown = () => { stateRef.current.isPressed = true; };
        const handleUp = () => { stateRef.current.isPressed = false; };

        const onMouseMove = (e) => handleMove(e.clientX, e.clientY);
        const onMouseDown = () => handleDown();
        const onMouseUp = () => handleUp();
        const onTouchMove = (e) => handleMove(e.touches[0].clientX, e.touches[0].clientY);
        const onTouchStart = (e) => {
            handleMove(e.touches[0].clientX, e.touches[0].clientY);
            handleDown();
        };
        const onTouchEnd = () => handleUp();

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('touchmove', onTouchMove);
        window.addEventListener('touchstart', onTouchStart);
        window.addEventListener('touchend', onTouchEnd);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchstart', onTouchStart);
            window.removeEventListener('touchend', onTouchEnd);
        }
    }, [landscapeImage, portraitImage]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || dimensions.width === 0) return;

        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;

        canvas.width = dimensions.width * dpr;
        canvas.height = dimensions.height * dpr;
        canvas.style.width = `${dimensions.width}px`;
        canvas.style.height = `${dimensions.height}px`;
        ctx.scale(dpr, dpr);

        let animationFrameId;

        const generateAscii = () => {
            const { width, height } = dimensions;
            const isLandscape = width > height;
            const src = isLandscape ? landscapeImage : portraitImage;

            if (!stateRef.current.image || stateRef.current.image.getAttribute('src') !== src) {
                const img = new Image();
                img.src = src;
                img.onload = () => {
                    stateRef.current.image = img;
                    renderAsciiToCache(img);
                };
            } else {
                renderAsciiToCache(stateRef.current.image);
            }
        };

        const renderAsciiToCache = (img) => {
            const { width, height } = dimensions;
            const fontSize = 10;
            const font = `bold ${fontSize}px monospace`;

            let offCanvas = stateRef.current.asciiCanvas;
            if (!offCanvas) {
                offCanvas = document.createElement('canvas');
                stateRef.current.asciiCanvas = offCanvas;
            }
            offCanvas.width = width * dpr;
            offCanvas.height = height * dpr;

            const offCtx = offCanvas.getContext('2d');
            offCtx.scale(dpr, dpr);
            offCtx.font = font;
            offCtx.textBaseline = 'top';

            const colWidth = fontSize * 0.6;
            const rowHeight = fontSize;
            const cols = Math.ceil(width / colWidth);
            const rows = Math.ceil(height / rowHeight);

            const analysisCanvas = document.createElement('canvas');
            analysisCanvas.width = cols;
            analysisCanvas.height = rows;
            const aCtx = analysisCanvas.getContext('2d');

            const scale = Math.max(width / img.width, height / img.height);
            const w = img.width * scale;
            const h = img.height * scale;
            const x = (width - w) / 2;
            const y = (height - h) / 2;

            aCtx.scale(1 / colWidth, 1 / rowHeight);
            aCtx.drawImage(img, x, y, w, h);

            const imageData = aCtx.getImageData(0, 0, cols, rows).data;
            const chars = " .:-=+*#%@";

            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    const idx = (i * cols + j) * 4;
                    const r = imageData[idx];
                    const g = imageData[idx + 1];
                    const b = imageData[idx + 2];
                    const a = imageData[idx + 3];

                    if (a > 20) {
                        const brightness = (r + g + b) / 3;
                        const charIndex = Math.floor((brightness / 255) * (chars.length - 1));
                        offCtx.fillStyle = `rgb(${r},${g},${b})`;
                        offCtx.fillText(chars[charIndex], j * colWidth, i * rowHeight);
                    }
                }
            }
            stateRef.current.needsRedrawAscii = false;
        }

        const render = () => {
            if (stateRef.current.needsRedrawAscii) generateAscii();

            const state = stateRef.current;
            const { width, height } = dimensions;

            const target = state.isPressed ? state.maxRadius : state.hoverRadius;
            const speed = state.isPressed ? 0.04 : 0.25;
            state.currentRadius += (target - state.currentRadius) * speed;

            if (Math.abs(target - state.currentRadius) < 0.5) state.currentRadius = target;

            ctx.clearRect(0, 0, width, height);

            if (state.asciiCanvas) {
                ctx.save();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.drawImage(state.asciiCanvas, 0, 0);
                ctx.restore();
            }

            if (state.image && state.currentRadius > 1) {
                let rCanvas = state.revealCanvas;
                if (!rCanvas) {
                    rCanvas = document.createElement('canvas');
                    state.revealCanvas = rCanvas;
                }

                if (rCanvas.width !== width * dpr || rCanvas.height !== height * dpr) {
                    rCanvas.width = width * dpr;
                    rCanvas.height = height * dpr;
                }

                const rCtx = rCanvas.getContext('2d');
                rCtx.save();
                rCtx.scale(dpr, dpr);
                rCtx.clearRect(0, 0, width, height);

                const img = state.image;
                const scale = Math.max(width / img.width, height / img.height);
                const w = img.width * scale;
                const h = img.height * scale;
                const x = (width - w) / 2;
                const y = (height - h) / 2;
                rCtx.drawImage(img, x, y, w, h);
                rCtx.globalCompositeOperation = 'destination-in';

                const g = rCtx.createRadialGradient(state.cursor.x, state.cursor.y, 0, state.cursor.x, state.cursor.y, state.currentRadius);
                g.addColorStop(0, 'rgba(0,0,0,1)');
                g.addColorStop(0.8, 'rgba(0,0,0,1)');
                g.addColorStop(1, 'rgba(0,0,0,0)');

                rCtx.fillStyle = g;
                rCtx.beginPath();
                rCtx.arc(state.cursor.x, state.cursor.y, state.currentRadius, 0, Math.PI * 2);
                rCtx.fill();
                rCtx.restore();

                ctx.save();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.drawImage(rCanvas, 0, 0);
                ctx.restore();
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();
        return () => cancelAnimationFrame(animationFrameId);
    }, [dimensions, landscapeImage, portraitImage]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
            style={{ touchAction: 'none' }}
        />
    );
};

export default AsciiArtBackground;