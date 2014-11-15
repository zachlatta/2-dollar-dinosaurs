def is_flag_on?(flag)
  ARGV.include?(flag)
end

def log(line)
  open('order_log.txt', 'a') do |f|
    f.puts line
  end
end

def read_log
  f = File.open('order_log.txt', 'r')
  f.each_line do |line|
    puts line
  end
  f.close
end

def wait_for_enter(message='')
  if is_flag_on? "--debug"
    byebug
  else
    puts message
    puts 'Press Enter To Continue...'
    $stdin.gets
  end
end
