import { SVGProps } from "react";
const EtherIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="#15B79E"
      d="M11.804 9.785 6.089 0 .375 9.785l5.714 3.49 5.715-3.49Z"
    />
    <path
      fill="#15B79E"
      d="m6.09 15.207 5.714-3.49L6.08 20 .375 11.702l5.714 3.505Z"
    />
  </svg>
);
export { EtherIcon };
