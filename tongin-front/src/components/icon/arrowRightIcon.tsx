type CloseIconProps = {
  width?: string;
  height?: string;
  fill?: string;
  onClick?: any;
};

const ArrowRightIcon = ({ width, height, fill, onClick }: CloseIconProps) => {
  return (
    <svg
      onClick={onClick}
      width={width ? width : "5vw"}
      height={height ? height : "5vw"}
      viewBox="0 0 24 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.1719 11.9997L8.22192 7.04974L9.63592 5.63574L15.9999 11.9997L9.63592 18.3637L8.22192 16.9497L13.1719 11.9997Z"
        fill={fill ? fill : "black"}
      />
    </svg>
  );
};

export default ArrowRightIcon;
