type CloseIconProps = {
  width?: string;
  height?: string;
  fill?: string;
  onClick?: any;
};

const FilledIcon = ({ width, height, fill, onClick }: CloseIconProps) => {
  return (
    <svg
      onClick={onClick}
      width={width ? width : "5vw"}
      height={height ? height : "5vw"}
      viewBox="0 0 1024 1024"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={fill ? fill : "black"}
        d="M512 64a448 448 0 1 1 0 896a448 448 0 0 1 0-896m0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512L353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336L616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512L670.4 407.936a38.4 38.4 0 1 0-54.336-54.336z"
      ></path>
    </svg>
  );
};

export default FilledIcon;
