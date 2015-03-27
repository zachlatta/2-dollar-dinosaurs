#!/usr/bin/env ruby

require 'faker'
require 'firebase'


require_relative "helpers"
require_relative "modded_selenium"
require_relative "help"
require_relative "leap_driver"
require_relative "firebase"

$names = [ { first_name: "Shreyans", last_name: "Bhansali", id: "602825" }, { first_name: "Andrew", last_name: "Kortina", id: "609848" }, { first_name: "Allan", last_name: "Zhang", id: "617367" }, { first_name: "Robert", last_name: "Do", id: "624444" }, { first_name: "Dan", last_name: "Lopez", id: "707400" }, { first_name: "Benjamin", last_name: "Gleitzman", id: "707525" }, { first_name: "Mattan", last_name: "Griffel", id: "836841" }, { first_name: "Zack", last_name: "Howitt", id: "10514925" }, { first_name: "Chris", last_name: "Alfano", id: "10517111" }, { first_name: "Arman", last_name: "Suleimenov", id: "12331353" }, { first_name: "Patrick", last_name: "Bradley", id: "12805352" }, { first_name: "Will", last_name: "Smith", id: "14400107" }, { first_name: "Harrison", last_name: "Powers", id: "14901746" }, { first_name: "John", last_name: "Britton", id: "17502619" }, { first_name: "Chris", last_name: "Tosswill", id: "24409597" }, { first_name: "Iris", last_name: "Yung", id: "500233168" }, { first_name: "Benjamin", last_name: "Shyong", id: "501118377" }, { first_name: "Jim", last_name: "Grandpre", id: "501880766" }, { first_name: "Connie", last_name: "Ho", id: "504411084" }, { first_name: "Zach", last_name: "W", id: "506183916" }, { first_name: "Rafe", last_name: "Kettler", id: "507700376" }, { first_name: "Matt", last_name: "Lukashovitz", id: "511742220" }, { first_name: "Alex", last_name: "Rattray", id: "515004220" }, { first_name: "Talia", last_name: "Goldberg", id: "515679021" }, { first_name: "Pratham", last_name: "Mittal", id: "516888906" }, { first_name: "Drew", last_name: "Inglis", id: "520715821" }, { first_name: "Bogumił", last_name: "Giertler", id: "522775340" }, { first_name: "Tony", last_name: "Diepenbrock IV", id: "528415896" }, { first_name: "Corey", last_name: "Loman", id: "552762672" }, { first_name: "Karan", last_name: "Hiremath", id: "557098814" }, { first_name: "Dan", last_name: "Trujillo", id: "563672645" }, { first_name: "David", last_name: "Xu", id: "565156571" }, { first_name: "Justin", last_name: "Meltzer", id: "567412775" }, { first_name: "Grace", last_name: "Wang", id: "578770136" }, { first_name: "Nick", last_name: "Meyer", id: "584858853" }, { first_name: "Gerry", last_name: "Song", id: "10152679246867152" }, { first_name: "Michelle", last_name: "Lu", id: "593686712" }, { first_name: "Wesley", last_name: "Magness", id: "594552296" }, { first_name: "Kathy", last_name: "Zhou", id: "596193199" }, { first_name: "Ryan", last_name: "Shea", id: "600197712" }, { first_name: "Sam", last_name: "Appelbaum", id: "600737679" }, { first_name: "Josh", last_name: "Oynick", id: "608595448" }, { first_name: "Vivian", last_name: "Huang", id: "611082564" }, { first_name: "Chase", last_name: "Lambert", id: "611086214" }, { first_name: "Gabriel", last_name: "Leung", id: "612356855" }, { first_name: "Lu", last_name: "Chen", id: "615475607" }, { first_name: "Jonathan", last_name: "Gottfried", id: "10151945098131612" }, { first_name: "Eddie", last_name: "Cohen", id: "616835662" }, { first_name: "Dave", last_name: "Fontenot", id: "629564354" }, { first_name: "Alex", last_name: "Brashear", id: "630240097" }, { first_name: "Brad", last_name: "Oyler", id: "636428361" }, { first_name: "Emily", last_name: "Zhang", id: "641818107" }, { first_name: "Jinyan", last_name: "Cao", id: "649893890" }, { first_name: "Patrick", last_name: "Yoon", id: "653499437" }, { first_name: "Adi", last_name: "Dahiya", id: "658783924" }, { first_name: "Clara", last_name: "Wu", id: "673965129" }, { first_name: "Natasha", last_name: "Green", id: "676271809" }, { first_name: "David", last_name: "Mally", id: "677646022" }, { first_name: "Fitz", last_name: "Tepper", id: "681131694" }, { first_name: "Stefan", last_name: "Zhelyazkov", id: "693468495" }, { first_name: "Robbie", last_name: "Glynn", id: "697908303" }, { first_name: "Nate", last_name: "Close", id: "699029923" }, { first_name: "Shaanan", last_name: "Cohney", id: "732100026" }, { first_name: "Rigel", last_name: "Swavely", id: "749659041" }, { first_name: "Megha", last_name: "Agrawal", id: "771109605" }, { first_name: "Henry", last_name: "You", id: "771870216" }, { first_name: "Edward", last_name: "Lando", id: "774132958" }, { first_name: "Jared", last_name: "Katz", id: "10154019618140567" }, { first_name: "Alex", last_name: "Hint", id: "806667714" }, { first_name: "Abhishek", last_name: "Gadiraju", id: "816607231" }, { first_name: "Dan", last_name: "Mundy", id: "816980152" }, { first_name: "Sanjay", last_name: "Paul", id: "849060454" }, { first_name: "Michael", last_name: "Rivera", id: "854635012" }, { first_name: "Vincent", last_name: "Sanchez-Gomez", id: "1020540034" }, { first_name: "Brett", last_name: "van Zuiden", id: "1045260346" }, { first_name: "Jeffrey", last_name: "Shih", id: "1063080089" }, { first_name: "Jason", last_name: "Mow", id: "1063440122" }, { first_name: "Raghav", last_name: "Sood", id: "10202495425361657" }, { first_name: "Alon", last_name: "Lavi", id: "1127758094" }, { first_name: "Rob", last_name: "Cheung", id: "1144860053" }, { first_name: "Charlie", last_name: "Guo", id: "1155960123" }, { first_name: "Connie", last_name: "Wu", id: "1166670013" }, { first_name: "Max", last_name: "Guo", id: "1193293898" }, { first_name: "Fred", last_name: "Wang", id: "1211430224" }, { first_name: "Maarten", last_name: "Sap", id: "1211565515" }, { first_name: "Charles", last_name: "Kong", id: "1227960757" }, { first_name: "Vivek", last_name: "Panyam", id: "1232570401" }, { first_name: "Andrew", last_name: "Pilling", id: "1239916805" }, { first_name: "Troy", last_name: "Shu", id: "1241641191" }, { first_name: "Kent", last_name: "Chen", id: "1248270527" }, { first_name: "Ceasar", last_name: "Bautista", id: "1251778234" }, { first_name: "Kai", last_name: "Peng", id: "1264560303" }, { first_name: "Vaishak", last_name: "Kumar", id: "1272513902" }, { first_name: "Bob", last_name: "Han", id: "1293810879" }, { first_name: "Josh", last_name: "Wilson", id: "1307190045" }, { first_name: "Ana", last_name: "Giraldo-Wingler", id: "1328910065" }, { first_name: "Mike", last_name: "Swift", id: "1335540112" }, { first_name: "Lauren", last_name: "Frazier", id: "1338060026" }, { first_name: "Casey", last_name: "Rosengren", id: "1341660139" }, { first_name: "Dan", last_name: "Shipper", id: "1341720286" }, { first_name: "Peter", last_name: "Lai", id: "1342020074" }, { first_name: "Daryl", last_name: "Sew", id: "1343422061" }, { first_name: "Andrew", last_name: "Braunstein", id: "1370220343" }, { first_name: "Dan", last_name: "G", id: "1380330258" }, { first_name: "Cat", last_name: "Hu", id: "1381200269" }, { first_name: "Bowen", last_name: "Lu", id: "1383386426" }, { first_name: "Boris", last_name: "Treskunov", id: "1385869975" }, { first_name: "Sahil", last_name: "Shah", id: "1459756976" }, { first_name: "Scottie", last_name: "Biddle", id: "1467390672" }, { first_name: "Christopher", last_name: "Elwell", id: "1474320545" }, { first_name: "John", last_name: "Pernock", id: "1479510082" }, { first_name: "Sophia", last_name: "Coll", id: "1515180034" }, { first_name: "Pulak", last_name: "Mittal", id: "1532250196" }, { first_name: "Wesley", last_name: "Zhao", id: "1576770095" }, { first_name: "Ian", last_name: "Sibner", id: "1646527048" }, { first_name: "Steve", last_name: "Krouse", id: "1671105582" }, { first_name: "Geoffrey", last_name: "Vedernikoff", id: "1725380113" }, { first_name: "Zain", last_name: "Shah", id: "1803994492" }, { first_name: "Daniel", last_name: "Ge", id: "1813549154" }, { first_name: "Ishaan", last_name: "Gulrajani", id: "100000246825182" }, { first_name: "Gaby", last_name: "Moreno", id: "100000352770318" }, { first_name: "Arpita", last_name: "Biswas", id: "100001114304196" }, { first_name: "Tanvir", last_name: "Ahmed", id: "100001577607497" }, { first_name: "Victor", last_name: "Lourng", id: "100001604500510" }, { first_name: "Saskia", last_name: "Vola", id: "100002045807932" }, { first_name: "Zach", last_name: "Latta", id: "100003061461786" }, { first_name: "Jennifer", last_name: "Rubinovitz", id: "100003355165026" } ].shuffle(random: Random.new(Time.new.to_i))

