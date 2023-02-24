import React from "react";

// @ts-ignore
import Avatar0 from "../../../../../assets/avatars/avatar_0.svg";
// @ts-ignore
import Avatar1 from "../../../../../assets/avatars/avatar_1.svg";
// @ts-ignore
import Avatar2 from "../../../../../assets/avatars/avatar_2.svg";
// @ts-ignore
import Avatar3 from "../../../../../assets/avatars/avatar_3.svg";
// @ts-ignore
import Avatar4 from "../../../../../assets/avatars/avatar_4.svg";
// @ts-ignore
import Avatar5 from "../../../../../assets/avatars/avatar_5.svg";
// @ts-ignore
import Avatar6 from "../../../../../assets/avatars/avatar_6.svg";
// @ts-ignore
import Avatar7 from "../../../../../assets/avatars/avatar_7.svg";
// @ts-ignore
import Avatar8 from "../../../../../assets/avatars/avatar_8.svg";
// @ts-ignore
import Avatar9 from "../../../../../assets/avatars/avatar_9.svg";
// @ts-ignore
import Avatar10 from "../../../../../assets/avatars/avatar_10.svg";
// @ts-ignore
import Avatar11 from "../../../../../assets/avatars/avatar_11.svg";
// @ts-ignore
import Avatar12 from "../../../../../assets/avatars/avatar_12.svg";
// @ts-ignore
import Avatar13 from "../../../../../assets/avatars/avatar_13.svg";
// @ts-ignore
import Avatar14 from "../../../../../assets/avatars/avatar_14.svg";
// @ts-ignore
import Avatar15 from "../../../../../assets/avatars/avatar_15.svg";
// @ts-ignore
import Avatar16 from "../../../../../assets/avatars/avatar_16.svg";
// @ts-ignore
import Avatar17 from "../../../../../assets/avatars/avatar_17.svg";
import themes from "../../utils/themes";

const avatars = [
  Avatar0,
  Avatar1,
  Avatar2,
  Avatar3,
  Avatar4,
  Avatar5,
  Avatar6,
  Avatar7,
  Avatar8,
  Avatar9,
  Avatar10,
  Avatar11,
  Avatar12,
  Avatar13,
  Avatar14,
  Avatar15,
  Avatar16,
  Avatar17,
];

export const LAST_AVATAR_INDEX = 17;

interface AvatarImageProps {
  index: number;
  borderColor: string;
  style?: any;
  width: number;
  height: number;
}

/**
 * Render the avatar SVG component based on the index received as prop
 *
 * For now I couldn't find another way of importing the SVG images individually
 * as components (which enable changing the primary and secondary colors) AND
 * render just one based on the index received; the choosen solution was to store
 * all the images in an array and check the index in a .map loop
 */
const AvatarImage: React.FunctionComponent<AvatarImageProps> = ({
  index,
  borderColor,
  style,
  width,
  height,
}) => {
	index = index !== undefined ? index : 0;
  return (
    <>
      {avatars.map((Avatar, i) => {
				if (i !== index) return;
        return (
          <Avatar
						key={i}
            secondaryColor={borderColor || themes[0]?.colors.secondary}
            style={style}
            width={width}
            height={height}
          />
        );
      })}
    </>
  );
};

export default AvatarImage;
