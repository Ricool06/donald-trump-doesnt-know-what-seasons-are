Feature: tweets
  As a user
  I want to get Donald Trump's tweets regarding global warming
  So that I am reminded of how much of an idiot he is

  Scenario: Get some tweets
    Given tweets by Donald Trump exist on Twitter
    When I request the following data from "/graphql":
    """
    {
      tweets {
        date,
        content,
        likes,
        retweets
      }
    }
    """
    Then I should receive a valid tweets response

  Scenario: Get some tweets in a date range
    Given tweets by Donald Trump exist on Twitter from 2013
    When I request the following data from "/graphql":
    """
    {
      tweets(since: "2013-01-01T00:00:00.000Z", until: "2013-12-31T23:59:59.000Z") {
        date,
        content,
        likes,
        retweets
      }
    }
    """
    Then I should receive a valid tweets response
    And the response should contain tweets from 2013
