type CloseIconProps = {
  width?: string;
  height?: string;
  fill?: string;
  onClick?: any;
};

const ArrowLeftIcon = ({ width, height, fill, onClick }: CloseIconProps) => {
  return (
    <svg
      onClick={onClick}
      width={width ? width : "5vw"}
      height={height ? height : "5vw"}
      viewBox="1 0 24 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.8281 12.0003L15.7781 16.9503L14.3641 18.3643L8.00008 12.0003L14.3641 5.63626L15.7781 7.05026L10.8281 12.0003Z"
        fill={fill ? fill : "black"}
      />
    </svg>
  );
};

export default ArrowLeftIcon;
