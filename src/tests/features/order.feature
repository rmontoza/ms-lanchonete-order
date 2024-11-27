Feature: Order Management

  Scenario: Create a new order successfully
    Given a customer with document "12345678901"
    And the following order items:
      | item   | value | quantity |
      | item1  | 100   | 2        |
      | item2  | 50    | 1        |
    When the order is created
    Then the order should have an order number
    And the total value should be 250
    And the order status should be "CREATED"
