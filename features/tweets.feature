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
