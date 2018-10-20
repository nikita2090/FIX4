this["Fix"] = this["Fix"] || {};
this["Fix"]["templates"] = this["Fix"]["templates"] || {};
this["Fix"]["templates"]["bye"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "\r\n\r\n<p>\r\n    Goodbye "
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"name","hash":{},"data":data}) : helper)))
    + "! =)\r\n</p>\r\n";
},"useData":true});
this["Fix"]["templates"]["hello"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "\r\n<h2>\r\n    Hello my little "
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "!\r\n</h2>\r\n\r\n<p>\r\n    Use the "
    + alias4(((helper = (helper = helpers.something || (depth0 != null ? depth0.something : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"something","hash":{},"data":data}) : helper)))
    + " to do it!\r\n</p>\r\n";
},"useData":true});