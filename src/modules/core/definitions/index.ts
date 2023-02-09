export interface Player {
  id: number;
  name: string;
  level?: number;
  items?: number;
  gender?: number;
  theme?: Theme;
  avatar?: number;
  won?: boolean;
}

export interface Theme {
  name: string;
  colors: {
    text: string;
    primary: string;
    secondary: string;
  };
}

