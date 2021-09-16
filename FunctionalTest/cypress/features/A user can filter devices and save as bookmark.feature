Feature: A user can filter devices and save as bookmark

   As a Raychem Supervisor user, I can filter devices and save them as bookmark.
   With these bookmarks we can directly filter selected devices.

   Scenario Outline: A user can filter devices on devices page in "<viewport>" view
      Given I am on "<viewport>" view
      And I am on the "login" page
      When I click on button with name "Sign In with TIDP"
      And I click on "DEVICES" navigation link
      Then I should navigate to "devices" page
      When I click on "filter" button
      And I should see "filterMenu" menu

      Examples:
         | viewport |
         | desktop  |

   Scenario Outline: A user can select option from list of attributes on devices page in "<viewport>" view
      When I am on "<viewport>" view
      And I should see first attribute of filter menu in "<viewport>"
      And I click on first attribute of filter menu
      And I click on first option from list of first attribute in "<viewport>"
      Then I should see selected option on attribute tag
      And I should see device cards according to the filter

      Examples:
         | viewport |
         | desktop  |

   Scenario Outline: A user can check the functionality of reset button on devices page in "<viewport>" view
      When I click on "reset" button
      Then I should not see selected option on attribute tag

      Examples:
         | viewport |
         | desktop  |

   Scenario Outline: A user can select option from list of attributes on devices page in "<viewport>" view
      When I am on "<viewport>" view
      Then I should see first attribute of filter menu in "<viewport>"
      And I click on first option from list of first attribute in "<viewport>"
      And I click on "reset" button

      Examples:
         | viewport |
         | mobile   |

   Scenario Outline: A user can save and delete filter as bookmark in "<viewport>" view
      When I am on "<viewport>" view
      And I click on "saveBookmark" icon in "<viewport>"
      And I enter label "NewBookmark"
      And I click on "save" button
      And I click on "saveBookmark" icon in "<viewport>"
      Then I should see "NewBookmark" in bookmark list
      And I click on "savedBookmark" text
      And I click on "saveBookmark" icon in "<viewport>"
      And I click on "NewBookmark" delete button

      Examples:
         | viewport |
         | mobile   |

   Scenario Outline: A user can see save bookmark pop-up in "<viewport>" view
      When I am on "<viewport>" view
      Then I click on "saveBookmark" icon in "<viewport>"
      And I should see "addLabelModal" pop-up

      Examples:
         | viewport |
         | desktop  |

   Scenario Outline: A user can save and delete filter as bookmark in "<viewport>" view
      When I am on "<viewport>" view
      And I enter label "NewBookmark"
      And I click on "save" button
      * I click on "bookmark" box
      Then I should see "NewBookmark" in bookmark list
      And I click on "savedBookmark" text
      And I click on "bookmark" box
      And I click on "NewBookmark" delete button
      Then I should see "bookmark" box is disabled

      Examples:
         | viewport |
         | desktop  |

   Scenario Outline: A user can close filter menu in "<viewport>" view
      When I am on "<viewport>" view
      And I click on "filter" button
      Then I should not see "filterMenu" menu
      And I click on "logout" button
      Then I should see "tidp" button
      
      Examples:
         | viewport |
         | desktop  |
