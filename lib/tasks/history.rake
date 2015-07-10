require 'open-uri'
require 'net/http'

namespace :history do
  desc "init, usage: 'rake exams:init'"
  task :init  => :environment do 
    first_day = "1996-01-01".to_date
    (0..365).each do |x|
      day = first_day + x.days
      txt_name = day.strftime("%m%d.txt")
      url_name = "http://www.51wnl.com/historyeventnew/data/#{txt_name}"
      File.open("./public/data/#{txt_name}","w") do |f|
        f.puts open(url_name).read.force_encoding("UTF-8")
      end
    end
  end
end