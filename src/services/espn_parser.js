import _ from "underscore";
import nameParser from 'humanparser';

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
    let claimedPlayers = createPlayerArray( leagueInfo );
    _.forEach(allPlayers, function( player )
        {
        player.Owner = ( _.find( claimedPlayers, function( plr ){ return playerEvaluator( player, plr ) } ) || {} ).owner || null;
        draftRoster.push( player );
        } );
    draftRoster = _.filter(draftRoster, function(player){ return !player.Owner } );
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
        playerInfo = { Name: playerName, Team: _.first( infoStrSplit ).toUpperCase(), Position: infoStrSplit[1] };
    return playerInfo;
}

function isNullOrWhitespace( input ) {
    return !input || !input.trim();
}

function playerEvaluator( firstPlayer, secondPlayer ) {
    firstPlayer = _.mapObject( firstPlayer, strAdjust );
    secondPlayer = _.mapObject( secondPlayer, strAdjust );

    let firstName = nameParser.parseName(firstPlayer.Name);
    let secondName = nameParser.parseName(secondPlayer.Name);

    return ( firstName.lastName === secondName.lastName )
    && (firstPlayer.Team === secondPlayer.Team)
    && (firstPlayer.Position === secondPlayer.Position)
    && ( firstName.firstName === secondName.firstName || ( firstName.firstName.startsWith( secondName.firstName ) || secondName.firstName.startsWith( firstName.firstName ) ) )
}

function strAdjust( str )
{
    return typeof(str) === "string" ? str.toLowerCase().replace( periodRegex, '' ) : str;
}

function createPlayerArray( leagueInfo ){
    let players = [];
    _.forEach(leagueInfo.teamInfo, function( team ){
        _.forEach(team.players, function( player ){
            let parsedName = nameParser.parseName(player.Name);
            let fullName = parsedName.firstName + " " + parsedName.lastName;
            players.push({ Name: fullName, owner: team.teamName, firstName: parsedName.firstName, lastName: parsedName.lastName, Position: player.Position, Team: player.Team });
        } );
    } );
    return players;
}

export default new ESPNParserService();