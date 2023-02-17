/**
 * Info of a new character that can be used inside a game
 * Crew member aren't necessary used in every game
 * A game contains between 3 and 6 crew members as Players
 */
export interface CrewMember {
	id: number;
	name: string;
	gender: number;
	avatar: number;
	theme: Theme;
}

/**
 * Theme to render all things related to the player/crew member,
 * such as frames, SVGs, backgrounds and borders
 */
export interface Theme {
  name: string;
  colors: {
    text: string;
    primary: string;
    secondary: string;
  };
}

/**
 * A player is a crew member that was assigned to a game
 * A game is an match in progress that has from 3 to 6 crew
 * members fighting, levelling up and getting items
 * Just one player can win the match
 */
export interface Player {
  id: number;
	memberInfo: CrewMember;
  level: number;
  items: number;
  won: boolean;
}

