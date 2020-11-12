var console = require('console')
var http = require('http')
module.exports.function = function fetchCategory (id) {
  var url = "https://developers.zomato.com/api/v2.1/categories"
  var options = {
    format: "json",
    headers: {
      "Accept": "application/json",
      "user-key": "efb13009e92d119ed2ae6f342eec41db"
    }
  }
  var response = http.getUrl(url, options)
  var x = response.categories
  var cat = x.find(c => c.categories.id == id)
  return cat.categories.name
}
