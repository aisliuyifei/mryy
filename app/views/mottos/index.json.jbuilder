json.array!(@mottos) do |motto|
  json.extract! motto, :id, :content, :downloaded_at, :remote_image_url
  json.url motto_url(motto, format: :json)
end
