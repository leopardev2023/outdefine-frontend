import React from 'react';

// TODO: Full-type ready
export const injectSVGProps = (element, props = {}) => {
  const { children, ...restProps } = element.props;
  return React.createElement('svg', {
    ...restProps,
    ...props
  }, children);
;
}

export const icons = {
  download: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 14H12"
        stroke="currentColor"
        stroke-width="1.3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8 2L8 11.3333"
        stroke="currentColor"
        stroke-width="1.3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.3332 8L7.99984 11.3333L4.6665 8"
        stroke="currentColor"
        stroke-width="1.3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  ),
  spinner: (
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.4761 8.00016C14.8576 8.00016 15.1705 8.31024 15.1311 8.68968C15.0037 9.91523 14.5384 11.0864 13.7808 12.0695C12.882 13.2357 11.6226 14.0716 10.1989 14.4468C8.77518 14.8219 7.26733 14.7152 5.91064 14.1434C4.55395 13.5715 3.42472 12.5666 2.69919 11.2854C1.97365 10.0043 1.69261 8.51907 1.89992 7.06144C2.10723 5.60381 2.79123 4.25581 3.84519 3.22778C4.89914 2.19975 6.26376 1.54953 7.72611 1.37859C8.95886 1.23448 10.2026 1.4378 11.3192 1.95883C11.6649 2.12014 11.7698 2.54802 11.5736 2.87518C11.3774 3.20235 10.9544 3.30385 10.6045 3.15196C9.75344 2.78256 8.81604 2.64206 7.88651 2.75072C6.72719 2.88624 5.64535 3.40172 4.8098 4.21672C3.97425 5.03172 3.43198 6.10039 3.26763 7.25597C3.10328 8.41154 3.32608 9.58902 3.90127 10.6047C4.47647 11.6203 5.37169 12.417 6.44724 12.8704C7.5228 13.3237 8.71819 13.4083 9.84687 13.1109C10.9755 12.8135 11.974 12.1508 12.6865 11.2263C13.2578 10.485 13.6194 9.60881 13.7403 8.68896C13.79 8.31073 14.0946 8.00016 14.4761 8.00016Z"
        fill="currentColor"
      />
    </svg>
  ),
};

export type IconName = keyof typeof icons;
