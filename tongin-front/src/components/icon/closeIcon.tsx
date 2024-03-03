type CloseIconProps = {
  width?: string;
  height: string;
  fill: string;
  onClick?: any;
};

const CloseIcon = ({ width, height, fill, onClick }: CloseIconProps) => {
  return (
    <svg
      onClick={onClick}
      width={width}
      height={height}
      viewBox="0 0 22 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 8.94485L19.5559 0L22 2.55515L13.4441 11.5L22 20.4448L19.5559 23L11 14.0552L2.44406 23L0 20.4448L8.55594 11.5L0 2.55515L2.44406 0L11 8.94485Z"
        fill={fill}
      />
    </svg>
  );
};

export default CloseIcon;
