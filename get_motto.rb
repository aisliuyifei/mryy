#!/usr/bin/env ruby

require 'rubygems'
require 'active_record'
require './app/models/motto'
require './app/models/xz'
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


class XzManager
  def self.update_info(name)
    html_response = nil
    open("http://c.51wnl.com/API/GetConstellationV2.ashx?starname=#{name}") do |http|  
       html_response = http.read  
    end
    puts html_response
    json = JSON.parse(html_response)
    date = json["Date"]
    if date
      xz = Xz.find_by_downloaded_at_and_name(date,name)
      if not xz
        xz = Xz.new 
        xz.downloaded_at = date
        xz.name = name
        xz.innfo = html_response
        xz.save    
      end
    end
  end
end

Xz.all_names.each do |name|
  puts name
  XzManager.update_info(name)
end


