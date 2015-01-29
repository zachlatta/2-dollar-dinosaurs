if is_flag_on?("--help")
  #===================================
  # Example Usage:
  puts "./dinosaurs_multi --debug # byepry instead of press enter and inserts fake credit card information"
  puts "./dinosaurs_multi --no-confirm #you do not need to confirm an order, it just orders"
  puts "./dinosuars_multi --dino # change to the dinosaurs page"
  puts "./dinosuars_multi --oni # change to the dinosaurs page"
  puts "./dinosaurs_multi --dino-seed # will add dinosaurs things to the menu"
  puts "./dinosaurs_multi --random_sleep # will sleep for random intervals between signups"
  puts "./dinosaurs_multi --custom # pauses after adding an item"
  puts "./dinosaurs_multi --custom_bundling # pauses after adding an item so you can add more after it."
  puts "./dinosaurs_multi --zach # makes adds zach to the front of the queue"
  puts "./dinosaurs_multi --jonathan # makes adds zach to the front of the queue"
  # puts "./dinosaurs_multi --no_cheap # does not try to add cheap items"
  puts "./dinosaurs_multi --manual # does not do automatic ordering"
  exit
end