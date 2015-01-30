require 'firebase'

base_uri = 'https://dinosaurs-firebase.firebaseio.com/'

$firebase = Firebase::Client.new(base_uri)