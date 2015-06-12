#!/usr/bin/env ruby

require 'rubygems'
require 'active_record'
require './app/models/motto'
require 'open-uri'
require 'net/http'


db_config = {}
File.open('config/database.yml', 'r') do |f|
  db_config = YAML.load(f.read)['production']
end

ActiveRecord::Base.establish_connection(db_config)

html_response = nil
open("http://www.51wnl.com/api/getdailysentenceweb.ashx") do |http|  
   html_response = http.read  
end

json = JSON.parse(html_response)

date = json["date"]
content = json["result"]["S"]
img = json["result"]["LargeImg"]

if date && content && img
  motto = Motto.find_by_downloaded_at(date)
  if not motto
    motto = Motto.new 
    motto.downloaded_at = date
    motto.content = content
    motto.remote_image_url = img
    motto.save    
    File.open("public/img/#{date}.jpg", 'wb') do |fo|
      fo.write open(img).read 
    end
  end
end
