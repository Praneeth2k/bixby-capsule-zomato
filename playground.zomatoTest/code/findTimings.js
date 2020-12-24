var http = require("http")
var console = require("console")
module.exports.function = function findTimings (restaurantName, area) {
  var url1 = "https://developers.zomato.com/api/v2.1/locations"
  var url2 = "https://developers.zomato.com/api/v2.1/location_details"
  var options1 = {
    format:"json",
    headers: {
      "Accept": "application/json",
      "user-key": "efb13009e92d119ed2ae6f342eec41db",
      
    },
    query: {
      "query": area
    }
  }
  try{
    var response1 = http.getUrl(url1, options1)
  }catch(err){
    console.log("Error:" + err)
  }
  var l = response1.location_suggestions
  var areaType = l[0].entity_type
  var areaId = l[0].entity_id

  var options2 = {
    format:"json",
    headers: {
      "Accept": "application/json",
      "user-key": "efb13009e92d119ed2ae6f342eec41db",
      
    },
    query: {
      "entity_id": areaId,
      "entity_type": areaType
    }
  }
  var response2 = http.getUrl(url2, options2)
  var b = response2.best_rated_restaurant
  var c = b.find(item => item.restaurant.name == restaurantName)
  var timings = c.restaurant.timings
  return timings
}
