type CloseIconProps = {
  width?: string;
  height?: string;
  fill?: string;
  onClick?: any;
};

const ContractIcon = ({ width, height, fill, onClick }: CloseIconProps) => {
  return (
    <svg
      onClick={onClick}
      width={width ? width : "5vw"}
      height={height ? height : "5vw"}
      viewBox="0 0 42 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={fill ? fill : "black"}
        d="M39.045 45.3203H2.60053C1.99643 45.3203 1.41707 45.0833 0.989899 44.6613C0.562733 44.2393 0.322754 43.667 0.322754 43.0703V2.57031C0.322754 1.97358 0.562733 1.40128 0.989899 0.979322C1.41707 0.557365 1.99643 0.320313 2.60053 0.320312H39.045C39.6491 0.320313 40.2284 0.557365 40.6556 0.979322C41.0828 1.40128 41.3228 1.97358 41.3228 2.57031V43.0703C41.3228 43.667 41.0828 44.2393 40.6556 44.6613C40.2284 45.0833 39.6491 45.3203 39.045 45.3203ZM9.43386 9.32031V18.3203H18.545V9.32031H9.43386ZM9.43386 22.8203V27.3203H32.2116V22.8203H9.43386ZM9.43386 31.8203V36.3203H32.2116V31.8203H9.43386ZM23.1005 11.5703V16.0703H32.2116V11.5703H23.1005Z"
      ></path>
    </svg>
  );
};

export default ContractIcon;
