Feature: Order Management

  Scenario: Create a new order and verify it exists
    Given a customer with document "12345678901"
    And the following order items:
      | item   | value | quantity |
      | item1  | 100   | 2        |
      | item2  | 50    | 1        |
    When the order is created
    Then the order should be retrievable by its number
