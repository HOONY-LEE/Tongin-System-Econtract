type EraserIconProps = {
  width?: string;
  height: string;
  fill: string;
  onClick?: any;
};

const EraserIcon = ({ width, height, fill, onClick }: EraserIconProps) => {
  return (
    <svg
      onClick={onClick}
      width={width}
      height={height}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_209_5992)">
        <path
          d="M20.9997 28.4997H31.4997V31.4997H17.9997L12.0027 31.5027L2.27219 21.7722C1.99098 21.4909 1.83301 21.1095 1.83301 20.7117C1.83301 20.314 1.99098 19.9325 2.27219 19.6512L18.1797 3.74071C18.319 3.60125 18.4844 3.49061 18.6665 3.41512C18.8486 3.33964 19.0438 3.30078 19.2409 3.30078C19.4381 3.30078 19.6333 3.33964 19.8153 3.41512C19.9974 3.49061 20.1629 3.60125 20.3022 3.74071L31.9692 15.4077C32.2504 15.689 32.4084 16.0705 32.4084 16.4682C32.4084 16.866 32.2504 17.2474 31.9692 17.5287L20.9997 28.4997ZM23.4852 21.7722L28.7877 16.4682L19.2417 6.92221L13.9392 12.2262L23.4852 21.7722Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_209_5992">
          <rect width="36" height="36" fill="currentColor" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default EraserIcon;
