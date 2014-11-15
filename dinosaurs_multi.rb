#!/usr/bin/env ruby

require 'faker'
require 'byebug'

require_relative "helpers"
require_relative "modded_selenium"

if is_flag_on?("--help")
  #===================================
  # Example Usage:
  puts "./dinosaurs_multi --debug # byepry instead of press enter and inserts fake credit card information"
  puts "./dinosaurs_multi --no-confirm #you do not need to confirm an order, it just orders"
  puts "./dinosuars_multi --dino # change to the dinosaurs page"
  puts "./dinosaurs_multi --dino-seed # will add dinosaurs things to the menu"
  puts "./dinosaurs_multi --random_sleep # will sleep for random intervals between signups"
  puts "./dinosaurs_multi --custom # pauses after adding an item"
  exit
end

def generate_user
  Faker::Config.locale = 'en-US'
  {
    first_name: 'John',
    last_name: 'Smith',
    email: "zach+dinosaurs-#{Faker::Number.number(10)}@zachlatta.com",
    phone: {
      npa: Faker::PhoneNumber.area_code,
      co: Faker::PhoneNumber.exchange_code,
      line: Faker::PhoneNumber.subscriber_number
    },
    password: 'foobarfoobar1'
  }
end

class LeapDriver < Selenium::WebDriver::Driver
  attr_accessor :user, :order, :ordered, :restaurant_url, :total_price

  def go_to_menu
    self.navigate.to self.restaurant_url
  end

  def signup(user)
    self.navigate.to 'https://www.leapset.com/order/profile/create'

    # create account
    self.find_element(:id, 'account_email').send_keys user[:email]
    self.find_element(:id, 'account_phone1').send_keys user[:phone][:npa]
    self.find_element(:id, 'account_phone2').send_keys user[:phone][:co]
    self.find_element(:id, 'account_phone3').send_keys user[:phone][:line]
    self.find_element(:id, 'account_pwd').send_keys user[:password]
    self.find_element(:id, 'account_confirm_pwd').send_keys user[:password]
    self.find_element(:css, '.creat-acc').click

    self.wait_until_visible(:id, 'custinfo_first_name')

    # set user's name
    self.find_element(:id, 'custinfo_first_name').send_keys user[:first_name]
    self.find_element(:id, 'custinfo_last_name').send_keys user[:last_name]
    self.find_element(:id, 'id_link_save_changes').click
  end

  def find_item(item)
    self.find_elements(:class, 'meal-menu-des').find { |el|
      el.text.downcase.include? item.downcase
    }
  end

  def get_price(name)
    item = find_item(name)
    price_string = item.find_element(:xpath, "../div[@class='meal-menu-price']").text
    price_string.gsub('$', '').to_f
  end

  def find_cheapest_item
    item_prices = self.find_elements(:class, 'meal-menu-price').map { |el|
      price = el.text.gsub('$', '').to_f
      name = el.find_element(:xpath, "../div[@class='meal-menu-des']").text
      {name: name, price: price}
    }
    item_prices.min_by { |item| item[:price] }
  end

  def add_item(item, quantity, custom_instructions='')
    order_el = find_item(item)
    order_el.click

    # wait for modal to pop up
    
    self.wait_until_visible(:class, 'cust-txt-tp-1')

    # enter special instructions and add to cart!
    quantity_input = self.find_element(:id, 'id_add_item_dlg_quantity')
    quantity_input.clear
    quantity_input.send_keys(quantity)

    self.find_element(:class, 'cust-txt-tp-1').send_keys custom_instructions

    if is_flag_on? "--custom"
      wait_for_enter 'Please choose your preferences and click the button to add'

    else
      self.find_element(:class, 'add-item').click

      begin
        wait_until_invisible(:class, 'add-item')
      rescue
        wait_for_enter 'Please choose your preferences and click the button to add'
      end
    end
    
  end

  def read_items
    order = []

    num_rows = self.find_elements(:class, 'row-main-product').length

    num_rows.times do |i|
      row = self.find_elements(:class, 'row-main-product')[i]
      cols = row.find_elements(:css, 'td')


      next_row_els = row.find_elements(:xpath, 'following-sibling::tr')

      custom = ""
      if next_row_els.empty?
        # there is no custom instrutions
      else
        next_row_el = next_row_els.first
        next_row_class = next_row_el.attribute("class")
    
        if next_row_class == "row-main-product-attrib"
          custom = next_row_el.text
        end
      end

      name = cols[1].text

      item = {
        quantity: cols[0].text,
        name: name,
        price: get_price(name),
        custom: custom
      }

      order << item
    end

    return order
  end

  def order_items
    self.total_price = 0
    cheapest_item = find_cheapest_item

    self.order = self.read_items

    3.times { log "" }
    log(Time.now.strftime('%A, %m/%d %H:%M'))
    log(self.restaurant_url)

    order.each do |item|
      item[:quantity].to_i.times do
        self.manage.delete_all_cookies
        self.signup generate_user
        self.go_to_menu
        self.add_item(item[:name], 1, item[:custom])

        if item[:price] < 5.01
          num_cheap_thing = ((5.01 - item[:price]) / cheapest_item[:price]).ceil
          add_item(cheapest_item[:name], num_cheap_thing)
        end

        self.checkout

        checkout_price_string = self.find_element(:css, '#id_cart_total_amount_row > p:nth-child(1) > span:nth-child(1)').text
        checkout_price = checkout_price_string.gsub(/[^0-9\.]/, '').to_f

        log "#{item[:name]}\t$#{checkout_price}"

        self.total_price += checkout_price

        if is_flag_on? "--sleep"
          sleep rand(1..10)
        end
      end
    end

    log "Total: #{self.total_price}"
    read_log
  end

  def checkout
    self.wait_until_visible(:xpath, "//*[@id='id_shopping_cart_checkout_form']/ul/li[3]/input")

    # checkout
    self.find_element(:xpath, "//*[@id='id_shopping_cart_checkout_form']/ul/li[3]/input").click
    self.find_element(:id, 'pickup_discount_code').send_keys '5OFF'

    self.find_element(:xpath, "//*[@id='id_pickup_form']/div[8]/div/div/div[2]/a").click

    # billing info
    if is_flag_on?("--debug")
      self.find_element(:id, 'payment_ccnumber').send_keys "1234567890"
    else
      self.find_element(:id, 'payment_ccnumber').send_keys ENV['CC_NUMBER']
    end

    self.find_element(:id, 'payment_nameoncard').send_keys ENV['CC_NAME']

    self.find_dropdown(:id, 'payment_cctype').select_by(:text, ENV['CC_TYPE'])
    self.find_dropdown(:id, 'payment_expdatem')
      .select_by(:text, ENV['CC_EXP_MONTH'])
    self.find_dropdown(:id, 'payment_expdatey')
      .select_by(:text, ENV['CC_EXP_YEAR'])
    self.find_element(:id, 'payment_cvvcode').send_keys ENV['CC_CVV']

    if is_flag_on? "--no-confirm"
      # do not confirm
    else
      wait_for_enter 'Please confirm your order. Exit the program to cancel the order'
    end

    self.find_element(:class, 'submit-order-buttn').click
  end
end

f = LeapDriver.for :firefox

if is_flag_on?("--dino-seed") || is_flag_on?("--dino")
  f.navigate.to 'https://www.leapset.com/order/restaurant/dinosaursmarket94114'

  if is_flag_on? "--dino-seed"
    f.add_item("pork and shrimp", 1, "Popopopo")
    f.add_item("pork and shrimp", 1, "")
    f.add_item("chicken and shrimp", 1, "Chika chika")
    f.add_item("pork and shrimp", 1, "")
  end
else
  f.navigate.to 'https://www.leapset.com/order/ca-san-francisco'
  wait_for_enter 'Order what you want!'

  f.restaurant_url = f.current_url
end


f.order_items
