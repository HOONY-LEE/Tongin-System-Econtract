type CloseIconProps = {
  width?: string;
  height?: string;
  fill?: string;
  onClick?: any;
};

const PenIcon = ({ width, height, fill, onClick }: CloseIconProps) => {
  return (
    <svg
      onClick={onClick}
      width={width ? width : "5vw"}
      height={height ? height : "5vw"}
      viewBox="0 0 46 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={fill ? fill : "black"}
        d="M36.5704 23.4413L34.8292 21.7001L10.4473 46.082H0V35.6323L27.8619 7.76796L41.794 21.7001C42.2557 22.162 42.5151 22.7883 42.5151 23.4413C42.5151 24.0944 42.2557 24.7207 41.794 25.1826L24.3819 42.5971L20.897 39.1147L36.5704 23.4413ZM38.3116 0.803111L45.2789 7.76796C45.7406 8.22981 46 8.85612 46 9.50918C46 10.1622 45.7406 10.7885 45.2789 11.2504L41.794 14.7353L31.3468 4.28554L34.8292 0.803111C35.291 0.341404 35.9173 0.0820312 36.5704 0.0820312C37.2234 0.0820312 37.8498 0.341404 38.3116 0.803111Z"
      ></path>
    </svg>
  );
};

export default PenIcon;
