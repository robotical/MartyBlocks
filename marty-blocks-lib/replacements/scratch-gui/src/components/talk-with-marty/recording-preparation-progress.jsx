import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

const SEGMENTS = [
    { start: 0, end: 25, color: '#d32f2f' },
    { start: 25, end: 50, color: '#f57c00' },
    { start: 50, end: 75, color: '#fbc02d' },
    { start: 75, end: 100, color: '#388e3c' }
];

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
    return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians)
    };
};

const describeArc = (x, y, radius, startAngle, endAngle) => {
    const start = polarToCartesian(x, y, radius, startAngle);
    const end = polarToCartesian(x, y, radius, endAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return [
        'M',
        start.x,
        start.y,
        'A',
        radius,
        radius,
        0,
        largeArcFlag,
        1,
        end.x,
        end.y
    ].join(' ');
};

const now = () => {
    if (typeof performance !== 'undefined' && performance.now) {
        return performance.now();
    }
    return Date.now();
};

const RecordingPreparationProgress = ({
    className = '',
    durationMs = 1000,
    size = 64,
    strokeWidth = 8,
    trackColor = '#d9dee9'
}) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (durationMs <= 0) {
            setProgress(100);
            return undefined;
        }

        const requestFrame = typeof window !== 'undefined' && window.requestAnimationFrame
            ? window.requestAnimationFrame.bind(window)
            : callback => setTimeout(() => callback(now()), 16);
        const cancelFrame = typeof window !== 'undefined' && window.cancelAnimationFrame
            ? window.cancelAnimationFrame.bind(window)
            : clearTimeout;

        let animationHandle;
        let cancelled = false;
        const startTime = now();

        const step = () => {
            const elapsed = now() - startTime;
            const nextProgress = clamp((elapsed / durationMs) * 100, 0, 100);
            if (!cancelled) {
                setProgress(nextProgress);
                if (elapsed < durationMs) {
                    animationHandle = requestFrame(step);
                }
            }
        };

        animationHandle = requestFrame(step);

        return () => {
            cancelled = true;
            if (animationHandle !== undefined && animationHandle !== null) {
                cancelFrame(animationHandle);
            }
        };
    }, [durationMs]);

    const center = size / 2;
    const radius = center - strokeWidth / 2;

    return (
        <div
            className={className}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
            style={{ width: size, height: size }}
        >
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
            >
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke={trackColor}
                    strokeWidth={strokeWidth}
                />
                {SEGMENTS.map(segment => {
                    const segmentSpan = segment.end - segment.start;
                    const segmentProgress = clamp((progress - segment.start) / segmentSpan, 0, 1);
                    if (segmentProgress <= 0) return null;

                    const startAngle = (segment.start / 100) * 360;
                    const endAngle = startAngle + segmentProgress * (segmentSpan / 100) * 360;
                    return (
                        <path
                            key={segment.start}
                            d={describeArc(center, center, radius, startAngle, endAngle)}
                            fill="none"
                            stroke={segment.color}
                            strokeWidth={strokeWidth}
                            strokeLinecap="round"
                        />
                    );
                })}
            </svg>
        </div>
    );
};

RecordingPreparationProgress.propTypes = {
    className: PropTypes.string,
    durationMs: PropTypes.number,
    size: PropTypes.number,
    strokeWidth: PropTypes.number,
    trackColor: PropTypes.string
};

export default RecordingPreparationProgress;
