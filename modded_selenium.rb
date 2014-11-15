require 'selenium-webdriver'

class Selenium::WebDriver::Driver
  def find_dropdown(type, selector)
    el = self.find_element(type, selector)
    Selenium::WebDriver::Support::Select.new(el)
  end

  def wait_until_visible(type, selector, timeout=10)
    wait = Selenium::WebDriver::Wait.new(timeout: timeout)
    wait.until { self.find_element(type, selector) }
  end

  def wait_until_invisible(type, selector, timeout=5)
    wait = Selenium::WebDriver::Wait.new(timeout: timeout)
    wait.until { self.find_elements(type, selector).empty? }
  end
end