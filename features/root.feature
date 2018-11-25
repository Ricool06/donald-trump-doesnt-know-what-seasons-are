Feature: root
    As a user
    I want to be shown a help message at the root
    So that I know how to use the API

    Scenario: GET /
        When I send a request to the root endpoint
        Then I should see the following response:
        """
        {
            "data": {
                "help": "Use this API somehow"
            }
        }
        """
