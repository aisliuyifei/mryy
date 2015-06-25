class XzController < ApplicationController
  def index
  end
  
  def api
    date = DateTime.now.strftime("%Y-%m-%d")
    name = params[:name]
    xz = Xz.find_by_downloaded_at_and_name(date,name)
    if not xz
      html_response = nil
      open("http://c.51wnl.com/API/GetConstellationV2.ashx?starname=#{name}") do |http|  
         html_response = http.read  
      end
      json = JSON.parse(html_response)
      date = json["Date"]
      if date
        xz = Xz.new 
        xz.downloaded_at = date
        xz.name = name
        xz.innfo = html_response
        xz.save if not Xz.find_by_downloaded_at_and_name(date,name)
      end
    end
    
    render :text=>xz.innfo
    
  end
  
  def detail
  end
  

end
