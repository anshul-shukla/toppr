'use strict';

/**
 * @ngdoc service
 * @name topprApp.service
 * @description
 * # service
 * Service in the topprApp.
 */
angular.module('topprApp')
  .service('service', function ($http ) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var service = {};

    var urls = {
      getWebDetails : "https://hackerearth.0x10.info/api/one-push?type=json&query=list_websites",
      pushWeb : "https://hackerearth.0x10.info/api/one-push?type=json&query=push&"
    }

    service.getWebDetails = function(){
      var request = createRequest({
        url : urls.getWebDetails,
        method: 'get'
      });
      return request;
    }

    service.pushWeb = function(title,url,tag){
      var request = createRequest({
        url : urls.pushWeb+ "&title=" + title + "&url=" + url + "&tag=" + tag ,
        method: 'get'
      });
      return request;
    }

    return service;
    //------------------------PRIVATE FUNCTIONS-------------------------------//
      function createRequest(options) {
          var reqObject = {};

          reqObject['url'] = options.url;
          reqObject['method'] = options.method;
          reqObject['crossDomain'] = true;

          if (reqObject.method.toLowerCase() == "post" || reqObject.method.toLowerCase() == "put") {
              reqObject['data'] = options.data;
              reqObject['dataType'] = 'application/json';
              reqObject['contentType'] = 'application/json';
          }
          return $http(reqObject);
      }
  });
