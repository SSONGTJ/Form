import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type quest = {
  id: string;
  title: string;
  type: string;
  created_at: Date;
};
