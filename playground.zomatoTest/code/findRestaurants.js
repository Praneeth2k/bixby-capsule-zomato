var http = require("http")
module.exports.function = function findRestaurants (location, cuisine) {
  url1 = "https://developers.zomato.com/api/v2.1/locations"
  options1 = {
    format: "json",
    headers: {
      "Accept": "application/json",
      "user-key": "efb13009e92d119ed2ae6f342eec41db",
    },
    query: {
      "query": location
    }
  }
  var response1 = http.getUrl(url1, options1)
  var latitude = response1.location_suggestions[0].latitude
  var longitude = response1.location_suggestions[0].longitude
  var entity_id = response1.location_suggestions[0].entity_id
  var entity_type = response1.location_suggestions[0].entity_type
  url2 = "https://developers.zomato.com/api/v2.1/cuisines"
  options2 = {
    format:"json",
    headers:{
      "Accept": "application/json",
      "user-key": "efb13009e92d119ed2ae6f342eec41db"
    },
    query: {
      "lat": latitude,
      "lon": longitude
    }

  }

  var response2 = http.getUrl(url2,options2)
  var c = response2.cuisines.find(item => item.cuisine_name == cuisine)
  //var cuisine_id = c.cuisine.cuisine_id

  url3 = "https://developers.zomato.com/api/v2.1/search"
  options3 = {
    format: "json",
    headers: {
      "Accept": "application/json",
      "user-key": "efb13009e92d119ed2ae6f342eec41db",
    },
    query: {
      "entity_id": entity_id,
      "entity_type": entity_type,
      "cuisines": 55
    }
  }
  var restaurant_names = ["rest1","rest2","rest3"]
  var response3 = http.getUrl(url3, options3)
  var restaurants = response3.restaurants
  var n = restaurants.map(item => {return item.restaurant.name})

  return {restaurantName:n}
}
