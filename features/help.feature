Feature: help
    As a user
    I want to be shown a help message
    So that I know how to use the API

    Scenario: GET help
        When I request the following data from "/graphql":
        """
        {
          help
        }
        """
        Then I should see the following response:
        """
        {
          "data": {
            "help": "Use this API somehow"
          }
        }
        """
