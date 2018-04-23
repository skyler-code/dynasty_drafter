import _ from "underscore";
import teamData from '../data/team_data';
import * as constants from './../data/constants';

let recordRegex = /[(]\d?\d[-]\d?\d[)]/g;
let periodRegex = /[.]/g;
let playerPositions = ["qb", "rb", "wr", "te", "flex", "op", "d/st", "k", "bench", "ir"];


class ESPNParserService {

    parseInput( input ) {
        let leagueInfo = {};
        leagueInfo.teamInfo = getTeamInfo( input );
        leagueInfo.leagueName = getLeagueName( input );
        leagueInfo.teamCount = Object.keys(leagueInfo.teamInfo).length;
        return leagueInfo;
    }

    getAvailablePlayers( allPlayers, leagueInfo ){
        let draftRoster = [];
        let claimedPlayers = createClaimedPlayerArray( leagueInfo );
        _.forEach(allPlayers, function( player )
            {
            if( !claimedPlayers[ player.hashKey ])
                draftRoster.push( player );
            } );
        return draftRoster;
    }
}

function getLeagueName( str )
{
    let leagueName = "League name not found";
    let splitStr = str.split(/\r?\n/);
    splitStr = _.first(splitStr, splitStr.indexOf( "League Rosters" ) );
    splitStr.forEach( function( line )
    {
        if(line.includes("ESPN » Free Fantasy Football"))
            leagueName = line.split(" » ")[2] || leagueName;
    } );
    return leagueName;
}

function getTeamInfo( str )
{
    let teamInfo = {};
    let splitInput = str.split(/\r?\n/);
    splitInput = _.rest( splitInput, splitInput.indexOf( "League Rosters" ) + 1 );
    splitInput.length = _.lastIndexOf( splitInput, "Need Help?" ) + 1;
    splitInput = _.without(splitInput, "");
    let teamName = "";
    _.forEach(splitInput, function(str){
        if( recordRegex.test( str ) )
        {
            let teamLine = recordRegex[Symbol.split](str);
            teamName = _.first(teamLine).trim();
            teamInfo[teamName] = teamInfo[teamName] || {};
            teamInfo[teamName].players = teamInfo[teamName].players || [];
            teamInfo[teamName].record = parseRecordInfo( str );
            teamInfo[teamName].teamName = teamName;
        }
        else
        {
            let splitStr = str.split('\t');
            if(_.some(splitStr, isPlayerPosition))
            {
                let playerInfo = parsePlayerInfoStr( splitStr[1] );
                if( playerInfo )
                {
                    teamInfo[teamName].players.push(playerInfo);
                }
            }
        }
    } );
    return teamInfo;
}

function parseRecordInfo( str )
{
    recordRegex.lastIndex = 0;
    let recordString = _.first( recordRegex.exec( str ) ).replace("(", "").replace(")", "");
    let winLossInfo = recordString.split("-");
    let wins = parseInt( winLossInfo[0], 10 );
    let losses = parseInt( winLossInfo[1], 10 );
    return { recordString: recordString, wins: wins, losses: losses };
}

function isPlayerPosition( str )
{
    return playerPositions.indexOf( str.toLowerCase() ) > -1;
}

function parsePlayerInfoStr( str )
{
    let playerInfo = null;
    let splitStr = str.split(',');
    let playerName = (_.first( splitStr ) || "").replace("*", "").replace("D/ST D/ST", "D/ST").replace(periodRegex, "");
    let infoStr = (splitStr[1] || "").replace("QBreaking News", "").replace("Breaking News", "").replace("Breaking Video", "").replace("and Video", "").replace("Recent News", "").replace("IR", "").trim();
    let infoStrSplit = infoStr.split(" ");
    if( !isNullOrWhitespace( playerName ) && _.isString(infoStrSplit[0]) && _.isString(infoStrSplit[1]) )
        playerInfo = { Name: playerName, Team: _.first( infoStrSplit ).toUpperCase(), FantasyPosition: infoStrSplit[1] };
    else if ( playerName.includes("D/ST") ){
        let team = _.find(teamData, function( team ){ return team.Name.includes( playerName ) } );
        playerInfo = { Name: team.Name, Team: team.Team, FantasyPosition: team.FantasyPosition };
    }
    if( playerInfo )
        playerInfo.hashKey = constants.hashPlayerInfo( playerInfo );
    return playerInfo;
}

function isNullOrWhitespace( input ) {
    return !input || !input.trim();
}

function createClaimedPlayerArray( leagueInfo ){
    let players = {};
    _.forEach(leagueInfo.teamInfo, function( team ){
        _.forEach(team.players, function( player ){
            if( !players[player.hashKey] )
                players[player.hashKey] = player.Name;
        } );
    } );
    return players;
}

export default new ESPNParserService();