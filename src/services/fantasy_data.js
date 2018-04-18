// services are state-less
// they act as utility facades that abstract the details for complex operations
// normally, our interface to any sort of server API will be as a service

//import _ from 'lodash';

const FANTASY_DATA_ENDPOINT = 'https://api.fantasydata.net/v3/nfl/stats/JSON';
class FantasyPlayerService {

  async getFantasyPlayerData() {
    const url = `${FANTASY_DATA_ENDPOINT}/Players`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        "Ocp-Apim-Subscription-Key": process.env.REACT_APP_FANTASY_DATA_KEY
      }
    });
    if (!response.ok) {
      throw new Error(`FantasyPlayerService getFantasyPlayerData failed, HTTP status ${response.status}`);
    }
    const data = await response.json();
    /*console.log(data)
    const children = _.get(data, 'data.children');
    if (!children) {
      throw new Error(`RedditService getDefaultSubreddits failed, children not returned`);
    }
    const sortedBySubscribers = _.orderBy(children, 'data.subscribers', 'desc');*/
    return data;/*_.map(sortedBySubscribers, (subreddit) => {
      // abstract away the specifics of the reddit API response and take only the fields we care about
      return {
        title: _.get(subreddit, 'data.display_name'),
        description: _.get(subreddit, 'data.public_description'),
        url: _.get(subreddit, 'data.url')
      }
    });*/
  }

}

export default new FantasyPlayerService();