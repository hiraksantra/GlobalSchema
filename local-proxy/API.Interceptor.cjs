const Interceptor = function() {};

Interceptor.rawReqResBeforeSent = function(rawReq, rawRes, resStatusCode, resHeaders) {
    // if(rawReq.url.match("/dev/api/receipt/uploadRcpts")) {
    //     rawRes.writeHead(resStatusCode, resHeaders).end();
    //     return;
    // }
    return rawRes;
};

Interceptor.changeRequestServerPath = function(isPathMatchedFn, serverPathObj) {
    if(isPathMatchedFn('/Services/common/')) {
        serverPathObj.url = serverPathObj.url.replace('/acclaim', '');
        serverPathObj.baseUrl = serverPathObj.baseUrl.replace('/acclaim', '');
    } 
    // else if(isPathMatchedFn('/visitor.ashx')) {
    //     serverPathObj.url = serverPathObj.url.replace('https://ent-dev.participantportal.com/acclaim/web/v0', 'https://chatserver12.comm100.io');
    //     serverPathObj.baseUrl = serverPathObj.baseUrl.replace('https://ent-dev.participantportal.com/acclaim', 'https://chatserver12.comm100.io');
    // }
};

Interceptor.optionsToTheServer = function(options) {
    //console.log(options)
    return options;
};

Interceptor.responseFromTheServer = function(response, options) {
    return response;
};

Interceptor.responseLinkFilter = function(href, urlConfig) {
    return href;
};

module.exports = Interceptor;