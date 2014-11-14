require 'selenium-webdriver'
require 'faker'
require 'byebug'

class Selenium::WebDriver::Driver
  def find_dropdown(type, val)
    el = self.find_element(type, val)
    Selenium::WebDriver::Support::Select.new(el)
  end
end

def generate_user
  Faker::Config.locale = 'en-US'
  return {
    first_name: 'John',
    last_name: 'Smith',
    email: "naruto137+dinosaurs-#{Faker::Number.number(10)}@gmail.com",
    phone: {
      npa: Faker::PhoneNumber.area_code,
      co: Faker::PhoneNumber.exchange_code,
      line: Faker::PhoneNumber.subscriber_number
    },
    password: 'foobarfoobar1'
  }
end

user = generate_user
coupon_code = '5OFF'

driver = Selenium::WebDriver.for :firefox
driver.navigate.to 'https://www.leapset.com/order/profile/create'

# create account
driver.find_element(:id, 'account_email').send_keys user[:email]
driver.find_element(:id, 'account_phone1').send_keys user[:phone][:npa]
driver.find_element(:id, 'account_phone2').send_keys user[:phone][:co]
driver.find_element(:id, 'account_phone3').send_keys user[:phone][:line]
driver.find_element(:id, 'account_pwd').send_keys user[:password]
driver.find_element(:id, 'account_confirm_pwd').send_keys user[:password]
driver.find_element(:css, '.creat-acc').click

# set user's name
driver.find_element(:id, 'custinfo_first_name').send_keys user[:first_name]
driver.find_element(:id, 'custinfo_last_name').send_keys user[:last_name]
driver.find_element(:id, 'id_link_save_changes').click

# navigate to the menu page
driver.navigate.to 'https://www.leapset.com/order/restaurant/dinosaursmarket94114'

byebug

# # now add the order! nom nom
# order_el = driver.find_elements(:class, 'meal-menu-des').find { |el|
#   el.text.downcase.include? 'pork and shrimp'
# }
# order_el.click

# # wait for modal to pop up
# wait = Selenium::WebDriver::Wait.new(timeout: 10)
# wait.until { driver.find_element(class: 'cust-txt-tp-1') }

# # enter special instructions and add to cart!
# driver.find_element(:class, 'cust-txt-tp-1').send_keys 'have peanut sauce'
# driver.find_element(:class, 'add-item').click

# wait for modal to close
wait = Selenium::WebDriver::Wait.new(timeout: 10)
wait.until { driver.find_element(:xpath, '//*[@id="id_shopping_cart_checkout_form"]/ul/li[3]/input') }

# checkout
driver.find_element(:xpath, '//*[@id="id_shopping_cart_checkout_form"]/ul/li[3]/input').click
driver.find_element(:id, 'pickup_discount_code').send_keys coupon_code
driver.find_element(:xpath, '//*[@id="id_pickup_form"]/div[8]/div/div/div[2]/a').click

# billing info
driver.find_element(:id, 'payment_nameoncard').send_keys 'John Smith'
driver.find_element(:id, 'payment_ccnumber').send_keys ENV["AMEX_NUM"]
driver.find_dropdown(:id, 'payment_cctype').select_by(:text, 'American Express')
driver.find_dropdown(:id, 'payment_expdatem').select_by(:text, ENV["AMEX_MONTH"])
driver.find_dropdown(:id, 'payment_expdatey').select_by(:text, ENV["AMEX_YEAR"])
driver.find_element(:id, 'payment_cvvcode').send_keys ENV["AMEX_CVV"]

byebug; pause = true

# place the order! nom nom!
driver.find_element(:class, 'submit-order-buttn').click
