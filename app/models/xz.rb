class Xz < ActiveRecord::Base
  
  def self.all_names
     @@all_names
  end
  
  @@all_names=[
        "aries",
        "taurus",
        "gemini",
        "cancer",
        "leo",
        "virgo",
        "libra",
        "scorpio",
        "sagittarius",
        "capricorn",
        "aquarius",
        "pisces"]
end