$names.unshift [ {first_name: "Zach", last_name: "Latta"} ] if is_flag_on?("--zach")
$names.unshift [ {first_name: "Jonathan", last_name: "Leung"} ] if is_flag_on?("--jonathan")
$names.unshift [ {first_name: "Lucy", last_name: "Tang"} ] if is_flag_on?("--lucy")
$names.unshift [ {first_name: "Maddy", last_name: "Maxey"} ] if is_flag_on?("--maddy")

PASSWORD = "foobarfoobar1"
Faker::Config.locale = 'en-US'

f = LeapDriver.for :firefox

response = $firebase.get("twilio-allocated-emails")
twilio_allocated_emails = response.body

unless twilio_allocated_emails.nil?
  twilio_allocated_emails.each do |key, email|
    f.login(email, PASSWORD)
    f.update_phone(Faker::PhoneNumber.area_code, Faker::PhoneNumber.exchange_code, Faker::PhoneNumber.subscriber_number)
    f.logout
    $firebase.delete("twilio-allocated-emails/"+key)
  end
end

$phone_numbers = [
  {x: 650, y: 258, z: 2165},
  {x: 415, y: 212, z: 9917},
  {x: 415, y: 691, z: 2671},
  {x: 650, y: 681, z: 4156},
  {x: 650, y: 458, z: 5123}
]

  # {x: 415, y: 212, z: 9917},
  # {x: 650, y: 681, z: 4156},
  # {x: 650, y: 458, z: 5123},

