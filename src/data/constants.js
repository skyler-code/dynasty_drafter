import stringHash from 'string-hash';
import nameParser from 'humanparser';

export const PLAYER_POSITIONS = ["QB", "RB", "WR", "TE", "D/ST", "K"];
export const NFL_TEAMS = ["ARI", "ATL", "BAL", "BUF", "CAR", "CHI", "CIN", "CLE", "DAL", "DEN", "DET", "GB", "HOU", "IND", "JAX", "KC", "LAC", "LAR", "MIA", "MIN", "NE", "NO", "NYG", "NYJ", "OAK", "PHI", "PIT", "SEA", "SF", "TB", "TEN", "WAS"];

export function hashPlayerInfo( player ){
    let playerName = nameParser.parseName( player.Name.toLowerCase().replace(/[.]/g, "") );
    return stringHash( playerName.firstName.substring(0, 5) + " " + playerName.lastName + player.FantasyPosition.toLowerCase() );
}