def generate_user(i=0)
  phone_number = $phone_numbers[i]
  {
    first_name: $names[i][:first_name],
    last_name: $names[i][:last_name],
    email: "#{ENV['EMAIL_FRONT']}+#{Faker::Number.number(10)}@#{ENV['EMAIL_BACK']}",
    phone: {
      npa: phone_number[:x],
      co: phone_number[:y],
      line: phone_number[:z]
    },
    password: PASSWORD
  }
end


if is_flag_on?("--dino-seed")
  f.restaurant_url = 'https://www.leapset.com/order/restaurant/dinosaursmarket94114'
  f.go_to_menu

  if is_flag_on? "--dino-seed"
    f.add_item("pork and shrimp", 1, "Popopopo")
    f.add_item("pork and shrimp", 1, "")
    f.add_item("chicken and shrimp", 1, "Chika chika")
    f.add_item("pork and shrimp", 1, "")
  end
else
  if is_flag_on?("--dino") || is_flag_on?("--oni")
    if is_flag_on?("--dino")
      f.restaurant_url = 'https://www.leapset.com/order/restaurant/dinosaursmarket94114'
    elsif is_flag_on?("--oni")
      f.restaurant_url = 'https://www.leapset.com/order/restaurant/lpOnigillySf'
    end
      
    f.go_to_menu
    wait_for_enter 'Order what you want!'
  else
    f.navigate.to 'https://www.leapset.com/order/ca-san-francisco'
    wait_for_enter 'Order what you want!'
    f.restaurant_url = f.current_url
  end
end

f.order_items
